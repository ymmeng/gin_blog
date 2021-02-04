package v1

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"path"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// UpLoad 文件上传
func UpLoad(c *gin.Context) {
	_, headers, err := c.Request.FormFile("file")
	if err != nil {
		log.Printf("尝试获取文件时出错: %v", err)
	}

	if headers.Size > 1024*1024*5 {
		c.JSON(400, gin.H{
			"message": "上传失败，文件太大了",
		})
		return
	}

	form, err := c.MultipartForm()
	if err != nil {
		c.JSON(500, gin.H{
			"message": err.Error(),
		})
		return
	}
	files := form.File["file"]
	randFileName := uuid.New()
	var dst string
	for _, file := range files {
		ext := path.Ext(file.Filename)
		dst = fmt.Sprintf("./blogdock/nginx/www/upload/%s%s", randFileName, ext)
		c.SaveUploadedFile(file, dst)
		c.JSON(200, gin.H{
			"message": fmt.Sprintf("%s上传成功", file.Filename),
		})
	}
	return
}

// process 显示上传文件的内容
func process(w http.ResponseWriter, r *http.Request) {
	file, _, err := r.FormFile("file")
	if err != nil {
		data, err := ioutil.ReadAll(file)
		if err != nil {
			fmt.Fprintln(w, string(data))
		}
	}
}
