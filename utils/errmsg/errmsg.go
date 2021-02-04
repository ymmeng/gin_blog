package errmsg

const (
	SUCCSE     = 200
	ADMIN_USER = 201
	ERROR      = 401

	// code = 1000...用户模块的错误
	ERROR_USERNAME_EXIST   = 1001
	ERROR_PASSWORD_WRONG   = 1002
	ERROR_USER_NOT_EXIST   = 1003
	ERROR_TOKEN_EXIST      = 1004
	ERROR_TOKEN_RUNTIME    = 1005
	ERROR_TOKEN_WRONG      = 1006
	ERROR_TOKEN_TYPE_WRONG = 1007
	ERROR_USER_NO_RIGHT    = 1008

	// code = 2000...文章模块的错误
	ERROR_ART_NOT_EXIST = 2001
	// code = 3000...分类模块的错误
	ERROR_Category_EXIST     = 3001
	ERROR_Category_NOT_EXIST = 3002

	ERROR_Too_Large = 4001
)

var codeMsg = map[int]string{
	SUCCSE: "OK",
	ERROR:  "FAIL",

	ERROR_USERNAME_EXIST:   "用户名已存在",
	ERROR_PASSWORD_WRONG:   "密码错误",
	ERROR_USER_NO_RIGHT:    "用户权限不足",
	ERROR_USER_NOT_EXIST:   "用户名不存在",
	ERROR_TOKEN_EXIST:      "TOKEN不存在",
	ERROR_TOKEN_RUNTIME:    "TOKEN已过期",
	ERROR_TOKEN_WRONG:      "TOKEN错误",
	ERROR_TOKEN_TYPE_WRONG: "TOKEN格式错误",
	ADMIN_USER:             "Hello 管理员",

	ERROR_ART_NOT_EXIST: "文章不存在",

	ERROR_Category_EXIST:     "该分类已经存在",
	ERROR_Category_NOT_EXIST: "该分类不存在",

	ERROR_Too_Large: "上传失败，文件太大了",
}

// GetErrMsg 获取状态信息
func GetErrMsg(code int) string {
	return codeMsg[code]
}
