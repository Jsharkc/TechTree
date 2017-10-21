package models

type NodeServiceProvider struct {
}

var NodeService *NodeServiceProvider = &NodeServiceProvider{}

type Node struct {
	ID      string     `json:"id"  gorm:"column:id" valid:"Required"`
	PID     string     `json:"pid" gorm:"column:pid" valid:"Required"`
	Title   string     `json:"title"`
	Intro   string     `json:"intro"`
}
