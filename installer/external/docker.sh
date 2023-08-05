# # https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04

# # Step 1 — Installing Docker
# sudo apt update
# sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
# sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" -y
# apt-cache policy docker-ce
# sudo apt install docker-ce -y

# # Step 2 — Executing the Docker Command Without Sudo (Optional)
# sudo usermod -aG docker ${USER}
# su - ${USER}
# groups


# Update the apt package index and install packages to allow apt to use a repository over HTTPS:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# Add Docker’s official GPG key:
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Use the following command to set up the repository:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Note: If you use an Ubuntu derivative distro, such as Linux Mint, you may need to use UBUNTU_CODENAME instead of VERSION_CODENAME.


# Install Docker Engine
# Update the apt package index:
sudo apt-get update

# Install Docker Engine, containerd, and Docker Compose. ( Latest )
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify that the Docker Engine installation is successful by running the hello-world image.
# sudo docker run hello-world

# Don't wanna use sudo ?
sudo usermod -aG docker $USER