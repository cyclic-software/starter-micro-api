/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

export function getGroupAdmins (participants) {
	const admins = []
	for (const user of participants) {
		if (user.admin == 'admin') admins.push(user.id)
		if (user.admin == 'superadmin') admins.push(user.id)
	}
	return admins
}