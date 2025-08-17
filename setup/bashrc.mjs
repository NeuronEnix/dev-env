#!/usr/bin/env zx

import 'zx/globals'

export async function setupToBashrc() {
  echo("Setup path to bashrc")
  const bashrcPath = `${os.homedir()}/.bashrc`
  const comment = "# dev-env bashrc"
  const command = `if [ -f '${os.homedir()}/dev-env/bashrc/_main.sh' ]; then . '${os.homedir()}/dev-env/bashrc/_main.sh'; fi`
  const homeBashrc = fs.readFileSync(bashrcPath).toString()
  if (homeBashrc.includes(comment)) return echo(" -> Ok")
  fs.writeFileSync(bashrcPath, homeBashrc + `\n${comment}\n${command}\n`)
  echo(" -> Ok")
}