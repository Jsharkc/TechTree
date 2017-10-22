package filters

import (
	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/astaxie/beego/context"
)

var filterUrl map[string]struct{}

func LoginFilter(ctx *context.Context) {
	if _, ok := filterUrl[ctx.Request.RequestURI]; !ok {
		userID := ctx.Input.CruSession.Get(general.SessionUserID)

		if userID == nil {
			ctx.Output.JSON(map[string]interface{}{general.RespKeyStatus: general.ErrNotLogin}, false, false)
		}
	}
}

func init() {
	filterUrl = make(map[string]struct{})

	filterUrl["/login"] = struct{}{}
	filterUrl["/user/register"] = struct{}{}
	filterUrl["/admin/add"] = struct{}{}
}
