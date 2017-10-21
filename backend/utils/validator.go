package utils

import "github.com/astaxie/beego/validation"

var GlobalValid *validation.Validation

func init() {
	GlobalValid = &validation.Validation{}
}
