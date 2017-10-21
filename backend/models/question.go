package models

import (
	"github.com/satori/go.uuid"

	"github.com/Jsharkc/TechTree/backend/general"
	"github.com/Jsharkc/TechTree/backend/tidb"
)

type QuestionServiceProvider struct {
}

var QuestionService *QuestionServiceProvider = &QuestionServiceProvider{}

type Question struct {
	ID          string `json:"id"       gorm:"column:id"        valid:"Required"`
	NID         string `json:"nid"      gorm:"column:nid"       valid:"Required"`
	Description string `json:"desci"    gorm:"column:desc"      valid:"Required"`
	TestPath    string `json:"testpath" gorm:"column:testpath"  valid:"Required"`
	PrepCode    string `json:"prepcode" gorm:"column:prepcode"  valid:"Required"`
	Status      int    `json:"status"   gorm:"column:status"`
}

type PassedQuestion struct {
	UID string `json:"uid"     gorm:"column:uid"   valid:"Required"`
	QID string `json:"qid"     gorm:"column:qid"   valid:"Required"`
	NID string `json:"nid"     gorm:"column:nid"   valid:"Required"`
}

type UserAddQues struct {
	ID          string `json:"id"       gorm:"column:id"        valid:"Required"`
	NID         string `json:"nid"      gorm:"column:nid"       valid:"Required"`
	Description string `json:"desci"    gorm:"column:desc"      valid:"Required"`
	Status      int    `json:"status"   gorm:"column:status"`
}

func (u Question) TableName() string {
	return "question"
}

func (pq PassedQuestion) TableName() string {
	return "passquestion"
}

func (pq UserAddQues)TableName() string {
	return "useraddques"
}

func (qu *QuestionServiceProvider) GetQuestionByUser(user string, num int) ([]Question, error) {
	var q []Question
	err := tidb.Conn.Raw("SELECT * FROM question WHERE status = ? AND id NOT IN (SELECT uid FROM passquestion WHERE uid = ? AND status = ?)", general.Active, user, general.Active).Scan(&q)
	return q[0:num], err.Error
}

func (qu *QuestionServiceProvider) AdminAddQuestion(question *Question) error {
	question.ID = uuid.NewV4().String()
	question.Status = general.Active
	return tidb.Conn.Model(&Question{}).Create(question).Error
}

func (qu *QuestionServiceProvider) UserAddQuestion(q *UserAddQues) error {
	q.ID = uuid.NewV4().String()
	q.Status = general.Active
	return tidb.Conn.Model(&UserAddQues{}).Create(q).Error
}

func (qu *QuestionServiceProvider) DeleteQuestion(qid string) error {
	return tidb.Conn.Model(&Question{}).Where("id = ?", qid).Update("status", general.Inactive).Error
}

func (p *QuestionServiceProvider)AddPassed(pq *PassedQuestion) error {
	return tidb.Conn.Model(&PassedQuestion{}).Create(pq).Error
}

func (p *QuestionServiceProvider) Update(qid *string) error {
	return tidb.Conn.Model(&UserAddQues{}).Where("id = ?", *qid).Update("status", general.Inactive).Error
}