bashrc_custom='if [ -f ~/adoc/dev-env/bashrc_custom ]; then . ~/adoc/dev-env/bashrc_custom; fi'
if ! grep -qxF "$bashrc_custom" ~/.bashrc; then printf "\n# dev-env bashrc_custom\n$bashrc_custom\n" >> ~/.bashrc; fi

# defualt directory structure
mkdir -p ~/adoc/proj
mkdir -p ~/adoc/cloud/aws
mkdir -p ~/adoc/cloud/gcp
mkdir -p ~/adoc/cloud/az
mkdir -p ~/adoc/mounts
mkdir -p ~/adoc/temp
