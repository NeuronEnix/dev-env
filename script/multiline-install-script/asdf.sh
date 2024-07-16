git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.14.0
# add to bashrc
echo "# asdf install" >> ~/.bashrc
echo ". $HOME/.asdf/asdf.sh" >> ~/.bashrc
echo ". $HOME/.asdf/completions/asdf.bash" >> ~/.bashrc
source ~/.bashrc

# Install golang example
# asdf plugin list all
# asdf plugin list all | grep go
# asdf plugin-add golang
# asdf list golang
# asdf list all golang
# asdf install  golang 1.22.3

# Set version for the project, which creates a file called .tool-versions in the project directory
# asdf local golang 1.22.3

# Set golang version globally
# asdf global golang 1.22.3
