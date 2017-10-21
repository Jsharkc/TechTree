package rpc

import (
	"errors"
)

var (
	// ErrRPCNoClientAvailable - No client left in collection
	ErrRPCNoClientAvailable = errors.New("No rpc client available now")
)

// Clients - rpc client collections
type Clients struct {
	// rpc.Client is thread-safe, so Locker isn't required here
	clients []*Client
}

// Dials to rpc servers
func Dials(ops []Options) *Clients {
	clients := new(Clients)

	for _, op := range ops {
		clients.clients = append(clients.clients, Dial(op))
	}

	return clients
}

// get a usable client
func (c *Clients) get() (*Client, error) {
	for _, cli := range c.clients {
		if cli != nil && cli.Client != nil && cli.Error() == nil {
			return cli, nil
		}
	}
	return nil, ErrRPCNoClientAvailable
}

func (c *Clients) Get(addr string) (*Client, error) {
	for {
		c, err := c.get()
		if err != nil {
			return nil, err
		} else if c.options.Addr == addr {
			return c, nil
		}

		continue
	}
}

// Available checks if exists a available client.
func (c *Clients) Available() error {
	_, err := c.get()

	return err
}

// Call invokes the named function, waits for it to complete, and returns its error status.
func (c *Clients) Call(serviceMethod string, args interface{}, reply interface{}) error {
	var (
		err error
		cli *Client
	)

	if cli, err = c.get(); err == nil {
		err = cli.Call(serviceMethod, args, reply)
	}

	return err
}

// Ping the rpc connect and reconnect when has an error.
func (c *Clients) Ping(ping string) {
	for _, cli := range c.clients {
		go cli.Ping(ping)
	}
}
