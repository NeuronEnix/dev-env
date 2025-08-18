#!/usr/bin/env zx

import 'zx/globals'
import { config } from '../config.mjs'

export async function setupDirAndFile() {
  echo("\nSetup default dir")
  for (const dir of config.dirList) {
    if (dir.create === true && !fs.existsSync(dir.path)) {
      fs.mkdirSync(dir.path, { recursive: true })
      echo(` -> Ok: created -> ${dir.path}`)
    } else {
      echo(` -> Ok: exists -> ${dir.path}`)
    }
  }

  echo("\nSetup default file")
  for (const file of config.file) {
    if (!fs.existsSync(file.path)) {
      fs.writeFileSync(file.path, file.content)
      echo(` -> Ok: created -> ${file.path}`)
    } else {
      echo(` -> Ok: exists -> ${file.path}`)
    }
  }
}