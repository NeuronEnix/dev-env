alias lfs='create_lfs_folder'

create_lfs_folder() {
    # Get the current directory path
    current_path=$(pwd)

    # Construct paths for the lfs folder and symlink
    lfs_folder="$HOME/lfs${current_path#$HOME}"
    lfs_link="$current_path/lfs"

    # Check if the current directory is within $HOME/lfs or its subdirectories
    if [[ "$current_path" =~ ^$HOME/lfs ]]; then
        echo "Error: Already in $HOME/lfs or its subdirectories."
        return 1
    fi

    # Check and create the folder if it does not exist
    mkdir -p "$lfs_folder" && echo "Created Folder: $lfs_folder"

    # Check and create the symlink if it does not exist
    if [ ! -L "$lfs_link" ]; then
        ln -s "$lfs_folder" "$lfs_link"
    fi
    echo "Created Symlink: $lfs_link"

}
