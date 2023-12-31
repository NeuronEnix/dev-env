# https://docs.docker.com/engine/install/ubuntu/

# ### Fast Install --dry-run
#   curl -fsSL https://get.docker.com -o get-docker.sh
#   sudo sh ./get-docker.sh --dry-run


### Fast Install (only for testing / development)
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh

# ##################################
# ### Manual install
# # Step 1: Add Docker's official GPG key:
#   sudo apt-get update
#   sudo apt-get install ca-certificates curl gnupg
#   sudo install -m 0755 -d /etc/apt/keyrings
#   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
#   sudo chmod a+r /etc/apt/keyrings/docker.gpg

# # Step 2: Add the repository to Apt sources:
# # Note: If you use an Ubuntu derivative distro, such as Linux Mint,
# # you may need to use UBUNTU_CODENAME instead of VERSION_CODENAME.
#   echo \
#     "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
#     $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
#     sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
#   sudo apt-get update

# # Step 3: Install the Docker packages
#   sudo apt-get -y install docker-ce docker-ce-cli containerd.io \
#     docker-buildx-plugin docker-compose-plugin

# # # Step 4: (Opetional) Verify that the Docker Engine installation
# # sudo docker run hello-world


##################################
# ### Don't wanna use sudo ?
# sudo usermod -aG docker $USER
# # Or haven't tested: dockerd-rootless.sh --experimental
# # Or this, came accross while installing: dockerd-rootless-setuptool.sh install
rm -f get-docker.sh
