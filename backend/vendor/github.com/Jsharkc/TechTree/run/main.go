package main

func main() {
	Load()
	initSignal()
	InitServer()
	sigHandler.Wait()
}
