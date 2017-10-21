package general

const (
	DBName = "tech"

	RespKeyStatus = "status"
	RespKeyType   = "type"
	RespKeyData   = "data"

	Active   = 0x10
	Inactive = 0x11

	ErrSucceed       = 0x0
	ErrInvalidParams = 0x1
	ErrUserExists    = 0x2
	ErrMysql         = 0x3
	ErrNotFound      = 0x4
	ErrNotLogin      = 0x5

	NodePassed   = 0x12
	NodeUserAdd  = 0x13

	Initial  = 0x20
	Agree    = 0x21
	DisAgree = 0x22

	SessionUserID = "userid"
)