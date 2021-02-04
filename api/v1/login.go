package v1

import (
	"go_blog/middleware"
	"go_blog/model"
	"go_blog/utils/errmsg"

	"github.com/gin-gonic/gin"
)

// Login 用户登录
func Login(c *gin.Context) {
	var data model.User
	var code int
	var token string
	c.ShouldBindJSON(&data)
	code = model.CheckLogin(data.Username, data.Password)
	if code == errmsg.SUCCSE {
		token, code = middleware.SetToken(2, data.Username)
	}
	if code == errmsg.ADMIN_USER {
		token, code = middleware.SetToken(1, data.Username)
	}
	c.JSON(200, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
		"token":   token,
	})
}
