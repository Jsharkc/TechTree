package controllers

import (
	"encoding/json"

	"github.com/astaxie/beego/validation"
	"github.com/jinzhu/gorm"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/lib/log"
	"github.com/Jsharkc/TechTree/backend/models"
	"github.com/Jsharkc/TechTree/backend/utils"
)

type UserController struct {
	BaseController
}

func (uc *UserController) Register() {
	var (
		valid    = validation.Validation{}
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

	flag, err = valid.Valid(&register)
	if !flag {
		for _, err := range valid.Errors {
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

	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}

finish:
	uc.ServeJSON(true)
}

func (uc *UserController) Login() {
	var (
		err     error
		login   models.User
		userID  string
		session = utils.GlobalSessions.SessionStart(uc.Ctx.ResponseWriter, uc.Ctx.Request)
	)

	err = json.Unmarshal(uc.Ctx.Input.RequestBody, &login)
	if err != nil {
		log.Logger.Error("user login json unmarshal err:", err)
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

	session.Set(general.SessionUserID, userID)
	uc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Login: User ID:", userID)
finish:
	uc.ServeJSON(true)
}
