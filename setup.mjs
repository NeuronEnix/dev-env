#!/usr/bin/env zx

import 'zx/globals'
$.verbose = false

while (true) {
  echo("\nDevelopment Environment")
  const option = "Setup, Install".split(", ")
  option.forEach((opt, i) => echo(`${i + 1}. ${opt}`))
  const choice = await question('Choose: ')
  switch (option[parseInt(choice) - 1]) {
    case "Setup": {
      await setupToBashrc()
      await setupDefaultDirAndFile()
      await setupSymlink()
      await setupService()
    } break
    case "Install": echo("install"); break
    default: echo("Incorrect option")
  }
}

async function setupToBashrc() {
  echo("Setup path to bashrc")
  const bashrcPath = `${os.homedir()}/.bashrc`
  const comment = "# dev-env bashrc"
  const command = `if [ -f '${os.homedir()}/dev-env/bashrc/_main.sh' ]; then . '${os.homedir()}/dev-env/bashrc/_main.sh'; fi`
  const homeBashrc = fs.readFileSync(bashrcPath).toString()
  if (homeBashrc.includes(comment)) return echo(" -> Ok")
  fs.writeFileSync(bashrcPath, homeBashrc + `\n${comment}\n${command}\n`)
  echo(" -> Ok")
}

async function setupDefaultDirAndFile() {
  echo("Setup default dir")

  const adocDirs = ['prj', 'cld/aws', 'cld/gcp', 'cld/az', 'rad', 'tmp']
  for (const dir of adocDirs) {
    fs.mkdirSync(`${os.homedir()}/adoc/${dir}`, { recursive: true })
  }
  echo(` -> Ok: ${adocDirs.join(" | ")}`)

  fs.mkdirSync(`${os.homedir()}/kms/general`, { recursive: true })
  echo(` -> Ok: kms/general`)

  await $`touch bashrc/_custom.sh`
  echo(` -> Ok: bashrc/_custom.sh`)
}

async function setupSymlink() {
  echo("Setup symlink")
  fs.mkdirSync(`./symlink`, { recursive: true })

  await $`ln -s "${os.homedir()}/.bashrc" "symlink/.bashrc"`.nothrow()
  echo(" -> Ok: .bashrc")

  await $`ln -s "${os.homedir()}/.ssh" "symlink/.ssh"`.nothrow()
  echo(" -> Ok: .ssh")

  await $`ln -s "/etc/fstab" "symlink/fstab"`.nothrow()
  echo(" -> Ok: fstab")

}

async function setupService() {
  echo("Setup service")

  for (const dir of ["app", "ingress", "storage"])
    fs.cpSync(`service/${dir}/.env.example`, `service/${dir}/.env`, { force: false })
  echo(" -> Ok: created .env copies")

  if (await $`docker -v`.exitCode != 0)
    return echo(" -> warn: Install docker and this again")

  await $`sudo docker network create dev`.nothrow()
  echo(" -> Ok: create network")

  for (const vol of ["dev-app", "dev-ingress", "dev-storage"])
    await $`sudo docker volume create ${vol}`.nothrow()
  echo(" -> Ok: create volume")
}
