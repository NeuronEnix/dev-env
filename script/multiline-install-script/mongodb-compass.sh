version=1.43.4
wget https://downloads.mongodb.com/compass/mongodb-compass_${version}_amd64.deb
sudo dpkg -i mongodb-compass_${version}_amd64.deb
sudo apt-get --fix-broken -y install
rm mongodb-compass_${version}_amd64.deb
