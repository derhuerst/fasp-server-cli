# fasp-server-cli

**A simple command-line-based server for the [Friendly Audio Streaming Protocol](https://github.com/derhuerst/friendly-audio-streaming-protocol).** Based on [`fasp-server`](https://github.com/derhuerst/fasp-server).

[![npm version](https://img.shields.io/npm/v/fasp-server-cli.svg)](https://www.npmjs.com/package/fasp-server-cli)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/fasp-server-cli.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

First, follow [the installation instructions of `fasp-server`](https://github.com/derhuerst/fasp-server/blob/master/readme.md#installing).

```shell
npm install -g fasp-server-cli
```

Or use [`npx`](https://npmjs.com/package/npx).


## Usage

```
fasp-server init <name> <port>
    Generate a unique ID, store name and port in a config file at
    /Users/j/Library/Application Support/fasp-server-cli/config.json.
fasp-server
    Run the server with the name port from the config file.
```


## Contributing

If you have a question or have difficulties using `fasp-server-cli`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/fasp-server-cli/issues).
