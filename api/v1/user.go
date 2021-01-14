package v1

import (
	"go_blog/model"
	"go_blog/utils/errmsg"
	"go_blog/utils/validator"
	"strconv"

	"github.com/gin-gonic/gin"
)

var code int

type UserController struct{}

func UserRegister(group *gin.RouterGroup) {
	var user = &UserController{}
	group.POST("/user/add", user.AddUser)
	group.GET("/users", user.GetUsers)
	group.GET("/user/:id", user.GetUser)
}

// AddUser 添加用户
func (u *UserController) AddUser(c *gin.Context) {
	var data model.User
	var msg string
	c.ShouldBindJSON(&data)
	msg, code = validator.Validate(&data)
	if code != errmsg.SUCCES {
		c.JSON(200, gin.H{
			"status":  code,
			"message": msg,
		})
		c.Abort()
	}

	code = model.CheckUser(data.Username)
	if code == errmsg.SUCCES {
		model.CreateUser(&data)
	}
	c.JSON(200, gin.H{
		"status":  code,
		"data":    data,
		"message": errmsg.GetErrMsg(code),
	})
}

// GetUser 查询单个用户
func (u *UserController) GetUser(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	data, code := model.GetUser(id)
	c.JSON(200, gin.H{
		"status":  code,
		"data":    data,
		"message": errmsg.GetErrMsg(code),
	})
}

// GetUsers godoc
// @Summary Show a account
// @Description get string by ID
// @ID get-string-by-int
// @Accept  json
// @Produce  json
// @Param id path int true "Account ID"
// @Success 200 {object} model.Account
// @Header 200 {string} Token "qwerty"
// @Failure 400,404 {object} httputil.HTTPError
// @Failure 500 {object} httputil.HTTPError
// @Failure default {object} httputil.DefaultError
// @Router /users [get]
// GetUsers 查询用户列表
func (u *UserController) GetUsers(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	pageNum, _ := strconv.Atoi(c.Query("pageNum"))
	username := c.Query("username")
	if pageSize == 0 {
		pageSize = -1
	}
	if pageNum == 0 {
		pageNum = -1
	}
	data, code, total := model.GetUsers(username, pageSize, pageNum)
	c.JSON(200, gin.H{
		"status":  code,
		"data":    data,
		"total":   total,
		"message": errmsg.GetErrMsg(code),
	})
}

// EditUser 编辑用户
func EditUser(c *gin.Context) {
	var data model.User
	id, _ := strconv.Atoi(c.Param("id"))
	c.ShouldBindJSON(&data)
	code = model.CheckUpUser(id)
	if code == errmsg.SUCCES {
		model.EditUser(id, &data)
	}
	if code == errmsg.ERROR_Category_EXIST {
		c.Abort()
	}
	c.JSON(200, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
	})
}

// DeleteUser 删除用户
func DeleteUser(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	code = model.DeleteUserinfo(id)
	c.JSON(200, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
	})
}
