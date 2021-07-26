package main

import (
	"go_blog/model"
	"go_blog/routes"
)

func main() {
	// 连接数据库
	model.InitDb()
	// 引入路由组件
	routes.InitRouter()
}
