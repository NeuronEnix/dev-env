# Kubectl
alias kb='kubectl'
alias kbgp='kubectl get pods'

# Docker
alias dcom='docker compose'
alias dcomp='docker compose --profile'
alias dive="docker run -ti --rm  -v /var/run/docker.sock:/var/run/docker.sock wagoodman/dive"

# Docker Compose App Commands
alias up-app='docker compose -f ~/dev-env/service/app/docker-compose.yml --profile all up -d'
alias down-app='docker compose -f ~/dev-env/service/app/docker-compose.yml --profile all down'
alias up-gpt='docker compose -f ~/dev-env/service/app/docker-compose.yml --profile gpt up -d'
alias up-ft='docker compose -f ~/dev-env/service/app/docker-compose.yml --profile ft up -d'
alias down-ft='docker compose -f ~/dev-env/service/app/docker-compose.yml --profile ft down'

# Docker Compose Ingress Commands
alias up-ingress='docker compose -f ~/dev-env/service/ingress/docker-compose.yml --profile all up -d'
alias down-ingress='docker compose -f ~/dev-env/service/ingress/docker-compose.yml --profile all down'


# Docker Compose Storage Commands
alias up-storage='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile all up -d'
alias down-storage='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile all down'
alias up-redis='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile redis up -d'
alias up-mysql='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile mysql up -d'
alias up-pma='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile pma up -d'
alias up-mongo='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile mongo up -d'
alias up-psql='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile psql up -d'
alias up-couchdb='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile couchdb up -d'


# Extra commands scripts goes here
if [ -f ~/dev-env/bashrc/bashrc_extra ]; then . ~/dev-env/bashrc/bashrc_extra; fi
if [ -f ~/dev-env/bashrc/bashrcExtra.sh ]; then . ~/dev-env/bashrc/bashrcExtra.sh; fi
