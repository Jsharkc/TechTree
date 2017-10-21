package models

import (
	"time"

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

func (u User) TableName() string {
	return "user"
}

func (us *UserServiceProvider) Register(u *User) error {
	var (
		db  = tidb.Conn
		tx  = db.Begin()
		err error
	)

	hashcode, err := utils.GenerateHash(u.Password)
	if err != nil {
		return err
	}

	u.Password = string(hashcode)
	u.Status = general.UserActive
	u.Created = time.Now()

	err = tx.Create(&u).Error

	defer func() {
		if err != nil {
			err = tx.Rollback().Error
		} else {
			err = tx.Commit().Error
		}
	}()

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
		return "", nil
	}

	return u.UserName, nil
}
