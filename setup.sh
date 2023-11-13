custom_path='~/dev-env/bashrc/bashrc.sh'
bashrc_custom="if [ -f $custom_path ]; then . $custom_path; fi"

if ! grep -qxF "$bashrc_custom" ~/.bashrc; then

  printf "\n# dev-env bashrc_custom\n%s\n" "$bashrc_custom" >> ~/.bashrc
  echo "Set: dev-env bashrc script in .bashrc"
fi

# defualt directory structure
mkdir -p ~/adoc/prj
mkdir -p ~/adoc/cld/aws
mkdir -p ~/adoc/cld/gcp
mkdir -p ~/adoc/cld/az
mkdir -p ~/adoc/mnt
mkdir -p ~/adoc/rad
mkdir -p ~/adoc/tmp
echo "Directory created: ~/adoc"

# Check if node is installed
if command -v node &> /dev/null; then
  echo "Node is installed."
  SCRIPT_DIR=$(dirname "$0")
  node "$SCRIPT_DIR/bashrc/bashExtended.js"
  echo "Created bashExtended.sh"
else
    echo "Node not found"
fi
