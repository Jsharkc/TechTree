package models

type PassQuestionServiceProvider struct {
}

var PassQuestionService *PassQuestionServiceProvider = &PassQuestionServiceProvider{}

type PassQuestion struct {
	UID         string     `json:"uid"     gorm:"column:uid"   valid:"Required"`
	QID         string     `json:"qid"     gorm:"column:qid"   valid:"Required"`
	NID         string     `json:"nid"     gorm:"column:nid"   valid:"Required"`
}
