package model

import (
	"encoding/base64"
	"go_blog/utils/errmsg"
	"log"

	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/scrypt"
)

// User 服务
type User struct {
	gorm.Model
	Username string `gorm:"type: varchar(20); unique;not null" json:"username" validate:"required,min=4,max=12" label:"用户名"`
	Password string `gorm:"type: varchar(20); not null" json:"password" validate:"required,min=3,max=20" label:"密码"`
	HeadImg  string `gorm:"not null" json:"headimg" validate:"required" label:"头像"`
	Role     int    `gorm:"type: int;DEFAULT:2" json:"role" validate:"required,gte=2" label:"角色码"`
}

// CheckUser 查询用户是否存在
func CheckUser(name string) (code int) {
	var user User
	db.Select("id").Where("username = ?", name).First(&user)
	if user.ID > 0 {
		return errmsg.ERROR_USERNAME_EXIST //1001
	}
	return errmsg.SUCCSE
}

// CheckUpUser 查询用户是否存在
func CheckUpUser(id int) (code int) {
	var user User
	db.Select("id,username").Where("id = ?", id).First(&user)
	if user.ID == uint(id) {
		return errmsg.SUCCSE
	}
	if user.ID > 0 {
		return errmsg.ERROR_USERNAME_EXIST //1001
	}
	return errmsg.SUCCSE
}

// CreateUser 增加用户
func CreateUser(data *User) int {
	err := db.Create(&data).Error
	if err != nil {
		return errmsg.ERROR // 500
	}
	return errmsg.SUCCSE
}

// GetUser 获取单个用户
func GetUser(id int) (User, int) {
	var user User
	err := db.Where("id = ?", id).First(&user).Error
	if err != nil {
		return user, errmsg.ERROR_USER_NOT_EXIST
	}
	return user, errmsg.SUCCSE
}

// GetUsers 获取用户列表
func GetUsers(username string, pageSize int, pageNum int) ([]*User, int, int) {
	var users []*User
	var total int
	if username == "" {
		err = db.Find(&users).Limit(pageSize).Offset((pageNum - 1) * pageSize).Error
		db.Model(&users).Count(&total)
		if err != nil && err != gorm.ErrRecordNotFound {
			return nil, errmsg.ERROR, 0
		}
		return users, errmsg.SUCCSE, total
	}
	err = db.Order("Updated_At DESC").Where("username LIKE ?", "%"+username+"%").Find(&users).Limit(pageSize).Offset((pageNum - 1) * pageSize).Error
	db.Model(&users).Where("username LIKE ?", "%"+username+"%").Count(&total)
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, errmsg.ERROR, 0
	}
	return users, errmsg.SUCCSE, total
}

// EditUser 编辑用户信息
func EditUser(id int, data *User) int {
	var user User
	var maps = make(map[string]interface{})
	maps["username"] = data.Username
	maps["role"] = data.Role
	err = db.Model(&user).Where("id =?", id).Updates(maps).Error
	if err != nil {
		return errmsg.ERROR
	}
	return errmsg.SUCCSE
}

// DeleteUserinfo 删除用户
func DeleteUserinfo(id int) int {
	var user User
	err = db.Where("id = ?", id).Delete(&user).Error
	if err != nil {
		return errmsg.ERROR
	}
	return errmsg.SUCCSE
}

// BeforeSave 加密密码
func (u *User) BeforeSave() {
	u.Password = ScryptPassword(u.Password)
}

// ScryptPassword 密码加密逻辑
func ScryptPassword(password string) string {
	const keyLen = 10
	salt := make([]byte, 8)
	salt = []byte{32, 88, 44, 66, 28, 36, 74, 65}
	HashPw, err := scrypt.Key([]byte(password), salt, 16384, 8, 1, keyLen)
	if err != nil {
		log.Fatal(err)
	}
	fpw := base64.StdEncoding.EncodeToString(HashPw)
	return fpw
}

// CheckLogin 登录验证
func CheckLogin(username, password string) int {
	var user User
	db.Where("username=?", username).First(&user)
	if user.ID == 0 {
		return errmsg.ERROR_USER_NOT_EXIST
	}
	if ScryptPassword(password) != user.Password {
		return errmsg.ERROR_PASSWORD_WRONG
	}
	if user.Role != 1 {
		return errmsg.SUCCSE
	}
	return errmsg.ADMIN_USER
}
