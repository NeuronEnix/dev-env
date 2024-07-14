alias lfs='create_lfs_folder'

create_lfs_folder() {
  current_dir=$(pwd)
  base_dir="$HOME/adoc"

  # Check if the current directory is within ~/adoc but not within ~/adoc/lfs
  if [[ "$current_dir" == "$base_dir"* && "$current_dir" != "$base_dir" && "$current_dir" != "$base_dir/lfs"* ]]; then
    # Get the relative path from ~/adoc to the current directory
    relative_path=${current_dir#$base_dir/}

    lfs_folder="$base_dir/lfs/$relative_path/lfs"
    lfs_link="$current_dir/lfs"

    # Create the folder dir
    mkdir -p "$lfs_folder" && echo "Created Folder: $lfs_folder"

    # Create symlink if not exist
    if [ ! -L "$lfs_link" ]; then
      ln -sr "$lfs_folder" "$lfs_link" && echo "Created Symlink: $lfs_link -> $lfs_folder"
    else
      echo "Symlink already exists: $lfs_link"
    fi
  else
    echo "lfs: can only be used within the '$base_dir/...' directory"
  fi
}
