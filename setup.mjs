#!/usr/bin/env zx

import 'zx/globals'
import { config } from './config.mjs'
import { setupToBashrc } from './setup/setBashrc.mjs'
import { setupDirAndFile } from './setup/setDirectory.mjs'
import { setupSymlink } from './setup/setSymlink.mjs'
import { setupService } from './setup/setService.mjs'
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

