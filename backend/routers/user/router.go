package routers

import (
	"github.com/astaxie/beego"

	"github.com/Jsharkc/TechTree/backend/controllers"
)

func init() {
	// User
	beego.Router("/login", &controllers.UserController{}, "post:Login")
	beego.Router("/user/register", &controllers.UserController{}, "post:Register")
	beego.Router("/user/run", &controllers.UserController{}, "post:DoTest")

	// Node
	beego.Router("/node/list", &controllers.NodeController{}, "get:ListAll")
	beego.Router("/node/add", &controllers.UserController{}, "post:AddNode")
	beego.Router("/node/vote/add", &controllers.UserController{}, "post:Vote")
	beego.Router("/node/vote/query", &controllers.UserController{}, "post:QueryVoteExist")
	beego.Router("/node/pass/add", &controllers.NodeController{}, "post:AddPass")
	beego.Router("/node/pass/query", &controllers.NodeController{}, "post:IsPassed")

	// Question
	beego.Router("/question/list", &controllers.QuestionController{}, "post:GetQuestion")
	beego.Router("/question/pass/add", &controllers.QuestionController{}, "post:AddPassed")

	// Knowledge
	beego.Router("/knowledge/list", &controllers.KnowledgeController{}, "post:GetKnowledge")

	// User added
	beego.Router("/add", &controllers.UserAddedController{}, "post:UserAdded")
}
