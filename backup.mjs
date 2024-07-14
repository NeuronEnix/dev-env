#!/usr/bin/env zx

import 'zx/globals'
import { config } from './config.mjs'
$.verbose = false
echo("Timestamp: " + config.ts)

await zipDir()

async function zipDir() {
  echo("Backup Dir: " + config.backupDir);
  fs.mkdirSync(config.backupDir, { recursive: true })

  for (const zipData of [...config.dirList, ...config.symlinkList]) {
    if (!zipData.backupAs || !zipData.path) continue

    echo(`\nBackup: ${zipData.backupAs} (${zipData.path})`)
    cd(zipData.path)

    const zipFileName = `${config.backupDir}/${zipData.backupAs}.zip`
    const zipFlag = ["-q", "-0r", "-y"]
    await $`sudo zip ${zipFlag} ${zipFileName} .`.quiet()

    echo(`BackedUp: ${(fs.statSync(zipFileName).size / 1024 / 1024).toFixed(3)} MB`)

    // Change permission
    $`sudo chown $USER:$USER ${zipFileName}`.quiet()
    $`sudo chmod 664 ${zipFileName}`.quiet()
  }
  cd(`${os.homedir()}/dev-env`)
}
