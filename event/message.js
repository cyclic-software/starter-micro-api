/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import chalk from 'chalk'
import { 
    resolveMessage,
	getMessageType,
	getQuotent
} from '../lib/objectMessage.js'
import { getGroupAdmins } from '../lib/getGroupAdmins.js';
import { Command } from '../lib/handler.js';
import { join, dirname } from 'path';
import { fileURLToPath } from "url";
import { 
    colorize,
	Colors
} from '../lib/colorize.js';
import { func } from '../lib/function.js';
import { inspect } from 'util';
import { db } from '../lib/database.js';

let prefix = '.'
const __dirname = dirname(fileURLToPath(import.meta.url));

export async function onMessageUpsert (message, conn) {
	const fromMe = message.key.fromMe
	const isStatus = message.key.remoteJid == 'status@broadcast'
	
	if (!fromMe || isStatus) {
		return
	}
	
	conn.readMessages([message.key])

	if (!message.message) return
	const type = Object.keys(message.message)[0]
	const body = resolveMessage(message)
	const messageType = getMessageType(message)
	const content = JSON.stringify(message.message)
	const quotent = getQuotent(type, content)
	const from = message.key.remoteJid
	const isGroup = from.endsWith('@g.us')
	const pushname = message.pushName
	const isCmd = body.startsWith(prefix)
	const command = isCmd ? body.slice(1).trim().split(/ +/).shift().toLowerCase() : undefined
	const sender = isGroup ? message.key.participant : from
	const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
	const groupName = isGroup ? await groupMetadata.subject : ''
	const groupDesc = isGroup ? await groupMetadata.desc : ''
	const groupMembers = isGroup ? await groupMetadata.participants : []
	const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : []
	const isAdmin = groupAdmins.includes(sender)
	const botIsAdmin = groupAdmins.includes(conn.user.id.split(':')[0]+'@s.whatsapp.net')
	const args = body.trim().split(/ +/).splice(1)
	const q = args.join(' ')
	
	const reply = (text) => {
		conn.sendMessage(from, { text, mentions: [func.parseMention(text)] }, { quoted: message })
	}
	
	if (!isGroup && isCmd) {
		console.log(
			`${colorize('\n[ PC ]', Colors.FgGreen)}\n` +
			`${colorize('[ Name ]:', Colors.FgMagenta)} ${pushname}\n` +
			`${colorize('[ CMD ]:', Colors.FgMagenta)} ${command}\n` +
			`${colorize('[ ==================== ]', Colors.FgGreen)}`
		)
	} else if (isGroup && isCmd) {
		console.log(
			`${colorize('\n[ GC ]', Colors.FgGreen)}\n` +
			`${colorize('[ Name ]:', Colors.FgMagenta)} ${pushname}\n` +
			`${colorize('[ CMD ]:', Colors.FgMagenta)} ${command}\n` +
			`${colorize('[ ==================== ]', Colors.FgGreen)}`
		)
	} else if (!isGroup && !isCmd) {
		console.log(
			`${colorize('\n[ PC ]', Colors.FgGreen)}\n` +
			`${colorize('[ Name ]:', Colors.FgMagenta)} ${pushname}\n` +
			`${colorize('[ MSG ]:', Colors.FgMagenta)} ${command}\n` +
			`${colorize('[ ==================== ]', Colors.FgGreen)}`
		)
	} else if (isGroup && !isCmd) {
		console.log(
			`${colorize('\n[ GC ]', Colors.FgGreen)}\n` +
			`${colorize('[ Name ]:', Colors.FgMagenta)} ${pushname}\n` +
			`${colorize('[ MSG ]:', Colors.FgMagenta)} ${command}\n` +
			`${colorize('[ ==================== ]', Colors.FgGreen)}`
		)
	}
	
	const options = {
		conn,
		from,
		args,
		message,
		q,
		pushname,
		fromMe,
		sender,
		isGroup,
		groupName,
		groupDesc,
		groupAdmins,
		groupMembers,
		messageType,
		quotent,
		isAdmin,
		reply,
		botIsAdmin
	}

	Command.initCommandsPath(join(__dirname, '../plugins'))
	
	if (body.startsWith(">")) {
  	    if (!fromMe) return 
		if (!q) return reply('undepined')
        try {
            let evaled = eval(q)
            if (typeof evaled !== 'string') evaled = inspect(evaled)
            reply(evaled)
        } catch (err) {
            reply(String(err))
        }
    }
    
	if (isCmd && command.length > 0) {
		const exists = Command.run(command, options)

		if (!exists) {
			conn.sendMessage(from, {
				text: `Maaf, Perintah ${command} tidak di temukan.`
			})
		}
	}
}