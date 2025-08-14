sudo apt update
sudo apt install -y curl git wget unzip zip

git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0

# add it if # asdf install not exist in ~/.bashrc
if ! grep -q "# asdf install" ~/.bashrc; then
  echo "# asdf install" >> ~/.bashrc
  echo ". $HOME/.asdf/asdf.sh" >> ~/.bashrc
  echo ". $HOME/.asdf/completions/asdf.bash" >> ~/.bashrc
fi

source ~/.bashrc 

# Install node using asdf
asdf plugin-add nodejs
asdf install nodejs 22.18.0
asdf global nodejs 22.18.0

asdf plugin-add golang
asdf install golang 1.25.0
asdf global golang 1.25.0

npm install -g pnpm@latest-10

echo
echo
echo "Node Version: $(node -v)"
echo "Golang Version: $(go version)"
echo "PNPM Version: $(pnpm -v)"

cd ~
if [ ! -d "dev-env" ]; then
  git clone https://github.com/NeuronEnix/dev-env.git
fi
cd ~/dev-env

npm ci
npm run start
