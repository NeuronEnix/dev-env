#!/usr/bin/env zx

import 'zx/globals'
import { config } from './config.mjs'

const baseDir = `${os.homedir()}/dev-env`
$.verbose = false

echo("Timestamp: " + config.ts)
echo("\nBackup Dir: " + config.backupDir);
fs.mkdirSync(config.backupDir, { recursive: true })

await minify()
await zipDir()
await createRestoreFile()

async function minify() {
  console.log("\nMinifying...")
  $.verbose = true
  await $`node ${os.homedir()}/adoc/minify.cjs ${os.homedir()}/adoc`
  $.verbose = false
  console.log("Minified!")
}

async function zipDir() {
  echo("\Zipping...")

  for (const zipData of [...config.dirList, ...config.symlinkList]) {
    if (!zipData.backupAs || !zipData.path) continue

    echo(`\nBackup: ${zipData.backupAs} (${zipData.path})`)
    if ( zipData.systemctlStop ) {
      await $`sudo systemctl stop ${zipData.systemctlStop}`
      echo(`ok: systemctl stop -> ${zipData.systemctlStop}`)
    }

    cd(zipData.path)

    const zipFileName = `${config.backupDir}/${zipData.backupAs}.zip`
    const zipFlag = ["-q", "-0r", "-y"]
    await $`sudo zip ${zipFlag} ${zipFileName} .`.quiet()

    if ( zipData.systemctlStop ) {
      await $`sudo systemctl start ${zipData.systemctlStop}`
      echo(`ok: systemctl start -> ${zipData.systemctlStop}`)
    }

    echo(`BackedUp: ${(fs.statSync(zipFileName).size / 1024 / 1024).toFixed(3)} MB`)

    // Change permission
    $`sudo chown $USER:$USER ${zipFileName}`.quiet()
    $`sudo chmod 664 ${zipFileName}`.quiet()
  }
  cd(baseDir)
}

async function createRestoreFile() {
  echo("\nCreate Restore File")
  const lines = ["#!/bin/bash", "set -e\n"]
  // lines.push("sudo apt update")
  // lines.push("sudo apt install -y curl wget unzip")

  lines.push("\n# Restore Items")
  for ( const item of [...config.dirList, ...config.symlinkList] ) {
    if ( !item.backupAs ) continue
    lines.push(
      `${item.restore === false ? "# " : ""}mkdir -p ${item.path} && unzip -qn ${item.backupAs}.zip -d ${item.path}`
    )
  }
  fs.writeFileSync( `${config.backupDir}/restore.sh`, lines.join("\n") )
  await $`chmod 774 ${config.backupDir}/restore.sh`.quiet()
}
