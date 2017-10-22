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
	ID          string `json:"id"       gorm:"column:id"`
	NID         string `json:"nid"      gorm:"column:nid"       valid:"Required"`
	Description string `json:"desci"    gorm:"column:desci"      valid:"Required"`
	TestPath    string `json:"testpath" gorm:"column:testpath"  valid:"Required"`
	PrepCode    string `json:"prepcode" gorm:"column:prepcode"`
	Status      int    `json:"status"   gorm:"column:status"`
}

type PassedQuestion struct {
	UID string `json:"uid"     gorm:"column:uid"   valid:"Required"`
	QID string `json:"qid"     gorm:"column:qid"   valid:"Required"`
	NID string `json:"nid"     gorm:"column:nid"   valid:"Required"`
}

func (u Question) TableName() string {
	return "question"
}

func (pq PassedQuestion) TableName() string {
	return "passquestion"
}

func (qu *QuestionServiceProvider) GetQuestionByUser(user, nid string, num int) ([]Question, error) {
	var q []Question
	db := tidb.Conn.Raw("SELECT * FROM question WHERE status = ? ANd nid = ? AND id NOT IN (SELECT qid FROM passquestion WHERE uid = ? AND nid = ?)", general.Active, nid, user, nid).Limit(num).Scan(&q)
	return q, db.Error
}

func (qu *QuestionServiceProvider) AdminAddQuestion(question *Question) error {
	question.ID = uuid.NewV4().String()
	question.Status = general.Active
	return tidb.Conn.Model(&Question{}).Create(question).Error
}

func (qu *QuestionServiceProvider) DeleteQuestion(qid string) error {
	return tidb.Conn.Model(&Question{}).Where("id = ?", qid).Update("status", general.Inactive).Error
}

func (p *QuestionServiceProvider) AddPassed(pq *PassedQuestion) error {
	return tidb.Conn.Model(&PassedQuestion{}).Create(pq).Error
}

func (p *QuestionServiceProvider) GetTestPath(qid string) (string, error) {
	var q Question
	err := tidb.Conn.Model(&Question{}).Where("id = ?").Scan(&q)
	return q.TestPath, err.Error
}

func (p *QuestionServiceProvider) List() ([]Question, error) {
	var q []Question
	err := tidb.Conn.Model(&Question{}).Find(&q).Error
	return q, err
}
