package tidb

import (
	"fmt"

	"github.com/astaxie/beego"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
)

const (
	sql = "mysql"
)

var (
	Conn *gorm.DB
	err  error
)

func InitSql() {
	host := beego.AppConfig.String("mysql::host")
	port := beego.AppConfig.String("mysql::port")
	user := beego.AppConfig.String("mysql::user")
	pass := beego.AppConfig.String("mysql::pass")
	db := beego.AppConfig.String("mysql::db")
	conf := fmt.Sprintf(user + ":" + pass + "@" + "tcp(" + host + ":" + port + ")/" + db + "?charset=utf8&parseTime=True&loc=Local")
	Conn, err = gorm.Open(sql, conf)

	if err != nil {
		panic(err)
	}

	fmt.Println("DB Connected to %s", sql)
}
