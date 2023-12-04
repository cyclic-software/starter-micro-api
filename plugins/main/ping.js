/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import { Command } from '../../lib/handler.js';
import speed from 'performance-now';

Command.create({
	name: 'ping',
	run({ reply }) {
		const timestamp = speed()
		const performance = speed() - timestamp 
		reply(`${performance.toFixed(4)}ms!`)
	}
})