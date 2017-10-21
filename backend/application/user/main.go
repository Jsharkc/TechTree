package main

import (
	"github.com/astaxie/beego"
	_ "github.com/Jsharkc/TechTree/backend/routers/user"
	"github.com/Jsharkc/TechTree/backend/tidb"
)

func main() {
	tidb.InitSql()
	beego.Run()
}
