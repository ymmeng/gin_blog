package routes

import (
	v1 "go_blog/api/v1"
	"go_blog/middleware"
	"go_blog/utils"

	// "go_blog/util"
	_ "go_blog/docs"
	// _ "github.com/swaggo/gin-swagger/example/docs"
	// _ "github.com/molefuckgo/gin-blog/docs"

	"github.com/gin-contrib/multitemplate"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"   // gin-swagger middleware
	"github.com/swaggo/gin-swagger/swaggerFiles" // swagger embed files
)

func createMyRender() multitemplate.Renderer {
	p := multitemplate.NewRenderer()
	p.AddFromFiles("admin", "static/admin/index.html")
	return p
}

// InitRouter 初始化路由
func InitRouter() {
	gin.SetMode(utils.AppMode)
	r := gin.New()
	r.HTMLRender = createMyRender()
	r.Use(middleware.Loggoer())
	r.Use(gin.Recovery())
	r.Use(middleware.Cors())

	r.Static("/admin", "./static/admin")
	r.StaticFile("/favicon.ico", "static/front/favicon.ico")

	auth := r.Group("api/v1")
	auth.Use(middleware.JwtToken())
	{
		// 用户 模块的路由接口
		auth.PUT("user/:id", v1.EditUser)
		auth.DELETE("user/:id", v1.DeleteUser)
		// 分类 模块的路由接口
		auth.POST("category/add", v1.AddCategory)
		auth.PUT("category/:id", v1.EditCategory)
		auth.DELETE("category/:id", v1.DeleteCategory)
		// 文章 模块的路由接口
		auth.PUT("article/:id", v1.EditArticle)
		auth.DELETE("article/:id", v1.DeleteArticle)

	}
	routerV1 := r.Group("api/v1")
	{
		routerV1.POST("article/add", v1.AddArticle)
		// 文件上传
		routerV1.POST("upload", v1.UpLoad)
		// 用户 模块的路由接口
		v1.UserRegister(routerV1)
		// 分类 模块的路由接口
		routerV1.GET("categorys", v1.GetCategorys)
		routerV1.GET("category/:id", v1.GetCategory)
		// 文章 模块的路由接口
		routerV1.GET("articles", v1.GetArticles)
		routerV1.GET("article/info/:id", v1.GetCateArt)
		routerV1.GET("article/catelist/:id", v1.GetCateArts)
		routerV1.POST("login", v1.Login)
	}
	r.GET("swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.Run(utils.HttpPort)
}
