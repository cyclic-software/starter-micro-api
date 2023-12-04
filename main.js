/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import newWASocket, {
    useMultiFileAuthState,
    PHONENUMBER_MCC,
    makeCacheableSignalKeyStore,
    makeInMemoryStore 
} from "@whiskeysockets/baileys"
import NodeCache from 'node-cache';
import readline from 'readline';
import fs from 'fs';
import { db } from './lib/database.js'
import pino from 'pino'
import { createRequire } from 'module'
import { connectionUpdate } from './event/connection.js'
import { onMessageUpsert } from './event/message.js';

import chalk from 'chalk';
import optionSocket, { logger, store } from './lib/optionSocket.js';

const phoneNumber = db.config.pairingNumber;
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code") 
const useMobile = process.argv.includes("--mobile");
const rl = readline.createInterface({ 
    input: process.stdin, 
    output: process.stdout 
})
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const require = createRequire(import.meta.url)  

async function start () {
  const { state, saveCreds } = await useMultiFileAuthState(`session`)
  const msgRetryCounterCache = new NodeCache()
  const conn = newWASocket.default(
    Object.assign(
      new optionSocket(pairingCode, useMobile), { 
        auth: { 
          creds: state.creds, 
          keys: makeCacheableSignalKeyStore(state.keys, logger),
        }
      }
    )
  )
  
  store?.bind(conn.ev)
  
  if(pairingCode && !conn.authState.creds.registered) {
    if(useMobile) throw new Error('Cannot use pairing code with mobile api')
    let phoneNumber
    if(!!phoneNumber) {
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
      if(!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
        console.log(chalk.bgBlack(chalk.redBright(`Start with country code of your WhatsApp Number, example: 628xxxxx`)))
        process.exit(0)
      }
    } else {
      phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `)))
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
      if(!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
        console.log(chalk.bgBlack(chalk.redBright(`Start with country code of your WhatsApp Number, example: 628xxxx`)))
        phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number \nFor example: 628xxxx`)))
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
        rl.close()
      }
    }
    setTimeout(async () => {
      let code = await conn.requestPairingCode(phoneNumber)
      code = code?.match(/.{1,4}/g)?.join("-") || code
      console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
    }, 3000)
  };
  
  conn.ev.process(async (events) => {
    if(events["connection.update"]) {
      const update = events["connection.update"];
      connectionUpdate(update, start)
    };
    if(events["creds.update"]) {
      await saveCreds();
    };
    if(events["messages.upsert"]) {
      for (const message of events["messages.upsert"].messages) {
        onMessageUpsert(message, conn)
      };
    };
  })
}
start()