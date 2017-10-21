package rpc

import (
	"github.com/astaxie/beego"

	"github.com/Jsharkc/TechTree/lib/common"
	"github.com/Jsharkc/TechTree/lib/rpc"
)

var (
	host    = beego.AppConfig.String("rpc::Address")
	num, _  = beego.AppConfig.Int("rpc::ClientNum")
	Clients *rpc.Clients
)

func InitClient() {
	var ops []rpc.Options
	op := rpc.Options{
		"tcp",
		host,
	}

	for i := 0; i < num; i++ {
		ops = append(ops, op)
	}


	Clients = rpc.Dials(ops)
}

func Run(arg common.Args) (string, error) {
	var reply string
	client, err := Clients.Get(host)
	if err != nil {
		return "", err
	}

	err = client.Call("RunRpc.Run", arg, &reply)
	return reply, err
}
