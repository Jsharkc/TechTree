package models

import (
	"errors"
	"time"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/tidb"
	"github.com/Jsharkc/TechTree/backend/utils"
)

type AdminServiceProvider struct {
}

var AdminService *AdminServiceProvider = &AdminServiceProvider{}

type Admin struct {
	UserName string    `json:"name" gorm:"column:name" valid:"Required; MinSize(6);MaxSize(128)"`
	Password string    `json:"pass" gorm:"column:pass" valid:"Required; MinSize(6);MaxSize(16)"`
	Created  time.Time `json:"created"`
	Status   int       `json:"status"`
}

func (a Admin) TableName() string {
	return "admin"
}

func (as *AdminServiceProvider) Add(a *Admin) error {
	var (
		db = tidb.Conn
		tx = db.Begin()
		err error
	)

	defer func() {
		if err != nil {
			err = tx.Rollback().Error
		} else {
			err = tx.Commit().Error
		}
	}()

	hashcode, err := utils.GenerateHash(a.Password)
	if err != nil {
		return err
	}

	a.Password = string(hashcode)
	a.Status = general.Active
	a.Created = time.Now()

	err = tx.Create(&a).Error
	if err != nil {
		return err
	}

	return err
}

func (as *AdminServiceProvider) Login(name, pass *string) (string, error) {
	var (
		a Admin
		err error
	)

	db := tidb.Conn
	err = db.Model(&Admin{}).Where("name = ?", *name).First(&a).Error
	if err != nil {
		return "", err
	}

	if !utils.CompareHash([]byte(a.Password), *pass) {
		return "", errors.New("Password not right!")
	}

	return a.UserName, nil
}
