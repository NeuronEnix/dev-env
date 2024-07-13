#!/usr/bin/env zx

import 'zx/globals'
import { config } from './config.mjs'
$.verbose = false
echo("Timestamp: " + config.ts)

await zipDir()

async function zipDir() {
  echo("Backup Dir: " + config.backupDir)

  fs.mkdirSync(config.backupDir, { recursive: true })

  for (const dir of config.dir) {
    cd(dir.path)
    echo(`\nBackup: ${dir.backupAs} (${dir.path})`)

    const zipFile = `${config.backupDir}/${dir.backupAs}`
    const zipConfig = ["-q", "-0r"]
    if (dir.copySymlinkOriginalData == false) zipConfig.push("-y")

    await $`sudo zip ${zipConfig} ${zipFile} .`.quiet()
    echo(`BackedUp: ${(fs.statSync(zipFile).size / 1024 / 1024).toFixed(3)} MB`)

    // Change permission
    $`sudo chown $USER:$USER ${zipFile}`.quiet()
    $`sudo chmod 664 ${zipFile}`.quiet()
  }
}
