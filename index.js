/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import http from 'http';
import { db } from './lib/database.js';
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import { watchFile, unwatchFile } from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
console.log('Starting . . .')

http.createServer(function (req, res) {
    console.log(`Just got a request at ${req.url}!`)
    res.write('Yo!');
    res.end();
}).listen(db.config.PORT);

function start() {
	let args = [path.join(__dirname, "main.js"), ...process.argv.slice(2)]
	let p = spawn(process.argv[0], args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
	.on('message', data => {
		if (data == 'reset') {
			console.log('Restarting . . .')
			p.kill()
			start()
		}
	})
	.on("exit", (_, code) => {
		if (code !== 0) start()
		watchFile(args[0], () => {
			unwatchFile(args[0])
			start()
		})
	})
}

start()