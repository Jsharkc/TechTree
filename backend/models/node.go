package models

import (
	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/jinzhu/gorm"
	"github.com/satori/go.uuid"
)

type NodeServiceProvider struct {
}

var NodeService *NodeServiceProvider = &NodeServiceProvider{}

type Node struct {
	ID     string `json:"id"     gorm:"column:id"`
	PID    string `json:"pid"    gorm:"column:pid"   valid:"Required"`
	Title  string `json:"label"  gorm:"column:title" valid:"Required"`
	Intro  string `json:"intro"  gorm:"column:intro" valid:"Required"`
	Status int32  `json:"status" gorm:"column:status"`
}

type HandleNode struct {
	ID    string `json:"id"    gorm:"column:id"    valid:"Required"`
	Title string `json:"title" gorm:"column:title"`
	Intro string `json:"intro" gorm:"column:intro"`
}

type PassNode struct {
	UID string `json:"uid"     gorm:"column:uid"   valid:"Required"`
	NID string `json:"nid"     gorm:"column:pid"   valid:"Required"`
}

func (u Node) TableName() string {
	return "node"
}

func (u PassNode) TableName() string {
	return "passnode"
}

func (nsp *NodeServiceProvider) IsPassed(uid, nid string) (bool, error) {
	var p PassNode
	err := tidb.Conn.Model(&PassNode{}).Where("uid = ? AND nid = ?", uid, nid).Scan(&p).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		} else {
			return false, err
		}
	}

	return true, nil
}

func (node *NodeServiceProvider) AdminAddNode(n *Node) error {
	n.ID = uuid.NewV4().String()
	n.Status = general.Inactive
	return tidb.Conn.Create(n).Error
}

func (node *NodeServiceProvider) Delete(nodeID string) error {
	return tidb.Conn.Delete(Node{}, "id = ?", nodeID).Error
}

func (node *NodeServiceProvider) Update(un *HandleNode) error {
	return tidb.Conn.Model(&Node{ID: un.ID}).Update(Node{Title: un.Title, Intro: un.Intro}).Error
}

func (node *NodeServiceProvider) ListAll(uid string) ([]Node, error) {
	var (
		passNodes, notPassNodes, nodes []Node
		allUserAddNodes                []UserAddNode
		nodeMap                        map[string]*Node
		noPassFlag                     bool
	)

	err := tidb.Conn.Raw("select * from node where id in (select nid from passnode where uid = ?)", uid).Scan(&passNodes).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return nil, err
	}

	if len(passNodes) == 0 {
		noPassFlag = true
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
			notPassNodes[index].Status = general.Active
		}
	}

	nodes = append(passNodes, notPassNodes...)

	if noPassFlag {
		for index, node := range nodes {
			if node.ID == node.PID {
				nodes[index].Status = general.Active
			}
		}
	} else {
		err = tidb.Conn.Find(&allUserAddNodes).Error
		if err != nil && err != gorm.ErrRecordNotFound {
			return nil, err
		}

		for _, node := range allUserAddNodes {
			if _, ok := nodeMap[node.PID]; ok {
				newNode := Node{
					ID:     node.ID,
					PID:    node.PID,
					Title:  node.Title,
					Intro:  node.Description,
					Status: general.NodeUserAdd,
				}

				nodes = append(nodes, newNode)
			}
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

func (node *NodeServiceProvider) AdminListAll() ([]Node, error) {
	var (
		nodes []Node
	)

	err := tidb.Conn.Find(&nodes).Error

	return nodes, err
}
