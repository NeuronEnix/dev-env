echo "-> Set: dev-env bashrc path"
custom_path="$HOME/dev-env/bashrc/_main.sh"
bashrc_custom="if [ -f '$custom_path' ]; then . '$custom_path'; fi"

if ! grep -qxF "$bashrc_custom" "$HOME/.bashrc"; then
  printf "\n# dev-env bashrc_custom\n%s\n" "$bashrc_custom" >> "$HOME/.bashrc"
fi
echo "  - ok: Succefully set"


echo "\n-> Set: Default directories"
mkdir -p ./softLink
echo "  - ok: Added dev-env/softLink"

mkdir -p ~/kms/general
mkdir -p ~/adoc/prj
mkdir -p ~/adoc/cld/aws
mkdir -p ~/adoc/cld/gcp
mkdir -p ~/adoc/cld/az
mkdir -p ~/adoc/mnt
mkdir -p ~/adoc/rad
mkdir -p ~/adoc/tmp
echo "  - ok: Added adoc dir struct"

touch bashrc/_custom.sh
echo "  - ok: Added bashrc/_custom.sh"


echo "\n-> Set: service"
if [ ! -f "./service/app/.env" ]; then cp ./service/app/.env.example ./service/app/.env; fi
  echo "  - ok: Created app/.env"
if [ ! -f "./service/ingress/.env" ]; then cp ./service/ingress/.env.example ./service/ingress/.env; fi
  echo "  - ok: Created ingress/.env"
if [ ! -f "./service/storage/.env" ]; then cp ./service/storage/.env.example ./service/storage/.env; fi
  echo "  - ok: Created storage/.env"

mkdir -p ./service/app/vol ./service/ingress/vol ./service/storage/vol &&
  echo "  - ok: mkdir app/vol ingress/vol storage/vol"

sh script/soft-link.sh
