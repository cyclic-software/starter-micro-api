/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import pino from 'pino';
import NodeCache from "node-cache";
import { 
    makeInMemoryStore, 
    jidNormalizedUser
} from '@whiskeysockets/baileys';

const logger = pino({ level: "silent", stream: "store" }).child({ level: "silent" })
const store = makeInMemoryStore(logger);

export default class optionSocket {
    constructor (pairingCode, useMobile) {
        this.logger = logger;
        this.printQRInTerminal = !pairingCode;
        this.mobile = useMobile;
        this.browser = ['Chrome (Linux)', '', ''];
        this.msgRetryCounterCache = new NodeCache();
        this.defaultQueryTimeoutMs = undefined;
        this.markOnlineOnConnect = true;
        this.generateHighQualityLinkPreview = true;
        this.getMessage = async (key) => {
            let jid = jidNormalizedUser(key.remoteJid)
            let msg = await store.loadMessage(jid, key.id)
            return msg?.message || ""
        };
        this.patchMessageBeforeSending = (message) => {
            const requiresPatch = !!(message.buttonsMessage || message.templateMessage || message.listMessage);
            if(requiresPatch) message = { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadataVersion: 2, deviceListMetadata: {} }, ...message } } };
            return message;
        };
    };
};
export { 
  store,
  logger
};