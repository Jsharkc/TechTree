package routers

import (
	"github.com/astaxie/beego"

	"github.com/Jsharkc/TechTree/backend/controllers"
)

func init() {
	// Admin
    beego.Router("/login", &controllers.AdminController{}, "post:Login")
	beego.Router("/admin/add", &controllers.AdminController{}, "post:Add")

	// Node
	beego.Router("/node/add", &controllers.NodeController{}, "post:Add")
	beego.Router("/node/del", &controllers.NodeController{}, "post:Delete")
	beego.Router("/node/update", &controllers.NodeController{}, "post:Update")
	beego.Router("/node/pass/del", &controllers.NodeController{}, "post:DelPass")

	// Question
	beego.Router("/question/add", &controllers.QuestionController{}, "post:AdminAddQuestion")
	beego.Router("/question/del", &controllers.QuestionController{}, "post:Delete")

	// Knowledge
	beego.Router("/knowledge/add", &controllers.KnowledgeController{}, "post:AdminAddKnowledge")
	beego.Router("/knowledge/del", &controllers.KnowledgeController{}, "post:Delete")

	// User added
	beego.Router("/update", &controllers.UserAddedController{}, "post:UpdateUserAddStatus")
}
