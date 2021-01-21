package v1

import (
	"fmt"
	"go_blog/model"
	"go_blog/utils/errmsg"
	"strconv"

	"github.com/gin-gonic/gin"
)

// ArticleService 服务
type ArticleService struct {
	category  model.Category
	id        int
	createdAt string
	updatedAt string
	cid       int
	title     string
	desc      string
	content   string
	imgPath   string
}

// convertData 转换数据
func convertData(req model.Article, rsp ArticleService) ArticleService {
	rsp.id = int(req.ID)
	rsp.createdAt = req.CreatedAt.Format("2006-01-02 13:50:30")
	rsp.updatedAt = req.UpdatedAt.Format("2006-01-02 13:50:30")
	rsp.cid = req.Cid
	rsp.title = req.Title
	rsp.desc = req.Desc
	rsp.content = req.Content
	rsp.imgPath = req.Img
	rsp.category = req.Category
	return rsp
}

// AddArticle 添加文章
func AddArticle(c *gin.Context) {
	var data model.Article
	c.ShouldBindJSON(&data)
	code = model.CreateArticle(&data)
	c.JSON(200, gin.H{
		"status":  code,
		"data":    data,
		"message": errmsg.GetErrMsg(code),
	})
}

// GetCateArts 查询分类下的所有文章
func GetCateArts(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	pageNum, _ := strconv.Atoi(c.Query("pageNum"))
	id, _ := strconv.Atoi(c.Param("id"))
	if pageSize == 0 {
		pageSize = -1
	}
	if pageNum == 0 {
		pageNum = -1
	}
	datas, code, total := model.GetCatArt(id, pageSize, pageNum)
	rsps := []ArticleService{}
	for _, data := range datas {
		rsps = append(rsps, convertData(data, ArticleService{}))
	}
	c.JSON(200, gin.H{
		"status":  code,
		"data":    datas,
		"total":   total,
		"message": errmsg.GetErrMsg(code),
	})
}

// GetCateArt 查询文章
func GetCateArt(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	data, code := model.GetArticle(id)

	rsp := convertData(data, ArticleService{})

	fmt.Println(rsp)
	c.JSON(200, gin.H{
		"status":  code,
		"data":    data,
		"message": errmsg.GetErrMsg(code),
	})
}

// GetArticles 查询文章列表
func GetArticles(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	pageNum, _ := strconv.Atoi(c.Query("pageNum"))
	title := c.Query("title")
	if pageSize == 0 {
		pageSize = -1
	}
	if pageNum == 0 {
		pageNum = -1
	}
	datas, code, total := model.GetArticles(title, pageSize, pageNum)
	rsps := []ArticleService{}
	for _, data := range datas {
		rsps = append(rsps, convertData(*data, ArticleService{}))
	}
	c.JSON(200, gin.H{
		"status":  code,
		"data":    datas,
		"total":   total,
		"message": errmsg.GetErrMsg(code),
	})
}

// EditArticle 编辑文章
func EditArticle(c *gin.Context) {
	var data model.Article
	id, _ := strconv.Atoi(c.Param("id"))
	c.ShouldBindJSON(&data)
	code = model.EditArticle(id, &data)
	c.JSON(200, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
	})
}

// DeleteArticle 删除文章
func DeleteArticle(c *gin.Context) {
	id, _ := strconv.Atoi(c.Param("id"))
	code = model.DeleteArticle(id)
	c.JSON(200, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
	})
}
