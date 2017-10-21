package models

import (
	"github.com/satori/go.uuid"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/tidb"
)

type KnowledgeServiceProvider struct {
}

var KnowledgeService *KnowledgeServiceProvider = &KnowledgeServiceProvider{}

type Knowledge struct {
	ID          string `json:"id"       gorm:"column:id"`
	NID         string `json:"nid"      gorm:"column:nid"       valid:"Required"`
	Description string `json:"desci"    gorm:"column:desci"      valid:"Required"`
	Status      int    `json:"status"   gorm:"column:status"`
}

func (k Knowledge) TableName() string {
	return "knowledge"
}

func (qu *KnowledgeServiceProvider) GetKnowledgeByNode(nid string) ([]Knowledge, error) {
	var k []Knowledge
	db := tidb.Conn.Raw("SELECT * FROM Knowledge WHERE status = ? AND nid = ?)", general.Active, nid).Scan(&k)
	return k, db.Error
}

func (qu *KnowledgeServiceProvider) AdminAddKnowledge(Know *Knowledge) error {
	Know.ID = uuid.NewV4().String()
	Know.Status = general.Active
	return tidb.Conn.Model(&Knowledge{}).Create(Know).Error
}

func (qu *KnowledgeServiceProvider) DeleteKnowledge(kid string) error {
	return tidb.Conn.Model(&Knowledge{}).Where("id = ?", kid).Update("status", general.Inactive).Error
}
