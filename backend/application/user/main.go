package main

import (
	"github.com/astaxie/beego"

	_ "github.com/Jsharkc/TechTree/backend/routers/user"
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/Jsharkc/TechTree/backend/rpc"
)

func main() {
	tidb.InitSql()
	rpc.InitClient()
	go rpc.Clients.Ping("RunRPC.Ping")
	beego.Run()
}
