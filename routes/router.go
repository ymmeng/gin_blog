package routes

import (
	v1 "go_blog/api/v1"
	"go_blog/middleware"
	"go_blog/utils"

	// "go_blog/util"
	_ "go_blog/docs"
	// _ "github.com/swaggo/gin-swagger/example/docs"
	// _ "github.com/molefuckgo/gin-blog/docs"

	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"   // gin-swagger middleware
	"github.com/swaggo/gin-swagger/swaggerFiles" // swagger embed files
)

// @title Swagger Example API
// @version 1.0
// @description This is a sample server celler server.
// @termsOfService http://swagger.io/terms/

// @contact.name API Support
// @contact.url http://www.swagger.io/support
// @contact.email support@swagger.io

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html

// @host localhost:8080
// @BasePath /api/v1
// @query.collection.format multi

// @securityDefinitions.basic BasicAuth

// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization

// @securitydefinitions.oauth2.application OAuth2Application
// @tokenUrl https://example.com/oauth/token
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.implicit OAuth2Implicit
// @authorizationurl https://example.com/oauth/authorize
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.password OAuth2Password
// @tokenUrl https://example.com/oauth/token
// @scope.read Grants read access
// @scope.write Grants write access
// @scope.admin Grants read and write access to administrative information

// @securitydefinitions.oauth2.accessCode OAuth2AccessCode
// @tokenUrl https://example.com/oauth/token
// @authorizationurl https://example.com/oauth/authorize
// @scope.admin Grants read and write access to administrative information

// @x-extension-openapi {"example": "value on a json format"}

// InitRouter 初始化路由
func InitRouter() {
	gin.SetMode(utils.AppMode)
	r := gin.New()
	r.Use(middleware.Loggoer())
	r.Use(gin.Recovery())
	r.Use(middleware.Cors())

	// r.LoadHTMLGlob("static/admin/index.html")
	// r.Static("admin/static", "static/admin/static")
	// r.GET("admin", func(c *gin.Context) { c.HTML(200, "index.html", nil) })
	// r.GET("admin", func(c *gin.Context) {
	// 	c.HTML(200, "index.html", nil)
	// })

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
