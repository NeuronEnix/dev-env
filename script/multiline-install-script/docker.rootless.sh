# https://docs.docker.com/engine/install/ubuntu/

##################################
# ### Don't wanna use sudo ?
sudo usermod -aG docker $USER
# # Or haven't tested: dockerd-rootless.sh --experimental
# # Or this, came accross while installing: dockerd-rootless-setuptool.sh install
# rm -f get-docker.sh
