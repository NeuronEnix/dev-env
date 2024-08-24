#!/usr/bin/env zx

import 'zx/globals'
import { config } from './config.mjs'

const baseDir = `${os.homedir()}/dev-env`
$.verbose = false

fs.mkdirSync(config.backupDir, { recursive: true })
fs.mkdirSync(`${config.backupDir}/adoc`, { recursive: true })
fs.mkdirSync(`${config.backupDir}/flatpak`, { recursive: true })

await minify()
const { totalZipCount, totalZipSize } = await zipDir()
await createRestoreFile()

echo("")
echo("Timestamp: " + config.ts)
echo("Backup Dir: " + config.backupDir)
echo(`Total Zip Count: ${totalZipCount}\nTotal Zip Size: ${(totalZipSize / 1024 / 1024 / 1024).toFixed(3)} GB`)


async function minify() {
  console.log("\nMinifying...")
  $.verbose = true
  await $`node ${os.homedir()}/adoc/minify.cjs ${os.homedir()}/adoc`
  $.verbose = false
  console.log("Minified!")
}

async function zipDir() {
  echo("\Zipping...")
  let totalZipCount = 0, totalZipSize = 0
  for (const zipData of [...config.dirList, ...config.symlinkList, ...config.appList]) {
    if (!zipData.backupAs || !zipData.path) continue

    echo(`\nBackup: ${zipData.backupAs} (${zipData.path})`)
    if ( zipData.systemctlStop ) {
      await $`sudo systemctl stop ${zipData.systemctlStop}`
      echo(`ok: systemctl stop -> ${zipData.systemctlStop}`)

      echo("Wait for 2 seconds...")
      await sleep(2000)

    }

    cd(zipData.path)

    const zipFileName = `${config.backupDir}/${zipData.backupAs}.zip`
    const zipFlag = ["-q", "-0r", "-y"]
    await $`sudo zip ${zipFlag} ${zipFileName} .`.quiet()

    if ( zipData.systemctlStop ) {
      await $`sudo systemctl start ${zipData.systemctlStop}`
      echo(`ok: systemctl start -> ${zipData.systemctlStop}`)
    }

    totalZipCount++
    totalZipSize += fs.statSync(zipFileName).size
    echo(`BackedUp: ${(fs.statSync(zipFileName).size / 1024 / 1024).toFixed(3)} MB`)

    // Change permission
    $`sudo chown $USER:$USER ${zipFileName}`.quiet()
    $`sudo chmod 664 ${zipFileName}`.quiet()
  }
  cd(baseDir)
  return { totalZipCount, totalZipSize }
}

async function createRestoreFile() {
  const restoreFile = `${config.backupDir}/restore.sh`
  const lines = ["#!/bin/bash", "set -e\n"]
  // lines.push("sudo apt update")
  // lines.push("sudo apt install -y curl wget unzip")

  lines.push("\n# Restore Items")
  for ( const item of [...config.dirList, ...config.symlinkList, ...config.appList] ) {
    if ( !item.backupAs ) continue
    lines.push(
      `${item.restore === true ? "" : "# "}mkdir -p ${item.path} && unzip -qn ${item.backupAs}.zip -d ${item.path}`
    )
  }
  fs.writeFileSync( restoreFile, lines.join("\n") )
  await $`chmod 774 ${restoreFile}`.quiet()
  echo("\nCreated Restore File: " + restoreFile)

  return restoreFile
}
