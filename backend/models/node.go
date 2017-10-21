package models

import (
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/jinzhu/gorm"
)

type NodeServiceProvider struct {
}

var NodeService *NodeServiceProvider = &NodeServiceProvider{}

type Node struct {
	ID      string     `json:"id"     gorm:"column:id"    valid:"Required"`
	PID     string     `json:"pid"    gorm:"column:pid"   valid:"Required"`
	Title   string     `json:"title"  gorm:"column:title" valid:"Required"`
	Intro   string     `json:"intro"  gorm:"column:intro" valid:"Required"`
	Status  int32      `json:"status" gorm:"column:status"`
}

type HandleNode struct {
	ID      string     `json:"id"    gorm:"column:id"    valid:"Required"`
	Title   string     `json:"title" gorm:"column:title"`
	Intro   string     `json:"intro" gorm:"column:intro"`
}

type PassNode struct {
	UID         string     `json:"uid"     gorm:"column:uid"   valid:"Required"`
	NID         string     `json:"nid"     gorm:"column:pid"   valid:"Required"`
}

func (u Node) TableName() string {
	return "node"
}

func (u PassNode) TableName() string {
	return "passnode"
}

func (node *NodeServiceProvider) Add(n *Node) error {
	n.Status = general.NodeNoActive
	return tidb.Conn.Create(n).Error
}

func (node *NodeServiceProvider) Delete(nodeID string) error {
	return tidb.Conn.Delete(Node{}, "id = ?", nodeID).Error
}

func (node *NodeServiceProvider) Update(un *HandleNode) error {
	return tidb.Conn.Model(&Node{}).Update(Node{Title: un.Title, Intro: un.Intro}).Error
}

func (node *NodeServiceProvider) ListAll(uid string) ([]Node, error) {
	var (
		passNodes, notPassNodes, nodes []Node
		allUserAddNodes []UserAddNode
		nodeMap map[string]*Node
	)

	err := tidb.Conn.Raw("select * from node where id in (select nid from passnode where uid = ?)", uid).Scan(&passNodes).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}

	for index, node := range passNodes {
		nodeMap[node.ID] = &passNodes[index]
		passNodes[index].Status = general.NodePassed
	}

	err = tidb.Conn.Raw("select * from node where id not in (select nid from passnode where uid = ?)", uid).Scan(&notPassNodes).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}

	for index, node := range notPassNodes {
		if _, ok := nodeMap[node.PID]; ok {
			notPassNodes[index].Status = general.NodeActive
		}
	}

	nodes = append(passNodes, notPassNodes...)

	err = tidb.Conn.Find(&allUserAddNodes).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}

	for _, node := range allUserAddNodes {
		if _, ok := nodeMap[node.PID]; ok {
			newNode := Node{
				ID: node.ID,
				PID: node.PID,
				Title: node.Title,
				Intro: node.Description,
				Status: general.NoseUserAdd,
			}

			nodes = append(nodes, newNode)
		}
	}

	return nodes, nil
}

func (node *NodeServiceProvider) AddPass(pn *PassNode) error {
	return tidb.Conn.Create(pn).Error
}

func (node *NodeServiceProvider) DelPass(pn *PassNode) error {
	return tidb.Conn.Delete(PassNode{}, "uid = ? and nid = ?", pn.UID, pn.NID).Error
}
