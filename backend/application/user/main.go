package main

import (
	"strings"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"

	_ "github.com/Jsharkc/TechTree/backend/routers/user"
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/Jsharkc/TechTree/backend/rpc"
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

	tidb.InitSql()
	rpc.InitClient()

	go rpc.Clients.Ping("RunRPC.Ping")

	beego.Run()
}
