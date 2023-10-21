# Define arrays for services in each section
app_services=("gpt" "ft")
ingress_services=("all")
storage_services=("redis" "mysql" "pma" "mongo" "psql" "couchdb")

# Docker Compose up/down all service
alias up-app='docker compose -f ~/dev-env/service/app/docker-compose.yml --profile all up -d'
alias down-app='docker compose -f ~/dev-env/service/app/docker-compose.yml --profile all down'
alias up-ingress='docker compose -f ~/dev-env/service/ingress/docker-compose.yml --profile all up -d'
alias down-ingress='docker compose -f ~/dev-env/service/ingress/docker-compose.yml --profile all down'
alias up-storage='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile all up -d'
alias down-storage='docker compose -f ~/dev-env/service/storage/docker-compose.yml --profile all down'

# Define a function to manage services
manage_services() {
  section=$1
  action=$2
  service_name=$3
  services_array=("${!section}_services")
  
  if [[ "$service_name" == "all" ]]; then
    for service in "${services_array[@]}"; do
      docker compose -f ~/dev-env/service/"$section"/docker-compose.yml --profile "$service" "$action"
    done
  else
    docker compose -f ~/dev-env/service/"$section"/docker-compose.yml --profile "$service_name" "$action"
  fi
}

# Create aliases for individual services in each section
for service in "${app_services[@]}"; do
  alias "up-app-$service"="manage_services 'app' 'up -d' '$service'"
  alias "down-app-$service"="manage_services 'app' 'down' '$service'"
done

for service in "${ingress_services[@]}"; do
  alias "up-ingress-$service"="manage_services 'ingress' 'up -d' '$service'"
  alias "down-ingress-$service"="manage_services 'ingress' 'down' '$service'"
done

for service in "${storage_services[@]}"; do
  alias "up-storage-$service"="manage_services 'storage' 'up -d' '$service'"
  alias "down-storage-$service"="manage_services 'storage' 'down' '$service'"
done

# To start a specific App service (e.g., GPT), use: up-app-gpt
# To stop a specific App service (e.g., GPT), use: down-app-gpt
# Similarly, you can manage individual services in the Ingress and Storage sections.
