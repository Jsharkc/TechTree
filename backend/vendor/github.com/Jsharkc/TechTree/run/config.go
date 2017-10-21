package main

import (
	"github.com/Jsharkc/TechTree/lib/log"
	"github.com/spf13/viper"
)

var GNodeConfig *NodeConfig

type NodeConfig struct {
	Addrs string
}

func Load() {
	viper.AddConfigPath("./")
	viper.SetConfigName("config")

	if err := viper.ReadInConfig(); err != nil {
		log.Logger.Error("read config err:", err)
		panic(err)
	}

	GNodeConfig = &NodeConfig{
		Addrs: viper.GetString("serverIP"),
	}
}
