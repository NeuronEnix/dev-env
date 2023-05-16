# Custom Alias
alias kb='kubectl'
alias kbgp='kubectl get pods'

alias dcom='docker compose'
alias dcomp='docker compose --profile'

alias up-mysql='docker compose -f ~/adoc/dev-env/docker-compose.yml --profile mysql up -d'
alias up-redis='docker compose -f ~/adoc/dev-env/docker-compose.yml --profile redis up -d'
alias up-mongo='docker compose -f ~/adoc/dev-env/docker-compose.yml --profile mongo up -d'
alias up-all='docker compose -f ~/adoc/dev-env/docker-compose.yml --profile all up -d'
alias down-all='docker compose -f ~/adoc/dev-env/docker-compose.yml --profile all down'
