/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import { downloadMediaMessage } from "@whiskeysockets/baileys";
import { writeFile } from "fs/promises";

export async function downloadMedia (message, filePath) {
	const buffer = await downloadMediaMessage(message, 'buffer')
	await writeFile(filePath, buffer)
}