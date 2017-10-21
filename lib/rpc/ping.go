package rpc

// ReqKeepAlive - Keepalive request
type ReqKeepAlive struct {
}

// RespKeepAlive - Keepalive response
type RespKeepAlive struct {
}

// KeepAlive is general rpc ping interface.
type KeepAlive interface {
	Ping(req *ReqKeepAlive, resp *RespKeepAlive) error
}
