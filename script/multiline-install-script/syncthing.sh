version=2.0.2

# Download
# template wget  https://github.com/syncthing/syncthing/releases/download/v2.0.2/syncthing-linux-amd64-v2.0.2.tar.gz
wget  https://github.com/syncthing/syncthing/releases/download/v${version}/syncthing-linux-amd64-v${version}.tar.gz

# Extract and copy
tar -xzf syncthing-linux-amd64-v${version}.tar.gz
mkdir -p ~/app/syncthing
cp -r syncthing-linux-amd64-v${version}/* ~/app/syncthing

# Cleanup
rm -rf syncthing-linux-amd64-v${version}.tar.gz
rm -rf syncthing-linux-amd64-v${version}
