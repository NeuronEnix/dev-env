# Dev-Env

Development Environment
0. Source: https://github.com/nvm-sh/nvm
1. Install `nvm`: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`
2. Use `.nvmrc`: `nvm install` | `nvm use`
3. Install dependency: `npm i`
4. Run: `npm start`

Using `asdf`
- Source: https://asdf-vm.com/guide/getting-started.html
``` sh
# Dependency
apt install curl git

# Download asdf
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
```
- Past in  `.bashrc`:
``` sh
. "$HOME/.asdf/asdf.sh"
. "$HOME/.asdf/completions/asdf.bash"
```
- Install node using asdf
```sh
asdf plugin-add nodejs
asdf install nodejs 20.15.1
asdf global nodejs 20.15.1
```
