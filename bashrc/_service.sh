BASE_COMMAND="sudo docker compose -f $HOME/dev-env/service"
APP_COMMAND="$BASE_COMMAND/app/docker-compose.yml --profile"
INGRESS_COMMAND="$BASE_COMMAND/ingress/docker-compose.yml --profile"
STORAGE_COMMAND="$BASE_COMMAND/storage/docker-compose.yml --profile"

alias up-app-all='$APP_COMMAND all up -d'
alias up-app-gpt='$APP_COMMAND gpt up -d'
alias up-app-ft='$APP_COMMAND ft up -d'
alias up-app-actual='$APP_COMMAND actual up -d'
alias up-app-i-spy='$APP_COMMAND i-spy up -d'
alias down-app-all='$APP_COMMAND all down'
alias down-app-gpt='$APP_COMMAND gpt down'
alias down-app-ft='$APP_COMMAND ft down'
alias down-app-actual='$APP_COMMAND actual down'
alias down-app-i-spy='$APP_COMMAND i-spy down'

alias up-ingress-all='$INGRESS_COMMAND all up -d'
alias down-ingress-all='$INGRESS_COMMAND all down'

alias up-storage-all='$STORAGE_COMMAND all up -d'
alias up-storage-redis='$STORAGE_COMMAND redis up -d'
alias up-storage-mysql='$STORAGE_COMMAND mysql up -d'
alias up-storage-pma='$STORAGE_COMMAND pma up -d'
alias up-storage-mongo='$STORAGE_COMMAND mongo up -d'
alias up-storage-psql='$STORAGE_COMMAND psql up -d'
alias up-storage-couchdb='$STORAGE_COMMAND couchdb up -d'
alias up-storage-adminer='$STORAGE_COMMAND adminer up -d'
alias down-storage-all='$STORAGE_COMMAND all down'
alias down-storage-redis='$STORAGE_COMMAND redis down'
alias down-storage-mysql='$STORAGE_COMMAND mysql down'
alias down-storage-pma='$STORAGE_COMMAND pma down'
alias down-storage-mongo='$STORAGE_COMMAND mongo down'
alias down-storage-psql='$STORAGE_COMMAND psql down'
alias down-storage-couchdb='$STORAGE_COMMAND couchdb down'
alias down-storage-adminer='$STORAGE_COMMAND adminer down'
