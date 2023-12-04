/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

const colorize = (text, colorCode) => {
	if (typeof colorCode == 'number') {
		return `\x1b[${colorCode}m${text}\x1b[0m`
	} else {
		return text
	}
}

const Colors = {
    Reset: 0,
    Bright: 1,
    Dim: 2,
    Underscore: 4,
    Blink: 5,
    Reverse: 7,
    Hidden: 8,
    FgBlack: 30,
    FgRed: 31,
    FgGreen: 32,
    FgYellow: 33,
    FgBlue: 34,
    FgMagenta: 35,
    FgCyan: 36,
    FgWhite: 37,
    BgBlack: 40,
    BgRed: 41,
    BgGreen: 42,
    BgYellow: 43,
    BgBlue: 44,
    BgMagenta: 45,
    BgCyan: 46,
    BgWhite: 47,
}

export {
	colorize,
	Colors
}