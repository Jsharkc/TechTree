package main

import (
	"bytes"
	"os"
	"os/exec"
	"strconv"
	"time"

	"github.com/Jsharkc/TechTree/lib/common"
	"github.com/Jsharkc/TechTree/lib/log"
	"github.com/Jsharkc/TechTree/lib/rpc"
)

type RunRpc struct{}

const (
	Success = "Success!"
	Failed  = "Failed!"
)

func (r *RunRpc) Run(args common.Args, reply *string) error {
	var (
		out []byte
		run *exec.Cmd
		err error
	)

	timestamp := strconv.FormatInt(time.Now().UnixNano(), 10)
	filePath := "./file/" + timestamp + ".go"
	arg := []string{"run", filePath}

	gocode, _ := os.Create(filePath)
	gocode.WriteString(args.Code)
	if err := gocode.Close(); nil != err {
		log.Logger.Error("", err)
		*reply = ""
		return err
	}

	run = exec.Command("go", arg...)
	out, err = run.CombinedOutput()

	if args.Kind == common.Exexcise {
		*reply = string(out)
		return err
	}

	run = exec.Command("go", "run", args.TestCode+".go")
	te, err := run.CombinedOutput()
	if err != nil {
		log.Logger.Error("", err)
		*reply = string(te)
		return err
	}

	*reply = Failed
	if bytes.Compare(out, te) == 0 {
		*reply = Success
	}
	return err
}

func (access *RunRpc) Ping(req *rpc.ReqKeepAlive, resp *rpc.RespKeepAlive) error {
	return nil
}
