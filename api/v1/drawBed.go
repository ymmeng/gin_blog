package v1

import (
	"go_blog/model"
	"go_blog/utils/errmsg"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// DrawBedRegister 图床接口
func DrawBedRegister(group *gin.RouterGroup) {
	group.GET("/drawBed/:id", GetDrawBed)
	group.GET("/drawBeds", GetDrawBeds)
	group.POST("/drawBed/add", AddDrawBed)
	group.DELETE("/drawBed/:id", DeleteDrawBed)
}

// AddDrawBed 新增图床
func AddDrawBed(c *gin.Context) {
	var data model.DrawBed
	data.ID = uuid.NewString()
	data.CreatedAt = int(time.Now().Unix())
	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(200, gin.H{
			"status":  errmsg.PARAM_ERROR,
			"data":    "",
			"message": errmsg.GetErrMsg(errmsg.PARAM_ERROR),
		})
	}

	if data.URL == "" {
		c.JSON(200, gin.H{
			"status":  errmsg.ERROR,
			"data":    "",
			"message": errmsg.GetErrMsg(errmsg.ERROR),
		})
		return
	}

	code = model.CreateDrawBed(&data)
	c.JSON(200, gin.H{
		"status":  code,
		"data":    data,
		"message": errmsg.GetErrMsg(code),
	})
}

// GetDrawBeds 批量获取图床
func GetDrawBeds(c *gin.Context) {
	pageSize, _ := strconv.Atoi(c.Query("pageSize"))
	pageNum, _ := strconv.Atoi(c.Query("pageNum"))
	if pageSize == 0 {
		pageSize = -1
	}
	if pageNum == 0 {
		pageNum = -1
	}
	data, total := model.GetDrawBeds(pageSize, pageNum)
	c.JSON(200, gin.H{
		"status":  code,
		"data":    data,
		"total":   total,
		"message": errmsg.GetErrMsg(code),
	})
}

// GetDrawBed 获取单个图床
func GetDrawBed(c *gin.Context) {
	data, total := model.GetDrawBed(c.Param("id"))
	c.JSON(200, gin.H{
		"status":  code,
		"data":    data,
		"total":   total,
		"message": errmsg.GetErrMsg(code),
	})
}

// DeleteDrawBed 删除图床
func DeleteDrawBed(c *gin.Context) {
	code = model.DeleteDrawBed(c.Param("id"))
	c.JSON(200, gin.H{
		"status":  code,
		"message": errmsg.GetErrMsg(code),
	})
}
