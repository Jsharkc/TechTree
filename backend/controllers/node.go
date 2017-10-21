package controllers

import (
	"encoding/json"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/lib/log"
	"github.com/Jsharkc/TechTree/backend/models"
	"github.com/Jsharkc/TechTree/backend/utils"
	"github.com/jinzhu/gorm"
)

type NodeController struct {
	BaseController
}

// Add - admin add node
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

	err = models.NodeService.AdminAddNode(&node)
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

// Delete - admin delete node by node ID
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

// Update - admin update node content
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

// ListAll - list all node with status for user
func (nc *NodeController) ListAll() {
	var (
		err      error
		nodes    []models.Node
	)

	uid := nc.GetSession(general.SessionUserID).(string)
	if err != nil {
		log.Logger.Error("List all node json unmarshal err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	nodes, err = models.NodeService.ListAll(uid)
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

// AddPass - user add himself passed node
func (nc *NodeController) AddPass() {
	var (
		err      error
		pnode     models.PassNode
		flag     bool
	)

	err = json.Unmarshal(nc.Ctx.Input.RequestBody, &pnode)
	if err != nil {
		log.Logger.Error("Add pass node json unmarshal err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&pnode)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The node key "+err.Key+" has err:", err)
		}

		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.NodeService.AddPass(&pnode)
	if err != nil {
		log.Logger.Error("Add pss node mysql err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Add pass node success")
finish:
	nc.ServeJSON(true)
}

// DelPass - admin delete user passed node
func (nc *NodeController) DelPass() {
	var (
		err      error
		pnode    models.PassNode
		flag     bool
	)

	err = json.Unmarshal(nc.Ctx.Input.RequestBody, &pnode)
	if err != nil {
		log.Logger.Error("Del pass node json unmarshal err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&pnode)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The node key "+err.Key+" has err:", err)
		}

		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	err = models.NodeService.DelPass(&pnode)
	if err != nil {
		log.Logger.Error("Del pss node mysql err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed}
	log.Logger.Info("Del pass node success")
	finish:
	nc.ServeJSON(true)
}

// IsPassed - judge if he pass this node
func (nc *NodeController) IsPassed() {
	var (
		err      error
		pnode    models.PassNode
		flag     bool
		ok       bool
	)

	err = json.Unmarshal(nc.Ctx.Input.RequestBody, &pnode)
	if err != nil {
		log.Logger.Error("Is pass node json unmarshal err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	flag, err = utils.GlobalValid.Valid(&pnode)
	if !flag {
		for _, err := range utils.GlobalValid.Errors {
			log.Logger.Error("The node key "+err.Key+" has err:", err)
		}

		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrInvalidParams}
		goto finish
	}

	ok, err = models.NodeService.IsPassed(pnode.UID, pnode.NID)
	if err != nil {
		log.Logger.Error("Is pass node mysql err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: ok}
	log.Logger.Info("Is passed node %b", ok)
finish:
	nc.ServeJSON(true)
}

// AdminListAll - list all node for admin
func (nc *NodeController) AdminListAll() {
	var (
		err      error
		nodes    []models.Node
	)

	nodes, err = models.NodeService.AdminListAll()
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Logger.Error("Node not found", err)
			nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrNotFound}
			goto finish
		}

		log.Logger.Error("List all node mysql err:", err)
		nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrMysql}
		goto finish
	}

	nc.Data["json"] = map[string]interface{}{general.RespKeyStatus: general.ErrSucceed, general.RespKeyData: nodes}
	log.Logger.Info("List all node success")
finish:
	nc.ServeJSON(true)
}
