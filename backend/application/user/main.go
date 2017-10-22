package main

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"
	"strings"

	"github.com/Jsharkc/TechTree/backend/filters"
	_ "github.com/Jsharkc/TechTree/backend/routers/user"
	"github.com/Jsharkc/TechTree/backend/rpc"
	"github.com/Jsharkc/TechTree/backend/tidb"
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

	tidb.InitSql()
	rpc.InitClient()

	go rpc.Clients.Ping("RunRPC.Ping")

	beego.InsertFilter("/*", beego.BeforeRouter, filters.LoginFilter)

	beego.Run()
}
