package mongo

import (
    "github.com/astaxie/beego"
    "gopkg.in/mgo.v2"
)

var (
    MetalSession *mgo.Session
)

const (
    MDMetalUserDName = "metal"
    MDMetalWareDName = "wares"
)

// 初始化 MongoDB 连接、文档类型初始化
func InitMetal() {
    url := beego.AppConfig.String("mongo::url")

    var err error
    MetalSession, err = mgo.Dial(url + "/" + MDMetalUserDName)

    if err != nil {
        panic(err)
    }

    beego.Debug("the MongoDB of metal connected!")

    // 尽可能利用 MongoDB 分布性特性
    MetalSession.SetMode(mgo.Monotonic, true)
}

// 初始化 MongoDB 连接、文档类型初始化
func InitWares() {
    url := beego.AppConfig.String("mongo::url")

    var err error
    MetalSession, err = mgo.Dial(url + "/" + MDMetalWareDName)

    if err != nil {
        panic(err)
    }

    beego.Debug("the MongoDB of wares connected!")

    // 尽可能利用 MongoDB 分布性特性
    MetalSession.SetMode(mgo.Monotonic, true)
}
