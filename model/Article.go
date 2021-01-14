package model

import (
	"go_blog/utils/errmsg"

	"github.com/jinzhu/gorm"
)

// Article 服务
type Article struct {
	gorm.Model
	Category Category `gorm:"foreignkey:Cid"`
	Cid      int      `gorm:"type:int;not null" json:"cid"`
	Title    string   `gorm:"type:varchar(100);not null" json:"title"`
	Desc     string   `gorm:"type:varchar(200)" json:"desc"`
	Content  string   `gorm:"type:longtext" json:"content"`
	Img      string   `gorm:"type:varchar(100)" json:"img"`
}

// CreateArticle 增加文章
func CreateArticle(data *Article) int {
	if err := db.Create(&data).Error; err != nil {
		return errmsg.ERROR //401
	}
	return errmsg.SUCCES //200
}

// GetArticle 获取单个文章
func GetArticle(id int) (Article, int) {
	var art Article
	err := db.Preload("Category").Where("id = ?", id).First(&art).Error
	if err != nil {
		return art, errmsg.ERROR_ART_NOT_EXIST
	}
	return art, errmsg.SUCCES
}

// GetCatArt 查询分类所有文章
func GetCatArt(cid int, pageSize int, pageNum int) ([]Article, int, int) {
	var actArtList []Article
	var total int
	err = db.Preload("Category").Limit(pageSize).Offset((pageNum-1)*pageSize).Where("cid=?", cid).Find(&actArtList).Count(&total).Error
	if err != nil {
		return nil, errmsg.ERROR_Category_NOT_EXIST, 0
	}
	return actArtList, errmsg.SUCCES, total
}

// GetArticles 获取文章列表
func GetArticles(title string, pageSize int, pageNum int) ([]Article, int, int) {
	var actList []Article
	var total int
	if title == "" {
		err = db.Order("Updated_At DESC").Preload("Category").Limit(pageSize).Offset((pageNum - 1) * pageSize).Find(&actList).Error
		db.Model(&actList).Count(&total)
		if err != nil && err != gorm.ErrRecordNotFound {
			return nil, errmsg.ERROR, 0
		}
		return actList, errmsg.SUCCES, total
	}
	err = db.Order("Updated_At DESC").Preload("Category").Where("title LIKE ?", "%"+title+"%").Limit(pageSize).Offset((pageNum - 1) * pageSize).Find(&actList).Error
	db.Model(&actList).Where("title LIKE ？", "%"+title+"%").Count(&total)
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, errmsg.ERROR, 0
	}
	return actList, errmsg.SUCCES, total
}

// EditArticle 编辑文章信息
func EditArticle(id int, data *Article) int {
	var art Article
	var maps = make(map[string]interface{})
	maps["title"] = data.Title
	maps["cid"] = data.Cid
	maps["desc"] = data.Desc
	maps["content"] = data.Content
	maps["img"] = data.Img
	err = db.Model(&art).Where("id =?", id).Updates(maps).Error
	if err != nil {
		return errmsg.ERROR
	}
	return errmsg.SUCCES
}

// DeleteArticle 删除文章
func DeleteArticle(id int) int {
	var art Article
	err = db.Where("id = ?", id).Delete(&art).Error
	if err != nil {
		return errmsg.ERROR
	}
	return errmsg.SUCCES
}
