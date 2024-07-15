version=1.27.9

# Download
# template wget  https://github.com/syncthing/syncthing/releases/download/v1.27.9/syncthing-linux-amd64-v1.27.9.tar.gz
wget  https://github.com/syncthing/syncthing/releases/download/v${version}/syncthing-linux-amd64-v${version}.tar.gz

# Extract and copy
tar -xzf syncthing-linux-amd64-v${version}.tar.gz
mkdir -p ~/app/syncthing
cp -r syncthing-linux-amd64-v${version}/* ~/app/syncthing

# Cleanup
rm -rf syncthing-linux-amd64-v${version}.tar.gz
rm -rf syncthing-linux-amd64-v${version}
