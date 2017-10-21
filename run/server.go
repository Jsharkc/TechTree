package main

import (
	"net"
	"net/rpc"

	"github.com/Jsharkc/TechTree/lib/log"
)

func InitServer() {
	rpc.Register(new(RunRpc))
	rpc.HandleHTTP()

	go rpcListen()
}

func rpcListen() {
	l, err := net.Listen("tcp", GNodeConfig.Addrs)
	if err != nil {
		log.Logger.Error("net.Listen(%s, %s) error(%v)"+"tcp"+GNodeConfig.Addrs, err)
		panic(err)
	}

	defer func() {
		log.Logger.Info("listen rpc: %s close", GNodeConfig.Addrs)
		if err := l.Close(); err != nil {
			log.Logger.Error("listener.Close() error(%v)", err)
		}
	}()
	rpc.Accept(l)
}
