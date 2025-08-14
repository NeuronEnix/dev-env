#!/usr/bin/env zx

import 'zx/globals'
import { config } from './config.mjs'
// import dotenv from 'dotenv'
// const envConfig = JSON.parse(fs.readFileSync('./env.config.json', 'utf8'))

$.verbose = false

while (true) {
  // console.log(getEnvContent(`${os.homedir()}/dev-env/service/app/.env`))
  // console.log(envConfig)

  echo("\nDevelopment Environment")
  config.setupOption.forEach((opt, i) => echo(`${i + 1}. ${opt}`))
  const choice = await question('Choose: ')

  switch (config.setupOption[parseInt(choice) - 1]) {
    case "Apt Update": await $`sudo apt update`; break
    case "Setup Environment": {
      await setupToBashrc()
      await setupDirAndFile()
      await setupSymlink()
      await setupService()
    } break
    case "Install Default Pkg": {
      echo("\nInstall Default Pkg")

      await $`sudo apt install -y ${config.defaultPkg}`
      echo(` -> Ok: installed -> ${config.defaultPkg.join(", ")}`)
    } break
    case "Install Apps": {
      await listApp();
      echo("\n -> Restart pc if apps are not showing up")
    } break
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

async function setupDirAndFile() {
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

async function setupSymlink() {
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

async function listApp() {
  const yetToInstall = []
  let counter = 0
  echo("\nAlready installed apps")
  for (const app of config.appList) {
    if (await isAppInstalled(app)) echo(`${++counter}. ${app.name}`)
    else yetToInstall.push(app)
  }

  if (yetToInstall.length == 0) return
  counter = 0

  echo("\nYet to install apps")
  echo(`0. All`)
  for (const app of yetToInstall) {
    echo(`${++counter}. ${app.name}`)
  }
  const choiceList = (await question('Choose: ')).split(" ").map(x => parseInt(x) - 1)
  if (choiceList.length == 0) return

  counter = 0
  const toInstall = choiceList.includes(-1) ? yetToInstall : yetToInstall.filter((_, index) => choiceList.includes(index))
  for (const app of toInstall) {
    echo("")
    echo(`- Ok(${++counter}/${toInstall.length}): installing -> ${app.name}`)
    await installApp(app)
    if ( app.systemctl ) await setupSystemCtl(app)
    echo(`- Ok(${counter}/${toInstall.length}): installed -> ${app.name}`)
  }
}

async function isAppInstalled(app) {
  return await $`ls ${app.bin}`.exitCode == 0
}

async function installApp(app) {
  switch (app.install.from) {
    case "snap": {
      await $`sudo snap install ${app.install.pkg}`
      break
    }
    case "flatpak": {
      await $`flatpak install flathub -y ${app.install.pkg}`
      break
    }
    case "file": {
      if (app.install.verbose) $.verbose = true
      await $`sh ${app.install.path}`
      $.verbose = false
      break
    }
  }
}

async function setupSystemCtl(app) {
  echo(`  - systemctl`)
  const { systemctl } = app
  // Create systemd service if not exist
  if (await $`ls /etc/systemd/system/${systemctl.name}.service`.exitCode != 0) {
    const serviceFile = fs.readFileSync(systemctl.script).toString().replaceAll("__USER__", os.userInfo().username)
    fs.writeFileSync(`${systemctl.name}.service`, serviceFile)
    await $`sudo mv ${systemctl.name}.service /etc/systemd/system/${systemctl.name}.service`
    echo(`    Ok: created -> ${systemctl.name}.service`)
    await $`sudo systemctl daemon-reload`
    echo(`    Ok: daemon-reload`)
  } else echo(`    Ok: exists -> ${systemctl.name}.service`)

  // Try to start service
  if (await $`sudo systemctl is-enabled ${systemctl.name}`.exitCode != 0) {
    await $`sudo systemctl enable ${systemctl.name}`
    echo(`    Ok: enabled -> ${systemctl.name}.service`)
  } else echo(`    Ok: is-enabled -> ${systemctl.name}.service`)

  // Try to start service
  if (await $`sudo systemctl is-active ${systemctl.name}`.exitCode != 0) {
    await $`sudo systemctl start ${systemctl.name}`
    echo(`    Ok: started -> ${systemctl.name}.service`)
  } else echo(`    Ok: is-active -> ${systemctl.name}.service`)
}

function getEnvContent(path) {
  const env = {}
  dotenv.config({ path, processEnv: env })
  return env
}
