package middleware

import (
	"go_blog/utils"
	"go_blog/utils/errmsg"
	"net/http"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

var JwyKey = []byte(utils.JwyKey)

type MyClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// SetToken 生产token
func SetToken(role int, username string) (string, int) {
	expireTime := time.Now().Add(10 * time.Hour)
	SetClaims := MyClaims{
		username,
		jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(),
			Issuer:    "go_blog",
		},
	}
	reqClaim := jwt.NewWithClaims(jwt.SigningMethodHS512, SetClaims)
	token, err := reqClaim.SignedString(JwyKey)
	if err != nil {
		return "", errmsg.ERROR
	}
	if role != 1 {
		return token, errmsg.SUCCES
	}
	return token, errmsg.ADMIN_USER
}

// CheckToken 验证token
func CheckToken(token string) (*MyClaims, int) {
	var claims MyClaims

	setToken, err := jwt.ParseWithClaims(token, &claims, func(token *jwt.Token) (i interface{}, e error) {
		return JwyKey, nil
	})

	if err != nil {
		if ve, ok := err.(*jwt.ValidationError); ok {
			if ve.Errors&jwt.ValidationErrorMalformed != 0 {
				return nil, errmsg.ERROR_TOKEN_WRONG
			} else if ve.Errors&(jwt.ValidationErrorExpired|jwt.ValidationErrorNotValidYet) != 0 {
				return nil, errmsg.ERROR_TOKEN_RUNTIME
			} else {
				return nil, errmsg.ERROR_TOKEN_TYPE_WRONG
			}
		}
	}

	if setToken != nil {
		if key, ok := setToken.Claims.(*MyClaims); ok && setToken.Valid {
			return key, errmsg.SUCCES
		} else {
			return nil, errmsg.ERROR_TOKEN_WRONG
		}
	}

	return nil, errmsg.ERROR_TOKEN_WRONG
}

// JwtToken 中间件
func JwtToken() gin.HandlerFunc {
	return func(c *gin.Context) {
		var code int

		tokenHerder := c.Request.Header.Get("Authorization")
		if tokenHerder == "" {
			code = errmsg.ERROR_TOKEN_EXIST
			c.JSON(200, gin.H{
				"code":    code,
				"message": errmsg.GetErrMsg(code),
			})
			c.Abort()
			return
		}
		checkToken := strings.Split(tokenHerder, " ")

		if len(checkToken) == 0 {
			code = errmsg.ERROR_TOKEN_TYPE_WRONG
			c.JSON(http.StatusOK, gin.H{
				"code":    code,
				"message": errmsg.GetErrMsg(code),
			})
			c.Abort()
			return
		}

		if len(checkToken) != 2 && checkToken[0] != "Bearer" {
			code = errmsg.ERROR_TOKEN_TYPE_WRONG
			c.JSON(200, gin.H{
				"code":    code,
				"message": errmsg.GetErrMsg(code),
			})
			c.Abort()
			return
		}

		key, TCode := CheckToken(checkToken[1])

		if TCode == errmsg.ERROR {
			code = errmsg.ERROR_TOKEN_WRONG
			c.JSON(200, gin.H{
				"code":    code,
				"message": errmsg.GetErrMsg(code),
			})
			c.Abort()
			return
		}

		if time.Now().Unix() > key.ExpiresAt {
			code = errmsg.ERROR_TOKEN_RUNTIME
			c.JSON(200, gin.H{
				"code":    code,
				"message": errmsg.GetErrMsg(code),
			})
			c.Abort()
			return
		}

		c.Set("username", key)
		c.Next()
	}
}
