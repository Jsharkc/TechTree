package main

import (
	"strings"

	_ "github.com/Jsharkc/TechTree/backend/routers/admin"
	"github.com/astaxie/beego/plugins/cors"
	"github.com/astaxie/beego"
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/Jsharkc/TechTree/backend/filters"
)

func main() {
	//允许CORS
	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowOrigins:     strings.Split(beego.AppConfig.String("cors::hosts"), ","),
		AllowMethods:     []string{"POST", "GET"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	beego.InsertFilter("/*",beego.BeforeRouter, filters.LoginFilter)

	tidb.InitSql()

	beego.Run()
}

