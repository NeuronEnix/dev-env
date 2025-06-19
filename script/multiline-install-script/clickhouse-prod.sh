# Source: https://clickhouse.com/docs/en/install#available-installation-options

# Setup the Debian repository
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
curl -fsSL 'https://packages.clickhouse.com/rpm/lts/repodata/repomd.xml.key' | sudo gpg --dearmor -o /usr/share/keyrings/clickhouse-keyring.gpg

ARCH=$(dpkg --print-architecture)
echo "deb [signed-by=/usr/share/keyrings/clickhouse-keyring.gpg arch=${ARCH}] https://packages.clickhouse.com/deb stable main" | sudo tee /etc/apt/sources.list.d/clickhouse.list
sudo apt-get update


# Install ClickHouse server and client
sudo apt-get install -y clickhouse-server clickhouse-client


# Start ClickHouse server
sudo service clickhouse-server start
clickhouse-client # or "clickhouse-client --password" if you've set up a password.
