# https://docs.docker.com/engine/install/ubuntu/#install-from-a-package


# ##################################
# # Fast install
# curl -fsSL https://get.docker.com -o get-docker.sh
# sudo sh get-docker.sh

#################################
# Manual Install
# Add Docker's official GPG key:
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
# Note: If you use an Ubuntu derivative distro, such as Linux Mint, you may need to use UBUNTU_CODENAME instead of VERSION_CODENAME.

# Install Docker Engine
# Update the apt package index:
sudo apt-get update

# Install Docker Engine, containerd, and Docker Compose. ( Latest )
sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

##################################
# Verify that the Docker Engine installation is successful by running the hello-world image.
# sudo docker run hello-world

##################################
# Don't wanna use sudo ?
# sudo usermod -aG docker $USER
