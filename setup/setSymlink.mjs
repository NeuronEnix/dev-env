#!/usr/bin/env zx

import 'zx/globals'
import { config } from '../config.mjs'

export async function setupSymlink() {
  echo("\nSetup symlink")
  if (!fs.existsSync(config.symlinkDir))
    fs.mkdirSync(config.symlinkDir, { recursive: true })

  for (const symlink of config.symlinkList) {
    if (!fs.existsSync(symlink.at)) {
      if (!fs.existsSync(symlink.path) ) {
        echo(` -> Ok: (not found) -> ${symlink.path}`)
      } else {
        fs.symlinkSync(symlink.path, symlink.at)
        echo(` -> Ok: created -> ${symlink.at}`)
      }
    } else {
      echo(` -> Ok: exists -> ${symlink.at}`)
    }
  }
}