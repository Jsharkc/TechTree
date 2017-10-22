package controllers

import (
	"encoding/json"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/models"
	"github.com/Jsharkc/TechTree/backend/utils"
	"github.com/Jsharkc/TechTree/lib/log"
	"github.com/jinzhu/gorm"
)

type UserAddedController struct {
	BaseController
}

// UserAdded - user added question or knowledge
func (uac *UserAddedController) UserAdded() {
	var (
		err  error
		ua   models.UserAdded
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
		log.Logger.Error("The add user added has error", err)
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
		ua   models.UpdateUserAdded
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
		log.Logger.Error("The update user added has error", err)
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

func (uac *UserAddedController) ListQues() {
	var (
		err error
		ua  []models.UserAdded
	)

	ua, err = models.UserAddedService.ListQues()
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Logger.Error("User added question not found", err)
			uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrNotFound}
			goto finish
		}

		log.Logger.Error("List knowledge err:", err)
		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: ua}
finish:
	uac.ServeJSON(true)
}

func (uac *UserAddedController) ListKnow() {
	var (
		err error
		ua  []models.UserAdded
	)

	ua, err = models.UserAddedService.ListKnow()
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Logger.Error("User added knowledge not found", err)
			uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrNotFound}
			goto finish
		}

		log.Logger.Error("List knowledge err:", err)
		uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	uac.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: ua}
finish:
	uac.ServeJSON(true)
}
