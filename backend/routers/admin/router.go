package routers

import (
	"github.com/astaxie/beego"

	"github.com/Jsharkc/TechTree/backend/controllers"
)

func init() {
    beego.Router("/", &controllers.BaseController{})
}
