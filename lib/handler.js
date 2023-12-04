/* Copyright (C) 2023 https://github.com/vrzaq (@khirazzdev)
Faster-Md - Licensed under the GPL-3.0-or-later License;
Only updates on YouTube Arifi Razzaq Ofc 
Develop together ®:
  - https://github.com/oziispedzz (fauzi)
  - https://github.com/JallDev (jall)
  - https://github.com/agusira (agus)
  - https://github.com/Kaiden-bot (kaiden)
*/

import { readdirSync } from 'fs'
import { join } from 'path'

class CommandManager {
    commands = new Map()  
    create ({ name, run }) {
        this.commands.set(name, { name, run })
    }
    run (name, options) {
        const command = this.commands.get(name)
        if (command) {
            command.run(options)
            return true
        } else {
            return false
        }
    }
    initCommandsPath (commandsPath) {
        const path = commandsPath
        const commandsFolder = readdirSync(path)
        commandsFolder.forEach(file => {
            const filePath = join(path, file)
            const isDirectory = !file.includes('.')
            if (isDirectory) {
                const subcommandsFolder = readdirSync(filePath)
                subcommandsFolder.forEach(filee => {
                    if (filee.endsWith('.js')) {
                        const subcommandPath = join(filePath, filee)
                        import(subcommandPath)
                    }
                })
            } else if (file.endsWith('.js')) {
                import(filePath)
            }
        })
    }
}
export const Command = new CommandManager();