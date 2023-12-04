/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import fs from 'fs';
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const dirr = join(dirname(fileURLToPath(import.meta.url)), "../database");
const file = {
    config: join(dirr, "config.json"),
    user: join(dirr, "user.json"), 
}

try {
    fs.accessSync(file.config);
} catch (err) {
    if(String(err).includes("no such file or directory")) {
        fs.writeFileSync('./database/config.json', JSON.stringify({}, null, 2));
    }
}

try {
    fs.accessSync(file.user);
} catch (err) {
    if(String(err).includes("no such file or directory")) {
        fs.writeFileSync('./database/user.json', JSON.stringify({}, null, 2));
    }
} 

export let db = {
    config: JSON.parse(fs.readFileSync('./database/config.json')),
    user: JSON.parse(fs.readFileSync('./database/user.json'))
};

setInterval(() => {
    fs.writeFileSync('./database/config.json', JSON.stringify(db.config, null, 2));
    fs.writeFileSync('./database/user.json', JSON.stringify(db.user, null, 2));
}, 1000);