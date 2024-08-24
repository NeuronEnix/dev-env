const ts = new Date()
const backupDir = `${os.homedir()}/abkp/${os.hostname()}__${ts.toISOString().split(".")[0].replaceAll(":", "-").replace("T", "__")}`
const symlinkDir = `${os.homedir()}/dev-env/symlink`
export const config = {
  ts, backupDir, symlinkDir,
  setupOption: ["Apt Update","Setup Environment", "Install Default Pkg", "Install Apps"],
  defaultPkg: ["curl", "wget", "ffmpeg", "unzip", "openssh-server", "git"],
  file: [
    { path: `${os.homedir()}/dev-env/bashrc/_custom.sh` },
  ],

  dirList: [
    { path: `${os.homedir()}/dev-env`, backupAs: "dev-env", restore: true },
    { path: `${os.homedir()}/kms`, create: true, backupAs: "kms", restore: true },

    { path: `${os.homedir()}/adoc/dataset`, create: true, backupAs: "adoc/dataset", restore: true },
    { path: `${os.homedir()}/adoc/cld`, create: true, backupAs: "adoc/cld", restore: true },
    { path: `${os.homedir()}/adoc/lfs`, create: true, backupAs: "adoc/lfs", restore: true },
    { path: `${os.homedir()}/adoc/prj`, create: true, backupAs: "adoc/prj", restore: false },
    { path: `${os.homedir()}/adoc/rad`, create: true, backupAs: "adoc/rad", restore: true },
    { path: `${os.homedir()}/adoc/tmp`, create: true, backupAs: "adoc/tmp", restore: true },
    { path: `${os.homedir()}/adoc/data`, create: true, backupAs: "adoc/data", restore: true },

    { path: `${os.homedir()}/Downloads`, backupAs: "Downloads", restore: true },
    { path: `${os.homedir()}/.config/google-chrome`, backupAs: "config-google-chrome", restore: true },
    // { path: `${os.homedir()}/Documents`, backupAs: "Documents", restore: true },
    // { path: `${os.homedir()}/Pictures`, backupAs: "Pictures", restore: true },
    // { path: `${os.homedir()}/Videos`, backupAs: "Videos", restore: true },
  ],

  symlinkList: [
    { at: `${os.homedir()}/adoc/minify.cjs`, path: `${os.homedir()}/dev-env/script/minify.cjs` },
    { at: `${symlinkDir}/bashrc.sh`, path: `${os.homedir()}/.bashrc` },

    {
      at: `${symlinkDir}/app`, path: `${os.homedir()}/app`,
      backupAs: "sym-app", restore: true,
    },
    {
      at: `${symlinkDir}/ssh`, path: `${os.homedir()}/.ssh`,
      backupAs: "sym-ssh", restore: true,
    },
    {
      at: `${symlinkDir}/sublime`, path: `${os.homedir()}/.config/sublime-text/Local`,
      backupAs: "sym-sublime", restore: true,
    },
    {
      at: `${symlinkDir}/syncthing`, path: `${os.homedir()}/.local/state/syncthing`,
      backupAs: "sym-syncthing", restore: true,
      systemctlStop: "syncthing",
    },
  ],

  appList: [
    // From Snap
    {
      name: "Another Redis Desktop Manager", bin: "/snap/bin/another-redis-desktop-manager",
      install: { from: "snap", pkg: ["another-redis-desktop-manager"] },
    },
    {
      name: "Obsidian", bin: "/snap/bin/obsidian",
      install: { from: "snap", pkg: ["obsidian", "--classic"] },
    },
    {
      name: "Postman", bin: "/snap/bin/postman",
      install: { from: "snap", pkg: ["postman"] },
    },
    {
      name: "Restfox", bin: "/snap/bin/restfox",
      install: { from: "snap", pkg: ["restfox"] },
    },
    {
      name: "Slack", bin: "/snap/bin/slack",
      install: { from: "snap", pkg: ["slack"] },
    },
    {
      name: "Sublime", bin: "/snap/bin/subl",
      install: { from: "snap", pkg: ["sublime-text", "--classic"] },
    },
    {
      name: "VS Code", bin: "/snap/bin/code",
      install: { from: "snap", pkg: ["code", "--classic"] },
    },
    {
      name: "VLC", bin: "/snap/bin/vlc",
      install: { from: "snap", pkg: ["vlc"] },
    },
    {
      name: "OBS Studio", bin: "/var/lib/flatpak/exports/share/applications/com.obsproject.Studio.desktop",
      install: { from: "flatpak", pkg: ["com.obsproject.Studio"] },
      path: `${os.homedir()}/.var/app/com.obsproject.Studio`,
      backupAs: "flatpak/obs-studio", restore: true
    },
    // From File
    {
      name: "AWS Cli", bin: "/usr/local/bin/aws",
      install: { from: "file", path: `${os.homedir()}/dev-env/script/multiline-install-script/aws-cli.sh` },
    },
    {
      name: "Docker", bin: "/usr/bin/docker",
      install: { from: "file", path: `${os.homedir()}/dev-env/script/multiline-install-script/docker.sh` },
    },
    {
      name: "Flatpak", bin: "/usr/bin/flatpak",
      install: { from: "file", path: `${os.homedir()}/dev-env/script/multiline-install-script/flatpak.sh` },
    },
    {
      name: "Google Chrome", bin: "/usr/bin/google-chrome",
      install: { from: "file", path: `${os.homedir()}/dev-env/script/multiline-install-script/google-chrome.sh` },
    },
    {
      name: "Kubectl", bin: "/usr/bin/kubectl",
      install: { from: "file", path: `${os.homedir()}/dev-env/script/multiline-install-script/kubectl.sh` },
    },
    {
      name: "Minikube", bin: "/usr/bin/minikube",
      install: { from: "file", path: `${os.homedir()}/dev-env/script/multiline-install-script/minikube.sh` },
    },
    {
      name: "Mongodb Compass", bin: "/usr/bin/mongodb-compass",
      install: { from: "file", path: `${os.homedir()}/dev-env/script/multiline-install-script/mongodb-compass.sh` },
    },
    {
      name: "Syncthing", bin: `${os.homedir()}/app/syncthing/syncthing`,
      install: { from: "file", path: `${os.homedir()}/dev-env/script/multiline-install-script/syncthing.sh` },
      systemctl: {
        name: "syncthing",
        script: `${os.homedir()}/dev-env/script/systemctl/syncthing.service`
      }
    },
  ]
}
