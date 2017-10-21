package log

import (
	"fmt"
	"log"

	"go.uber.org/zap"
)

type RecordLog struct{}

var (
	Logger *RecordLog
	zapLog *zap.Logger
)

func init() {
	Logger = &RecordLog{}
	zapLog, _ = zap.NewDevelopment()
}

func (l *RecordLog) Error(desc string, err error) {
	zapLog.Error(desc, zap.Error(err))
}

func (l *RecordLog) Debug(format string, a ...interface{}) {
	info := fmt.Sprintf(format, a)
	zapLog.Debug(info, zap.Skip())
}

func (l *RecordLog) Fatal(v ...interface{}) {
	log.Fatal(v)
}

func (l *RecordLog) Info(format string, a ...interface{}) {
	info := fmt.Sprintf(format, a)
	zapLog.Info(info, zap.Skip())
}

func (l *RecordLog) Warn(format string, a ...interface{}) {
	warn := fmt.Sprintf(format, a)
	zapLog.Warn(warn, zap.Skip())
}
