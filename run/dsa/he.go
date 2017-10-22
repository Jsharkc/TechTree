package main

import (
	"github.com/Jsharkc/TechTree/lib/common"
	"github.com/Jsharkc/TechTree/lib/rpc"
	"fmt"
)

func main() {
	var s string
	a := common.Args{
		Code: "package main \n import \"fmt\" \n func main() { a,b := 3,4 \n fmt.Print(\"a+b =\",a+b) }",
		Kind:common.Exexcise,
		UID:"fdsv",
	}
	c := rpc.Dial(rpc.Options{
		"tcp",
		"127.0.0.1:1236",
	})


	c.Call("RunRpc.Run",a,&s)
	fmt.Println(s)
}