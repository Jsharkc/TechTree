package models

import (
	"github.com/satori/go.uuid"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/tidb"
)

type UserAddedServiceProvider struct {
}

var UserAddedService *UserAddedServiceProvider = &UserAddedServiceProvider{}

type UserAdded struct {
	ID          string `json:"id"       gorm:"column:id"`
	NID         string `json:"nid"      gorm:"column:nid"       valid:"Required"`
	UID         string `json:"uid"      gorm:"column:uid"`
	Description string `json:"desci"    gorm:"column:desc"      valid:"Required"`
	Status      int    `json:"status"   gorm:"column:status"`
	Type        int    `json:"type"     gorm:"column:thetype"   valid:"Required"`
}

type UpdateUserAdded struct {
	ID          string `json:"id"       gorm:"column:id"        valid:"Required"`
	Status      int    `json:"status"   gorm:"column:status"`
}

func (ua UserAdded)TableName() string {
	return "useradded"
}

func (uas *UserAddedServiceProvider) UserAdded(u *UserAdded) error {
	u.ID = uuid.NewV4().String()
	u.Status = general.Initial
	return tidb.Conn.Model(&UserAdded{}).Create(u).Error
}

func (p *UserAddedServiceProvider) Update(id *string, status int) error {
	return tidb.Conn.Model(&UserAdded{}).Where("id = ?", *id).Update("status", status).Error
}
