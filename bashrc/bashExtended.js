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
    "alias kba='kb apply -f'",
    
    "alias kbc='kb config'",
      "alias kbcg='kbc get-contexts'",
      "alias kbcs='kbc set-context --current'",
      
    "alias kbd='kb delete -f'",
    
    "alias kbg='kb get'",
      "alias kbgd='kbg deployments'",
      "alias kbgi='kbg ingress'",
      "alias kbgp='kbg pods'",
      "alias kbgpv='kbg pv'",
      "alias kbgpvc='kbg pvc'",
      "alias kbgs='kb get services'",
      
    "alias kbl='kb logs'",
      "alias kblf='kbl -f'",
      
    "alias kbr='kb restart -f'",
    
    "alias kbx='kb exec -it'",
  )
}

function setMinikubeCommand() {
  cmdList.push(
    "\n# Minikube Command",
    "alias mk='minikube'",
    "alias mki='mk image'",
    "alias mkil='mki load'",
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
setMinikubeCommand()

// Write Commands
fs.writeFileSync( filePath, cmdList.join("\n") );