package main

import (
	"os"
	"syscall"

	"github.com/Jsharkc/TechTree/lib/log"
)

var (
	sigHandler *Handler
)

func initSignal() {
	sigHandler = New(finalHandler, func() {})
	log.Logger.Debug("Interrupt handler initialized")
}

func finalHandler(sig os.Signal) {
	switch sig {
	case syscall.SIGQUIT, syscall.SIGTERM, syscall.SIGINT:
		log.Logger.Info("Signal quit/term/int captured")
		return

	case syscall.SIGHUP:
		log.Logger.Info("Signal hup captured")
		return

	case syscall.SIGALRM:
		log.Logger.Info("Signal alrm captured")

		return
	}
}
