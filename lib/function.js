/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import fs, { 
    promises, 
    readdirSync,
    statSync, 
    watchFile 
} from "fs";
import { 
    dirname, 
    join, 
    basename 
} from 'path';
import { promisify } from 'util';
import { fileURLToPath } from "url"
import { resolve } from 'import-meta-resolve';
import chalk from 'chalk';
import axios from 'axios';

class Function {
    constructor () {}
    async getBuffer (url, options) {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
	            'Upgrade-Insecure-Request': 1
            },
	        ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    }
    async fetchJson (url, options) {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    }; 
    isUrl (url) {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
    };
    formatNumber (num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "k";
        } else {
            return num.toString();
        };
    };
    sizeString (des) {
        if (des === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(des) / Math.log(1024));
        return parseFloat((des / Math.pow(1024, i)).toFixed(0)) + ' ' + sizes[i];
    };
    formatMoney (money) {
        const suffixes = ['', 'k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n', 'd', 'U', 'D', 'Td', 'qd', 'Qd', 'sd', 'Sd', 'od', 'nd', 'V', 'Uv', 'Dv', 'Tv', 'qv', 'Qv', 'sv', 'Sv', 'ov', 'nv', 'T', 'UT', 'DT', 'TT', 'qt', 'QT', 'st', 'ST', 'ot', 'nt'];
        const suffixIndex = Math.floor(Math.log10(money) / 3);
        const suffix = suffixes[suffixIndex];
        const scaledmoney = money / Math.pow(10, suffixIndex * 3);
        return scaledmoney.toFixed(2) + suffix;
    };
    runtime (seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        var dDisplay = d > 0 ? d + (d == 1 ? "d, " : "d, ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? "h, " : "h, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? "m, " : "m, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s ") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    };
    pickRandom (list) {
        return list[Math.floor(Math.random() * list.length)]
    }; 
    timers (date) {
        const seconds = Math.floor((date / 1000) % 60),
        minutes = Math.floor((date / (60 * 1000)) % 60), 
        hours = Math.floor((date / (60 * 60 * 1000)) % 24), 
        days = Math.floor((date / (24 * 60 * 60 * 1000)));
        return `${days ? `${days} Hari ` : ''}${hours ? `${hours} Jam ` : ''}${minutes ? `${minutes} Menit ` : ''}${seconds ? `${seconds} Detik` : ''}`;
    };
    randomize (a, b) {
        a = Math.ceil(a*1)
        b = Math.ceil(b*1)
        if(isNaN(a) || a < 0) a = 0
        if(isNaN(b) || b < 0) b = 10
        let out
        while(out === void 0 || (out < a || out > b)) out = Math.ceil(Math.random() * b)
        return out
    } 
    parseMention (text = '') {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
    }
}

export const func = new Function();