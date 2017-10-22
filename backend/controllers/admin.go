package controllers

import (
	"encoding/json"

	"github.com/jinzhu/gorm"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/models"
	"github.com/Jsharkc/TechTree/backend/utils"
	"github.com/Jsharkc/TechTree/lib/log"
)

type AdminController struct {
	BaseController
}

// Add - admin login
func (ac *AdminController) Add() {
	var (
		err   error
		admin models.Admin
		flag  bool
	)

	err = json.Unmarshal(ac.Ctx.Input.RequestBody, &admin)
	if err != nil {
		log.Logger.Error("Add admin json unmarshal err:", err)
		ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&admin)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("the user key "+err.Key+" has err:", err)
		}

		ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.AdminService.Add(&admin)
	if err != nil {
		log.Logger.Error("create user err:", err)
		ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	ac.SetSession(general.SessionUserID, admin.UserName)
	ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Login: Admin ID:%s", admin.UserName)
finish:
	ac.ServeJSON(true)
}

// Login - admin
func (ac *AdminController) Login() {
	var (
		err    error
		login  models.Admin
		userID string
		flag   bool
	)

	err = json.Unmarshal(ac.Ctx.Input.RequestBody, &login)
	if err != nil {
		log.Logger.Error("Admin login json unmarshal err:", err)
		ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&login)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("the user key "+err.Key+" has err:", err)
		}

		ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	userID, err = models.AdminService.Login(&login.UserName, &login.Password)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Logger.Error("Admin doesn't exist:", err)
			ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrNotFound}
			goto finish
		}

		log.Logger.Error("Admin login mysql err:", err)
		ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	ac.SetSession(general.SessionUserID, userID)
	ac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Login: Admin ID:%s", userID)
finish:
	ac.ServeJSON(true)
}
