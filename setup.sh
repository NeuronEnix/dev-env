bashrc_custom='if [ -f ~/adoc/dev-env/bashrc_custom ]; then . ~/adoc/dev-env/bashrc_custom; fi'
if ! grep -qxF "$bashrc_custom" ~/.bashrc; then echo "\n$bashrc_custom" >> ~/.bashrc; fi


sh ./installer/from-snap.sh
sh ./installer/external.sh
