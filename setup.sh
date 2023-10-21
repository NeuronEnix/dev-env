custom_path='~/dev-env/bashrc/bashrc.sh'
bashrc_custom="if [ -f $custom_path ]; then . $custom_path; fi"

if ! grep -qxF "$bashrc_custom" ~/.bashrc; then
  printf "\n# dev-env bashrc_custom\n%s\n" "$bashrc_custom" >> ~/.bashrc
fi

# defualt directory structure
mkdir -p ~/adoc/proj
mkdir -p ~/adoc/cloud/aws
mkdir -p ~/adoc/cloud/gcp
mkdir -p ~/adoc/cloud/az
mkdir -p ~/adoc/mounts
mkdir -p ~/adoc/rad
mkdir -p ~/adoc/tmp
