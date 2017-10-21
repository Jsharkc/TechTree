package models

import (
	"time"
	"errors"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/Jsharkc/TechTree/backend/utils"
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
	ID          string     `json:"id"      gorm:"column:id"    valid:"Required"`
	PID         string     `json:"pid"     gorm:"column:pid"   valid:"Required"`
	Title       string     `json:"title"   gorm:"column:title" valid:"Required"`
	Description string     `json:"desc"    gorm:"column:desc"  valid:"Required"`
}

type Vote struct {
	UID         string     `json:"uid"     gorm:"column:uid"   valid:"Required"`
	NID         string     `json:"nid"     gorm:"column:pid"   valid:"Required"`
}

func (u User) TableName() string {
	return "user"
}

func (us *UserServiceProvider) Register(u *User) error {
	var (
		db  = tidb.Conn
		tx  = db.Begin()
		err error
	)

	err = tx.Create(&u).Error

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
	u.Status = general.UserActive
	u.Created = time.Now()

	return err
}

func (us *UserServiceProvider) Login(name, pass *string) (string, error) {
	var (
		u   User
		err error
	)

	db := tidb.Conn
	err = db.Where("name = ?", *name).First(&u).Error
	if err != nil {
		return "", err
	}

	if !utils.CompareHash([]byte(u.Password), *pass) {
		return "", errors.New("Password not right!")
	}

	return u.UserName, nil
}
