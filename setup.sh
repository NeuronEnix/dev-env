custom_path='~/dev-env/bashrc/bashrc.sh'
bashrc_custom="if [ -f $custom_path ]; then . $custom_path; fi"

if ! grep -qxF "$bashrc_custom" ~/.bashrc; then
  printf "\n# dev-env bashrc_custom\n%s\n" "$bashrc_custom" >> ~/.bashrc
  echo "bashrc_custom import set"
fi

# defualt directory structure
mkdir -p ~/adoc/proj
mkdir -p ~/adoc/cloud/aws
mkdir -p ~/adoc/cloud/gcp
mkdir -p ~/adoc/cloud/az
mkdir -p ~/adoc/mounts
mkdir -p ~/adoc/rad
mkdir -p ~/adoc/tmp
echo "Directories created"

# Check if node is installed
if command -v node &> /dev/null; then
  echo "Node is installed."
  SCRIPT_DIR=$(dirname "$0")
  node "$SCRIPT_DIR/bashrc/bashExtended.js"
  echo "Created bashExtended.sh"
else
    echo "Node not found"
fi
