#!/usr/bin/env zx

import 'zx/globals'

export async function setupService() {
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