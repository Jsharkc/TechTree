package routers

import (
	"github.com/astaxie/beego"

	"github.com/Jsharkc/TechTree/backend/controllers"
)

func init() {
	beego.Router("/login", &controllers.UserController{}, "post:Login")
	beego.Router("/user/register", &controllers.UserController{},"post:Register")
}
