package controllers

import (
	"encoding/json"

	"github.com/jinzhu/gorm"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/models"
	"github.com/Jsharkc/TechTree/backend/rpc"
	"github.com/Jsharkc/TechTree/backend/utils"
	"github.com/Jsharkc/TechTree/lib/common"
	"github.com/Jsharkc/TechTree/lib/log"
)

type UserController struct {
	BaseController
}

// Register - user register
func (uc *UserController) Register() {
	var (
		err      error
		register models.User
		flag     bool
	)

	err = json.Unmarshal(uc.Ctx.Input.RequestBody, &register)
	if err != nil {
		log.Logger.Error("user register json unmarshal err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&register)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("the user key "+err.Key+" has err:", err)
		}

		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.UserService.Register(&register)
	if err != nil {
		log.Logger.Error("create user err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uc.SetSession(general.SessionUserID, register.UserName)
	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Login: User ID:%s", register.UserName)
finish:
	uc.ServeJSON(true)
}

// Login - user login
func (uc *UserController) Login() {
	var (
		err    error
		login  models.User
		userID string
		flag   bool
	)

	err = json.Unmarshal(uc.Ctx.Input.RequestBody, &login)
	if err != nil {
		log.Logger.Error("user login json unmarshal err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&login)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("the user key "+err.Key+" has err:", err)
		}

		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	userID, err = models.UserService.Login(&login.UserName, &login.Password)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Logger.Error("User doesn't exist:", err)
			uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrNotFound}
			goto finish
		}

		log.Logger.Error("user login mysql err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uc.SetSession(general.SessionUserID, userID)
	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Login: User ID:%s", userID)
finish:
	uc.ServeJSON(true)
}

// AddNode - user added node
func (uc *UserController) AddNode() {
	var (
		err  error
		node models.UserAddNode
		flag bool
	)

	err = json.Unmarshal(uc.Ctx.Input.RequestBody, &node)
	if err != nil {
		log.Logger.Error("User add node json unmarshal err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&node)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The user add node key "+err.Key+" has err:", err)
		}

		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.UserService.UserAddNode(&node)
	if err != nil {
		log.Logger.Error("User add node err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("User add node success!")
finish:
	uc.ServeJSON(true)
}

// Vote - user vote
func (uc *UserController) Vote() {
	var (
		err  error
		vote models.Vote
		flag bool
	)

	err = json.Unmarshal(uc.Ctx.Input.RequestBody, &vote)
	if err != nil {
		log.Logger.Error("User vote json unmarshal err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&vote)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The vote key "+err.Key+" has err:", err)
		}

		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.UserService.Vote(&vote)
	if err != nil {
		log.Logger.Error("User vote err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("User add node success!")
finish:
	uc.ServeJSON(true)
}

// QueryVoteExist - query vote exist
func (uc *UserController) QueryVoteExist() {
	var (
		err  error
		vote models.Vote
		flag bool
		ok   bool
	)

	err = json.Unmarshal(uc.Ctx.Input.RequestBody, &vote)
	if err != nil {
		log.Logger.Error("Query vote json unmarshal err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&vote)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The query vote key "+err.Key+" has err:", err)
		}

		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	ok, err = models.UserService.IsVoted(&vote)
	if err != nil {
		log.Logger.Error("User vote err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: ok}
	log.Logger.Info("User vote success!")
finish:
	uc.ServeJSON(true)
}

// DoExercise -
func (uc *UserController) DoExercise() {
	var (
		err  error
		code string
		a    common.Args
		out  string
	)

	user := uc.GetSession(general.SessionUserID).(string)
	err = json.Unmarshal(uc.Ctx.Input.RequestBody, &code)
	if err != nil {
		log.Logger.Error("nid unmarshal err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	a = common.Args{
		Kind: common.Exexcise,
		Code: code,
		UID:  user,
	}

	out, err = rpc.Run(a)
	if err != nil {
		log.Logger.Error("user run code err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}
	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: out}
finish:
	uc.ServeJSON(true)
}

type Test struct {
	Code string  `json:"code" gorm:"column:code" valid:"Required"`
    Qid  string  `json:"qid"     gorm:"column:qid"   valid:"Required"`
}

func (uc *UserController)  DoTest() {
	var (
		err  error
		t Test
		a    common.Args
		out  string
		path string
	)

	user := uc.GetSession(general.SessionUserID).(string)
	err = json.Unmarshal(uc.Ctx.Input.RequestBody, &t)
	if err != nil {
		log.Logger.Error("test unmarshal err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	path , err =models.QuestionService.GetTestPath(t.Qid)
	if err != nil {
		log.Logger.Error("Get TestPath err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	a = common.Args{
		Kind: common.Test,
		Code: t.Code,
		UID:  user,
		TestCode: path,
	}

	out, err = rpc.Run(a)
	if err != nil {
		log.Logger.Error("user run code err:", err)
		uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}
	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: out}
finish:
	uc.ServeJSON(true)
}
