package v1

import (
	"fmt"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

// UpLoad 文件上传
func UpLoad(c *gin.Context) {
	_, headers, err := c.Request.FormFile("file")
	if err != nil {
		log.Printf("Error when try to get file: %v", err)
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
	randFileName := randSeq(8)
	for _, file := range files {
		dst := fmt.Sprintf("./static/uploadFile/%s_%s", randFileName, file.Filename)
		c.SaveUploadedFile(file, dst)
	}
	c.JSON(200, gin.H{
		"message": fmt.Sprintf("上传成功，'%d' uploaded!", len(files)),
	})
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

// 生成随机文件名
func randSeq(n int) string {
	now := time.Now()
	nowtime := now.Format("2006-01-02_15:04:05")
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return nowtime + "_" + string(b)
}
