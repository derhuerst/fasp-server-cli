#!/usr/bin/env node
'use strict'

const mri = require('mri')
const path = require('path')
const envPaths = require('env-paths')

const pkg = require('./package.json')

const argv = mri(process.argv.slice(2), {
	boolean: [
		'help', 'h',
		'version', 'v',
		'headless'
	]
})

const cfgPath = path.join(envPaths(pkg.name, {suffix: ''}).data, 'config.json')

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    fasp-server init <name> <port>
        Generate a unique ID, store name and port in a config file at
        ${cfgPath}.
    fasp-server
        Run the server with the name port from the config file.
Options:
    --headless      No window, no video. Also disables --artwork. Default: false
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`fasp-server v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	if (process.env.NODE_DEBUG === pkg.name) console.error(err)
	else console.error(err.message || (err + ''))
	process.exit(1)
}

const fs = require('fs')

const cmd = argv._[0]
if (cmd === 'init') {
	const mkdirp = require('mkdirp')
	const {randomBytes} = require('crypto')

	const name = argv._[1]
	if ('string' !== typeof name || !name) showError('Missing name.')
	// todo: use get-port if no port given
	const port = parseInt(argv._[2])
	if (Number.isNaN(port) || port <= 0) showError('Invalid or missing port.')

	const id = randomBytes(8).toString('hex')

	mkdirp.sync(path.dirname(cfgPath))
	fs.writeFileSync(cfgPath, JSON.stringify({id, name, port}))
	console.info('Done.')
} else {
	let cfg
	try {
		cfg = fs.readFileSync(cfgPath, {encoding: 'utf8'})
	} catch (err) {
		if (err && err.code === 'ENOENT') {
			showError('Create a config file with the init command first.')
		}
		showError(err)
	}
	const {id, name, port} = JSON.parse(cfg)

	const createServer = require('fasp-server')
	createServer({
		id, name, port,
		headless: argv.headless
	}, (err) => {
		if (err) showError(err)
		else console.info(`${name} (${id}) listening on ${port}.`)
	})
}
