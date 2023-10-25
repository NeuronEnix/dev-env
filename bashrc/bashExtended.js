const path = require("path")
const fs = require("fs");
const cmdList = []
const filePath = path.join( __dirname, path.basename( __filename, ".js")+".sh", )

function setCustomCommand() {
  cmdList.push(
    "\n# Custom Command",
    // Put your custom command here
  )
}

function setKubernetesCommand() {
  cmdList.push(
    "\n# Kubernetes Command",
    "alias kb='kubectl'",
    "alias kbgp='kubectl get pods'",
  )
}

function setDockerCommand() {
  cmdList.push(
    "\n# Docker Command",
    "alias dcom='docker compose'",
    "alias dcomp='docker compose --profile'",
    "alias dive='docker run -ti --rm  -v /var/run/docker.sock:/var/run/docker.sock wagoodman/dive'",
  )
}

// Docker Services
function setDockerServiceCommand() {
  cmdList.push("\n# Docker Services")
  const upCmd = [];
  const downCmd = [];
  const prefixDockerCompose = ""; // add "sudo " if needed
  const serviceRootPath = path.join(__dirname, "..", "service", "");
  const serviceProfile = {
    app: ["all", "gpt", "ft"],
    ingress: ["all"],
    storage: ["all", "redis", "mysql", "pma", "mongo", "psql", "couchdb"],
  }
  for ( const [serviceName, profiles] of Object.entries(serviceProfile) ) {
    for ( const profileName of profiles ) {
      const aliasName = `${serviceName}-${profileName}`;
      const command = `${prefixDockerCompose}docker compose`;
      const file = `-f ${path.join(serviceRootPath, serviceName, "docker-compose.yml")}`;
      const profile = `--profile ${profileName}` ;
      upCmd.push(`alias up-${aliasName}='${command} ${file} ${profile} up -d'`);
      downCmd.push(`alias down-${aliasName}='${command} ${file} ${profile} down'`);
    }
  }
  cmdList.push( ...upCmd, ...downCmd )
}

// Set Commands
setCustomCommand()
setKubernetesCommand()
setDockerCommand()
setDockerServiceCommand()

// Write Commands
fs.writeFileSync( filePath, cmdList.join("\n") );
