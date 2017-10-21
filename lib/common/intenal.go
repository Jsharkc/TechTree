package common

const (
	Exexcise = 0
	Test = 1
)

type Args struct {
	Code     string
	TestCode string
	UID      string
	Kind     int
}