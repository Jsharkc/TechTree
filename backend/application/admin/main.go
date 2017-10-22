package main

import (
	"strings"

	"github.com/Jsharkc/TechTree/backend/filters"
	_ "github.com/Jsharkc/TechTree/backend/routers/admin"
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"
)

func main() {
	// Allow CORS
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowOrigins:     strings.Split(beego.AppConfig.String("cors::hosts"), ","),
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	beego.InsertFilter("/*", beego.BeforeRouter, filters.LoginFilter)

	tidb.InitSql()

	beego.Run()
}
