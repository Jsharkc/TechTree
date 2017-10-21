package utils

import (
	"github.com/astaxie/session"
	_ "github.com/astaxie/session/providers/memory"

	"github.com/Jsharkc/TechTree/backend/general"
)

var GlobalSessions *session.Manager

func init() {
	GlobalSessions, _ = session.NewManager("memory", general.SessionUserID, 3600)
	go GlobalSessions.GC()
}