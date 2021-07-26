package model

import (
	"go_blog/utils/errmsg"

	"github.com/jinzhu/gorm"
)

// Category 服务
type Category struct {
	ID   uint   `gorm:"primary_key;auto_increment" json:"id"`
	Name string `gorm:"type:varchar(20);not null" json:"name"`
}

// CheckCategory 查询分类是否存在
func CheckCategory(name string) (code int) {
	var cate Category
	db.Select("id").Where("name = ?", name).First(&cate)
	if cate.ID > 0 {
		return errmsg.ERROR_Category_EXIST //1001
	}
	return errmsg.SUCCSE
}

// CreateCategory 增加分类
func CreateCategory(data *Category) int {
	if err := db.Create(&data).Error; err != nil {
		return errmsg.ERROR //401
	}
	return errmsg.SUCCSE //200
}

// GetCategory 查询分类下单个分类
func GetCategory(id int) ([]Category, int) {
	var cate []Category
	err := db.Where("id = ?", id).First(&cate).Error
	if err != nil {
		return nil, errmsg.ERROR //401
	}
	return cate, errmsg.SUCCSE
}

// GetCategorys 获取分类列表
func GetCategorys(pageSize int, pageNum int) ([]Category, int) {
	var cates []Category
	var total int
	err = db.Limit(pageSize).Offset((pageNum - 1) * pageSize).Find(&cates).Error
	db.Model(&cates).Count(&total)
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, 0
	}
	return cates, total
}

// EditCategory 编辑分类信息
func EditCategory(id int, data *Category) int {
	var cate Category
	var maps = make(map[string]interface{})
	maps["name"] = data.Name
	err = db.Model(&cate).Where("id =?", id).Updates(maps).Error
	if err != nil {
		return errmsg.ERROR
	}
	return errmsg.SUCCSE
}

// DeleteCategory 删除分类
func DeleteCategory(id int) int {
	var cate Category
	err = db.Where("id = ?", id).Delete(&cate).Error
	if err != nil {
		return errmsg.ERROR
	}
	return errmsg.SUCCSE
}
