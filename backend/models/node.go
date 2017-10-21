package models

import (
	"github.com/Jsharkc/TechTree/backend/tidb"
)

type NodeServiceProvider struct {
}

var NodeService *NodeServiceProvider = &NodeServiceProvider{}

type Node struct {
	ID      string     `json:"id"    gorm:"column:id"    valid:"Required"`
	PID     string     `json:"pid"   gorm:"column:pid"   valid:"Required"`
	Title   string     `json:"title" gorm:"column:title" valid:"Required"`
	Intro   string     `json:"intro" gorm:"column:intro" valid:"Required"`
}

type HandleNode struct {
	ID      string     `json:"id"    gorm:"column:id"    valid:"Required"`
	Title   string     `json:"title" gorm:"column:title"`
	Intro   string     `json:"intro" gorm:"column:intro"`
}

func (u Node) TableName() string {
	return "node"
}

func (node *NodeServiceProvider) Add(n *Node) error {
	return tidb.Conn.Create(n).Error
}

func (node *NodeServiceProvider) Delete(nodeID string) error {
	return tidb.Conn.Delete(Node{}, "id = ?", nodeID).Error
}

func (node *NodeServiceProvider) Update(un *HandleNode) error {
	return tidb.Conn.Model(&Node{}).Update(Node{Title: un.Title, Intro: un.Intro}).Error
}

func (node *NodeServiceProvider) ListAll() ([]Node, error) {


	return nil, nil
}
