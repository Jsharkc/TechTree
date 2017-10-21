package controllers

import (
	"encoding/json"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/lib/log"
	"github.com/Jsharkc/TechTree/backend/models"
	"github.com/Jsharkc/TechTree/backend/utils"
)

type NodeController struct {
	BaseController
}

func (nc *NodeController) Add() {
	var (
		err      error
		node     models.Node
		flag     bool
	)

	err = json.Unmarshal(nc.Ctx.Input.RequestBody, &node)
	if err != nil {
		log.Logger.Error("Add node json unmarshal err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&node)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The node key "+err.Key+" has err:", err)
		}

		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.NodeService.Add(&node)
	if err != nil {
		log.Logger.Error("Add node mysql err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Add node success")
finish:
	nc.ServeJSON(true)
}

func (nc *NodeController) Delete() {
	var (
		err      error
		hnode    models.HandleNode
		flag     bool
	)

	err = json.Unmarshal(nc.Ctx.Input.RequestBody, &hnode)
	if err != nil {
		log.Logger.Error("Del node json unmarshal err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&hnode)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The node key "+err.Key+" has err:", err)
		}

		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.NodeService.Delete(hnode.ID)
	if err != nil {
		log.Logger.Error("Del node mysql err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Del node success")
finish:
	nc.ServeJSON(true)
}

func (nc *NodeController) Update() {
	var (
		err      error
		hnode    models.HandleNode
		flag     bool
	)

	err = json.Unmarshal(nc.Ctx.Input.RequestBody, &hnode)
	if err != nil {
		log.Logger.Error("Update node json unmarshal err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&hnode)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The node key "+err.Key+" has err:", err)
		}

		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.NodeService.Update(&hnode)
	if err != nil {
		log.Logger.Error("Update node mysql err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Update node success")
finish:
	nc.ServeJSON(true)
}

func (nc *NodeController) ListAll() {
	var (
		err      error
		flag     bool
		nodes    []models.Node
		username struct {
			UserName  string `json:"name" valid:"Required; MinSize(6);MaxSize(128)"`
		}
	)

	err = json.Unmarshal(nc.Ctx.Input.RequestBody, &username)
	if err != nil {
		log.Logger.Error("List all node json unmarshal err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&username)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The list node key "+err.Key+" has err:", err)
		}

		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	nodes, err = models.NodeService.ListAll(username.UserName)
	if err != nil {
		log.Logger.Error("List all node mysql err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: nodes}
	log.Logger.Info("List all node success")
	finish:
	nc.ServeJSON(true)
}
