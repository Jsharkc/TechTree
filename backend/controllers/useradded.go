package controllers

import (
	"encoding/json"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/models"
	"github.com/Jsharkc/TechTree/backend/utils"
	"github.com/Jsharkc/TechTree/lib/log"
)

type UserAddedController struct {
	BaseController
}


func (uac *UserAddedController) UserAdded() {
	var (
		err  error
		ua    models.UserAdded
		flag bool
	)

	uid := uac.GetSession(general.SessionUserID).(string)
	err = json.Unmarshal(uac.Ctx.Input.RequestBody, &ua)
	if err != nil {
		log.Logger.Error("UserAddQuestion question json unmarshal err:", err)
		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&ua)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The question key "+err.Key+" has err:", err)
		}

		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	if ua.Type != general.AddedTypeQues && ua.Type != general.AddedTypeKnow {
		log.Logger.Error("The add user added has error")
		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	ua.UID = uid

	err = models.UserAddedService.UserAdded(&ua)
	if err != nil {
		log.Logger.Error("user add question mysql err:", err)
		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("user add question success")
finish:
	uac.ServeJSON(true)
}

func (uac *UserAddedController) UpdateUserAddStatus() {
	var (
		err  error
		ua    models.UpdateUserAdded
		flag bool
	)

	err = json.Unmarshal(uac.Ctx.Input.RequestBody, &ua)
	if err != nil {
		log.Logger.Error("Update user add json unmarshal err:", err)
		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&ua)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The update user add key "+err.Key+" has err:", err)
		}

		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}
	
	if ua.Status != general.Agree && ua.Status != general.DisAgree {
		log.Logger.Error("The update user added has error")
		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.UserAddedService.Update(&ua.ID, ua.Status)
	if err != nil {
		log.Logger.Error("update user add question mysql err:", err)
		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
finish:
	uac.ServeJSON(true)
}
