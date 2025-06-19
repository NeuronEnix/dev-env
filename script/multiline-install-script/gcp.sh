# https://cloud.google.com/sdk/docs/install

curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-linux-x86_64.tar.gz
tar -xf google-cloud-cli-linux-x86_64.tar.gz
./google-cloud-sdk/install.sh
./google-cloud-sdk/bin/gcloud init

# install components if needed
# https://cloud.google.com/sdk/docs/components
source ~/.bashrc
gcloud components list

# update sdk
# gcloud components update
