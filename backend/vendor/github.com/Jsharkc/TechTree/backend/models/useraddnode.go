package models

type UserAddNodeServiceProvider struct {
}

var UserAddNodeService *UserAddNodeServiceProvider = &UserAddNodeServiceProvider{}

type UserAddNode struct {
	ID          string     `json:"id"      gorm:"column:id"    valid:"Required"`
	PID         string     `json:"pid"     gorm:"column:pid"   valid:"Required"`
	Title       string     `json:"title"   gorm:"column:title" valid:"Required"`
	Description string     `json:"desc"    gorm:"column:desc"  valid:"Required"`
}
