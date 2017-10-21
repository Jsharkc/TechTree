package models

import (
	"errors"
	"time"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/Jsharkc/TechTree/backend/utils"
	"github.com/satori/go.uuid"
	"github.com/jinzhu/gorm"
)

type UserServiceProvider struct {
}

var UserService *UserServiceProvider = &UserServiceProvider{}

type User struct {
	UserName string    `json:"name" gorm:"column:name" valid:"Required; MinSize(6);MaxSize(128)"`
	Password string    `json:"pass" gorm:"column:pass" valid:"Required; MinSize(6);MaxSize(16)"`
	Created  time.Time `json:"created"`
	Status   int       `json:"status"`
}

type UserAddNode struct {
	ID          string `json:"id"      gorm:"column:id"`
	PID         string `json:"pid"     gorm:"column:pid"    valid:"Required"`
	UID         string `json:"uid"     gorm:"column:uid"    valid:"Required"`
	Title       string `json:"title"   gorm:"column:title"  valid:"Required"`
	Description string `json:"desci"   gorm:"column:desci"  valid:"Required"`
	Agree       int    `json:"agree"   gorm:"column:agree"`
	Total       int    `json:"total"   gorm:"column:total"`
	Status      int    `json:"status"  gorm:"column:status"`
}

type Vote struct {
	UID  string `json:"uid"     gorm:"column:uid"   valid:"Required"`
	NID  string `json:"nid"     gorm:"column:pid"   valid:"Required"`
	Kind int    `json:"kind"    gorm:"column:kind"`
}

func (u User) TableName() string {
	return "user"
}

func (u UserAddNode) TableName() string {
	return "useraddnode"
}

func (v Vote) TableName() string {
	return "vote"
}

func (us *UserServiceProvider) Register(u *User) error {
	var (
		db  = tidb.Conn
		tx  = db.Begin()
		err error
	)

	defer func() {
		if err != nil {
			err = tx.Rollback().Error
		} else {
			err = tx.Commit().Error
		}
	}()

	hashcode, err := utils.GenerateHash(u.Password)
	if err != nil {
		return err
	}

	u.Password = string(hashcode)
	u.Status = general.Active
	u.Created = time.Now()

	err = tx.Create(&u).Error
	if err != nil {
		return err
	}

	return err
}

func (us *UserServiceProvider) Login(name, pass *string) (string, error) {
	var (
		u   User
		err error
	)

	db := tidb.Conn
	err = db.Model(&User{}).Where("name = ?", *name).First(&u).Error
	if err != nil {
		return "", err
	}

	if !utils.CompareHash([]byte(u.Password), *pass) {
		return "", errors.New("Password not right!")
	}

	return u.UserName, nil
}

func (us *UserServiceProvider) UserAddNode(n *UserAddNode) error {
	n.ID = uuid.NewV4().String()
	n.Status = general.Initial
	n.Agree  = 0
	n.Total  = 0

	return tidb.Conn.Create(n).Error
}

func (us *UserServiceProvider) Vote(v *Vote) error {
	var (
		db  = tidb.Conn
		tx  = db.Begin()
		err error
	)

	defer func() {
		if err != nil {
			err = tx.Rollback().Error
		} else {
			err = tx.Commit().Error
		}
	}()

	err = tx.Create(&v).Error
	if err != nil {
		return err
	}

	if (v.Kind == general.Agree) {
		err = tx.Exec("UPDATE useraddnode SET agree = agree+1, total = total+1 where id = ?", v.NID).Error
	} else {
		err = tx.Exec("UPDATE useraddnode SET total = total+1 where id = ?", v.NID).Error
	}

	return err
}

func (us *UserServiceProvider) IsVoted(v *Vote) (bool, error) {
	var vote Vote

	err := tidb.Conn.Model(&Vote{}).Where("uid = ? and nid = ?", v.UID, v.NID).First(&vote).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return false, nil
		} else {
			return false, err
		}
	}

	return true, nil
}
