package model

import (
	"go_blog/utils/errmsg"

	"github.com/jinzhu/gorm"
)

// DrawBed 图床服务
type DrawBed struct {
	ID        string  `gorm:"type:char(36);primary_key" json:"id"`
	URL       string  `gorm:"type:varchar(100);not null" json:"url"`
	Name      string  `gorm:"type:varchar(100);not null" json:"name"`
	Type      string  `gorm:"type:varchar(20);not null" json:"type"`
	Size      float32 `gorm:"type:float;not null;default:0;comment:'单位:MB'" json:"size"`
	CreatedAt int     `gorm:"type:int(10) unsigned not null;default:0" json:"created_at"`
}

// GetDrawBeds 获取多个图床
func GetDrawBeds(pageSize int, pageNum int) ([]DrawBed, int) {
	var draws []DrawBed
	var total int
	err = db.Order("Created_At DESC").Limit(pageSize).Offset((pageNum - 1) * pageSize).Find(&draws).Error
	db.Model(&draws).Count(&total)
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, 0
	}
	return draws, total
}

// GetDrawBed 获取单个图床
func GetDrawBed(id string) (DrawBed, int) {
	var draw DrawBed
	err := db.Where("id = ?", id).First(&draw).Error
	if err != nil {
		return draw, errmsg.ERROR //401
	}
	return draw, errmsg.SUCCSE
}

// CreateDrawBed 添加图床
func CreateDrawBed(data *DrawBed) int {
	if err := db.Create(data).Error; err != nil {
		return errmsg.ERROR
	}
	return errmsg.SUCCSE
}

// DeleteDrawBed 删除图床
func DeleteDrawBed(id string) int {
	if err := db.Where("id = ?", id).Delete(&DrawBed{}).Error; err != nil {
		return errmsg.ERROR
	}
	return errmsg.SUCCSE
}
