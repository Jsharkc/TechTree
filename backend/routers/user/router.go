package routers

import (
	"github.com/Jsharkc/TechTree/backend/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.BaseController{})
}
