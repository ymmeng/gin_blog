package model

import (
	"fmt"
	"mime/multipart"
	"os"
	"path"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// UpLoad 文件上传
func UpLoad(c *gin.Context, file *multipart.FileHeader) (int, string) {

	randFileName := uuid.New()
	ext := path.Ext(file.Filename)
	t := time.Now().Format("2006-01-02 01")

	path := fmt.Sprintf("./blogdock/nginx/www/upload/%s/", t)

	// 如果没有文件夹创建文件夹
	if !isExist(path) {
		os.Mkdir(path, os.ModePerm)
	}

	dst := fmt.Sprintf("./blogdock/nginx/www/upload/%s/%s%s", t, randFileName, ext)

	c.SaveUploadedFile(file, dst)
	// upload前一定要加'/'
	return 200, fmt.Sprintf("/upload/%s/%s%s", t, randFileName, ext)
}

// 检测文件夹是否存在
func isExist(path string) bool {
	_, err := os.Stat(path)
	if err != nil && !os.IsExist(err) {
		return false
	}
	return true
}
