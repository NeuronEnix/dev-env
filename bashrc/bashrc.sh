# Kubectl
alias kb='kubectl'
alias kbgp='kubectl get pods'

# Docker
alias dcom='docker compose'
alias dcomp='docker compose --profile'
alias dive="docker run -ti --rm  -v /var/run/docker.sock:/var/run/docker.sock wagoodman/dive"

# Import to manage service
. ~/dev-env/bashrc/manageService.sh;

# Extra commands scripts goes here
if [ -f ~/dev-env/bashrc/bashrc_extra ]; then . ~/dev-env/bashrc/bashrc_extra; fi
if [ -f ~/dev-env/bashrc/bashrcExtra.sh ]; then . ~/dev-env/bashrc/bashrcExtra.sh; fi
