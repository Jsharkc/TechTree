package main

import (
	"github.com/astaxie/beego"

	_ "github.com/Jsharkc/TechTree/backend/routers/user"
)

func main() {
	beego.Run()
}

