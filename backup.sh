#!/bin/bash
set -e

backup_dir="$HOME/backup-$(hostname)/$(date +"%Y_%m_%d-%H_%M_%S")"
mkdir -p "$backup_dir"

# Backup ~/dev-env
cd ~/dev-env
sudo zip -r "$backup_dir/dev-env.zip" .

# Backup ~/adoc
cd ~/adoc/kms
sudo zip -r "$backup_dir/kms.zip" .

# Backup ~/adoc
cd ~/adoc
node minify.js
sudo zip -r "$backup_dir/adoc.zip" .
