/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

export function connectionUpdate (update, start) {
	const { connection } = update;
	if(connection === 'close') {
        console.info(`Connection info: Reconnecting . . .`);
        start();
    } else if(connection === 'open') {
        console.warn(`Connection info: Connect . . .`);
    };
};