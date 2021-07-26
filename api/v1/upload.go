package v1

import (
	"go_blog/model"
	"go_blog/utils"
	"go_blog/utils/errmsg"

	"github.com/gin-gonic/gin"
)

// UpLoad 文件上传
func UpLoad(c *gin.Context) {
	_, _, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(500, gin.H{
			"message": errmsg.GetErrMsg(401),
		})
		return
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(500, gin.H{
			"message": errmsg.GetErrMsg(401),
		})
		return
	}

	for _, file := range form.File["file"] {
		//上传文件并返回值
		code, url := model.UpLoad(c, file)

		c.JSON(200, gin.H{
			"message": errmsg.GetErrMsg(code),
			"url":     utils.UploadAddress + url,
		})
	}
}
