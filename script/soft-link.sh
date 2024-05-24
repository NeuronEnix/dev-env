echo "\n-> Set: Soft link"
source_file="$HOME/.bashrc"
destination_file="softLink/bashrc.sh"
if [ -f "$source_file" ] && [ ! -L "$destination_file" ]; then
  ln -s "$source_file" "$destination_file"
  echo "  - ok: Created $destination_file"
else
  echo "  - ok: Exist: $destination_file"
fi

source_file="$HOME/.ssh"
destination_file="softLink/ssh"
if [ -d "$source_file" ] && [ ! -L "$destination_file" ]; then
  ln -s "$source_file" "$destination_file"
  echo "  - ok: Created $destination_file"
else
  echo "  - ok: Exist: $destination_file"
fi

source_file="/etc/fstab"
destination_file="softLink/fstab"
if [ -f "$source_file" ] && [ ! -L "$destination_file" ]; then
  ln -s "$source_file" "$destination_file"
  echo "  - ok: Created $destination_file"
else
  echo "  - ok: Exist: $destination_file"
fi

source_file="$HOME/dev-env/script/minify.js"
destination_file="$HOME/adoc/minify.js"
if [ -f "$source_file" ] && [ ! -L "$destination_file" ]; then
  ln -s "$source_file" "$destination_file"
  echo "  - ok: Created $destination_file"
else
  echo "  - ok: Exist: $destination_file"
fi
