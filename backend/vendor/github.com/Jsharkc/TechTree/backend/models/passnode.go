package models

type PassNodeServiceProvider struct {
}

var PassNodeService *PassNodeServiceProvider = &PassNodeServiceProvider{}

type PassNode struct {
	UID         string     `json:"uid"     gorm:"column:uid"   valid:"Required"`
	NID         string     `json:"nid"     gorm:"column:pid"   valid:"Required"`
}
