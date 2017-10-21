package models

type QuestionServiceProvider struct {
}

var QuestionService *QuestionServiceProvider = &QuestionServiceProvider{}

type Question struct {
	ID          string     `json:"id"       gorm:"column:id"        valid:"Required"`
	NID         string     `json:"nid"      gorm:"column:nid"       valid:"Required"`
	Description string     `json:"desc"     gorm:"column:desc"      valid:"Required"`
	TestPath    string     `json:"testpath" gorm:"column:testpath"  valid:"Required"`
	PrepCode    string     `json:"prepcode  gorm:"cllumn:"prepcode" valid:"Required"`
}
