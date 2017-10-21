package controllers

import (
	"encoding/json"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/models"
	"github.com/Jsharkc/TechTree/backend/utils"
	"github.com/Jsharkc/TechTree/lib/log"
)

type QuestionController struct {
	BaseController
}

func (qc *QuestionController) GetQuestion() {
	var (
		err    error
		q      []models.Question
		flag   bool
		nid struct{
			NID string `json:"nid" valid:"Required"`
			Num int    `json:"num" valid:"Required"`
		}
	)
	user := qc.GetSession(general.SessionUserID).(string)

	err = json.Unmarshal(qc.Ctx.Input.RequestBody, &nid)
	if err != nil {
		log.Logger.Error("Get question json unmarshal err:", err)
		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&nid)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The question key "+err.Key+" has err:", err)
		}

		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	q, err = models.QuestionService.GetQuestionByUser(user, nid.NID, nid.Num)
	if err != nil {
		log.Logger.Error("get question err:", err)
		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: q}
finish:
	qc.ServeJSON(true)
}

func (qc *QuestionController) AdminAddQuestion() {
	var (
		err  error
		q    models.Question
		flag bool
	)

	err = json.Unmarshal(qc.Ctx.Input.RequestBody, &q)
	if err != nil {
		log.Logger.Error("AdminAddQuestion question json unmarshal err:", err)
		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&q)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The question key "+err.Key+" has err:", err)
		}

		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.QuestionService.AdminAddQuestion(&q)
	if err != nil {
		log.Logger.Error("Add question mysql err:", err)
		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Add question success")
finish:
	qc.ServeJSON(true)
}

func (qc *QuestionController) Delete() {
	var (
		err      error
		id        string
	)

	err = json.Unmarshal(qc.Ctx.Input.RequestBody, &id)
	if err != nil {
		log.Logger.Error("Delete question json unmarshal err:", err)
		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.QuestionService.DeleteQuestion(id)
	if err != nil {
		log.Logger.Error("Delete question mysql err:", err)
		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Delete question success")
finish:
	qc.ServeJSON(true)
}

func (qc *QuestionController) Update() {
	var (
		err  error
		q    models.PassedQuestion
		flag bool
	)

	err = json.Unmarshal(qc.Ctx.Input.RequestBody, &q)
	if err != nil {
		log.Logger.Error("Update question json unmarshal err:", err)
		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&q)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The PassedQuestion key "+err.Key+" has err:", err)
		}

		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.QuestionService.AddPassed(&q)
	if err != nil {
		log.Logger.Error("admin add passed question mysql err:", err)
		qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	qc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("admin add passed question success")
finish:
	qc.ServeJSON(true)
}
