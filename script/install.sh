#!/bin/bash

# List of available programs and their installation commands
FILE_INSTALL_PATH="$(dirname "$0")/multiline-install-script"

from_apt=(
  "Curl:curl --version:sudo apt -y install curl"
  "Wget:wget --version:sudo apt -y install wget"
)

from_snap=(
  "Another Redis Desktop Manager:command -v another-redis-desktop-manager:sudo snap install another-redis-desktop-manager"
  "Obsidian:command -v obsidian:sudo snap install obsidian --classic"
  "Postman:command -v postman:sudo snap install postman"
  "Slack:slack -v:sudo snap install slack"
  "Sublime:subl -v:sudo snap install sublime-text --classic"
  "VS Code:code -v:sudo snap install --classic code"
)

from_file=(
  "aws cli:aws --version:bash $FILE_INSTALL_PATH/aws-cli.sh"
  "Docker:docker -v:bash $FILE_INSTALL_PATH/docker.sh"
  "Go( gvm ):gvm version:bash $FILE_INSTALL_PATH/go-gvm.sh"
  "Google Chrome:google-chrome --version:bash $FILE_INSTALL_PATH/google-chrome.sh"
  "Kubectl:kubectl version --client:bash $FILE_INSTALL_PATH/kubectl.sh"
  "Minikube:minikube version:bash $FILE_INSTALL_PATH/minikube.sh"
  "MongoDB Compass:mongodb-compass --version:bash $FILE_INSTALL_PATH/mongodb-compass.sh"
  "Node( nvm ):ls ~/.nvm/nvm.sh:bash $FILE_INSTALL_PATH/node-nvm.sh"
)

available_app=()
available_app+=("${from_apt[@]}")
available_app+=("${from_snap[@]}")
available_app+=("${from_file[@]}")

while true; do
  source ~/.bashrc

  to_install=()
  echo
  echo "Installed Program"
  counter=1
  for p in "${available_app[@]}"; do
    label=$(echo "$p" | cut -d ':' -f 1)
    version_finder=$(echo "$p" | cut -d ':' -f 2)


    eval "$version_finder" > /dev/null 2>&1

    # Check the exit status
    if [[ $? -eq 0 ]]; then
      echo "$counter: $label"
      counter=$((counter + 1))
    else
      to_install+=("$p")
    fi


  done

  if [ ${#to_install[@]} -eq 0 ]; then
    echo "No Program available to install. Exiting..."
    break
  fi

  echo
  echo "Available Program"
  echo "0: All"
  counter=1
  for p in "${to_install[@]}"; do
    label=$(echo "$p" | cut -d ':' -f 1)

    echo "$counter: $label"
    counter=$((counter + 1))

  done

  read -p "Install( num space seperated ): " choice

  sudo apt update

  # if choice is  0 then install all avaialble app
  if [[ $choice -eq 0 ]]; then

    for p in "${to_install[@]}"; do
      label=$(echo "$p" | cut -d ':' -f 1)
      install_script=$(echo "$p" | cut -d ':' -f 3)

      echo
      echo "Installing: $label"
      eval $install_script

    done

  else

    # if choice not 0 then install only thing that is choosen
    for chose in $choice; do
      p="${to_install[$chose-1]}"
      label=$(echo "$p" | cut -d ':' -f 1)
      install_script=$(echo "$p" | cut -d ':' -f 3)
      echo
      echo "Installing: $label"
      eval $install_script
    done
  fi

done
