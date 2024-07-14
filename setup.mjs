#!/usr/bin/env zx

import 'zx/globals'
import { config } from './config.mjs'
$.verbose = false

while (true) {
  echo("\nDevelopment Environment")
  const option = "Setup Environment, Install Default Pkg, Install Pkg".split(", ")
  option.forEach((opt, i) => echo(`${i + 1}. ${opt}`))
  const choice = await question('Choose: ')
  switch (option[parseInt(choice) - 1]) {
    case "Setup Environment": {
      await setupToBashrc()
      await setupDefaultDirAndFile()
      await setupSymlink()
      await setupApp()
      await setupService()
    } break
    case "Install Default Pkg": {
      $.verbose = true
      await $`sudo apt install -y curl wget ffmpeg`
      $.verbose = false
    } break
    case "Install Pkg": await installPackage(); break
    default: echo("Incorrect option")
  }
}

async function installPackage() {
  echo("\n Instal Package")
  const path = "script/install-script"
  const pkgList = [
    "Curl:curl:--version:apt:curl",
    "Wget:wget:--version:apt:wget",
    "Git:git:--version:apt:git",

    "VS Code:code:-v:snap:code --classic",
    "Sublime:subl:-v:snap:sublime-text --classic",
    "Docker:docker:-v:file:docker.sh",
    "Go( gvm ):gvm:version:file:go-gvm.sh",
    "Kubectl:kubectl:version --client:file:kubectl.sh",
    "Minikube:minikube:version:file:minikube.sh",
    "AWS cli:aws:--version:file:aws-cli.sh",

    "Obsidian:command:-v obsidian:snap:obsidian --classic",
    "Google Chrome:google-chrome:--version:file:google-chrome.sh",
    "Postman:command:-v postman:snap:postman",
    "MongoDB Compass:mongodb-compass:--version:file:mongodb-compass.sh",
    "Another Redis Desktop Manager:command:-v another-redis-desktop-manager:snap:another-redis-desktop-manager",
    "Signal Desktop:command:-v signal-desktop:file:signal.sh",
    "Slack:slack:-v:snap:slack",
  ]
  const installedPkg = []
  const availablePkg = []
  for (const pkg of pkgList) {
    const [label, name, arg, type, installCommand] = pkg.split(":")
    if (await isInstalled(name, arg)) installedPkg.push(pkg)
    else availablePkg.push(pkg)
  }

  echo("\n\nInstalled Pkg")
  installedPkg.forEach((pkg, i) => echo(`${i + 1}. ${pkg.split(":")[0]}`))

  echo("\nAvailable Pkg")
  availablePkg.forEach((pkg, i) => echo(`${i + 1}. ${pkg.split(":")[0]}`))

  const choice = await question('Choose (space separated): ')
  $.verbose = true
  await $`sudo apt update`
  for (const pkg of choice.split(" ")) {
    const [label, name, arg, type, installCommand] = availablePkg[parseInt(pkg) - 1].split(":")
    echo(`Install ${label}`)
    switch (type) {
      case "apt": await $`sudo apt install ${["-y", installCommand]}`; break;
      case "snap": await $`sudo snap install ${installCommand}`; break;
      case "file": await $`bash script/multiline-install-script/${installCommand}`; break;
    }
  }
  $.verbose = false
}

async function isInstalled(cmd, arg) {
  const result = await $`${cmd} ${arg.split(" ")}`.exitCode
  return result == 0
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

async function setupDefaultPkg() {

}

async function setupDefaultDirAndFile() {
  echo("\nSetup default dir")
  for (const dir of config.dirList) {
    if (!fs.existsSync(dir.path)) {
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

async function setupSymlink() {
  echo("\nSetup symlink")
  if (!fs.existsSync(config.symlinkDir))
    fs.mkdirSync(config.symlinkDir, { recursive: true })

  for (const symlink of config.symlinkList) {
    if (!fs.existsSync(symlink.at)) {
      fs.symlinkSync(symlink.path, symlink.at)
      echo(` -> Ok: created -> ${symlink.at}`)
    } else {
      echo(` -> Ok: exists -> ${symlink.at}`)
    }
  }
}

async function setupApp() {
  echo("\nSetup app")
  for (const app of config.appList) {
    if (!fs.existsSync(app.bin)) {
      echo(` -> Ok: not exists -> ${app.name} binary`)
      continue
    }
    if (app.systemctlScript) {
      if (!fs.existsSync(`/etc/systemd/system/${app.name}.service`)) {
        const serviceFile = fs.readFileSync(app.systemctlScript).toString().replaceAll("__USER__", os.userInfo().username)
        fs.writeFileSync(`tmp/${app.name}.service`, serviceFile )
        await $`sudo mv tmp/${app.name}.service /etc/systemd/system/${app.name}.service`
        echo(` -> Ok: created -> /etc/systemd/system/${app.name}.service`)
        await $`sudo systemctl daemon-reload`
      } else echo(` -> Ok: exists -> /etc/systemd/system/${app.name}.service`)
      if ( await $`sudo systemctl is-enabled ${app.name}`.exitCode != 0) {
        await $`sudo systemctl enable ${app.name}`
        echo(` -> Ok: systemctl enable -> ${app.name}`)
      } else echo(` -> Ok: systemctl is-enabled -> ${app.name}`)
      if ( await $`sudo systemctl is-active ${app.name}`.exitCode != 0) {
        await $`sudo systemctl start ${app.name}`
        echo(` -> Ok: systemctl start -> ${app.name}`)
      } else echo(` -> Ok: systemctl is-active -> ${app.name}`)
    }
  }
}
async function setupService() {
  echo("\nSetup service")

  for (const dir of ["app", "manager", "storage"])
    fs.cpSync(`service/${dir}/.env.example`, `service/${dir}/.env`, { force: false })
  echo(" -> Ok: created .env copies")

  if (await $`docker -v`.exitCode != 0)
    return echo(" -> warn: Install docker and run this again")

  await $`sudo docker network create dev`.nothrow()
  echo(" -> Ok: create network")

  for (const vol of ["dev-app", "dev-manager", "dev-storage"])
    await $`sudo docker volume create ${vol}`.nothrow()
  echo(" -> Ok: create volume")
}
