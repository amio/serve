# @amio/serve [![npm-version][npm-badge]][npm-link]

Handy http/https server, evolved from TJ's original [serve](https://github.com/tj/serve), which inspired by nodejitsu's [http-server](https://github.com/nodejitsu/http-server).

> Original `serve` is awesome, but seems lacks of maintenance these days,
> there's some useful fixes & features added to the codebase
> [since](https://github.com/tj/serve/compare/1.4.0...master) it's
> latest release in Mar 2014, but couldn't get landed to users,
> it's more than two years by now.  
> So here is this ongoing `serve`, and also an opinionated `serve`,
> which removed support for jade and stylus, for a much smaller installation footprint.

**Difference with `serve`**:

- Doesn't support jade and stylus ([Opinionated](https://github.com/amio/serve/issues/2)),
- so comes minimal installation footprint ([1.8M vs 15M](https://github.com/amio/serve/issues/2#issuecomment-238825598)).
- `-o, --open` opens a browser window to this server.
- `-s, --https` also serve over https.

## Installation

    $ npm install -g @amio/serve

## Usage

```
Usage: serve [options] [dir]

Options:

  -h, --help                output usage information
  -V, --version             output the version number
  -o, --open                opens a browser window to this server
  -a, --auth <user>:<pass>  specify basic auth credentials
  -F, --format <fmt>        specify the log format string
  -p, --port <port>         specify the port [3000]
      --https-port <port>   specify the port [3443]
  -H, --hidden              enable hidden file serving
  -I, --no-icons            disable icons
  -L, --no-logs             disable request logging
  -D, --no-dirs             disable directory serving
  -f, --favicon <path>      serve the given favicon
  -c, --cors                allows cross origin access serving
  -s, --https               also serve over https
      --key                 key file path for https
      --cert                certificate file for https
      --ca                  CA certificate file for https
      --compress            gzip or deflate the response
      --exec <cmd>          execute command on each request
```

## Examples

HTTP Accept support built into `connect.directory()`:

```bash
$ curl http://localhost:3000/ -H "Accept: text/plain"

  bin
  History.md
  node_modules
  package.json
  Readme.md
```

Requesting a file:

    $ curl http://localhost:3000/README.md

Requesting JSON for the directory listing:

    $ curl http://localhost:3000/ -H "Accept: application/json"
    ["bin","History.md","node_modules","package.json","Readme.md"]

Directory listing served by [serve-index](https://github.com/expressjs/serve-index) middleware.

## License

MIT License (c) 2011 TJ Holowaychuk

[npm-badge]: https://img.shields.io/npm/v/@amio/serve.svg?style=flat-square
[npm-link]: http://www.npmjs.com/package/@amio/serve
