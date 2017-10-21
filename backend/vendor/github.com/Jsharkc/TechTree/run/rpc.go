package main

import (
	"github.com/Jsharkc/TechTree/lib/common"
	"github.com/Jsharkc/TechTree/lib/rpc"
)

type RunRpc struct{}

func (r *RunRpc) Run(args common.Args, reply *string) error {
	return nil
}

func (access *RunRpc) Ping(req *rpc.ReqKeepAlive, resp *rpc.RespKeepAlive) error {
	return nil
}
