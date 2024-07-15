const ts = new Date()
const backupDir = `${os.homedir()}/abkp/${os.hostname()}__${ts.toISOString().split(".")[0].replaceAll(":", "-").replace("T", "__")}`
const symlinkDir = `${os.homedir()}/dev-env/symlink`
export const config = {
  ts, backupDir, symlinkDir,
  setupOption: ["Setup Environment", "Install Default Pkg", "Install Apps"],
  defaultPkg: ["curl", "wget", "ffmpeg", "unzip"],
  file: [
    { path: `${os.homedir()}/dev-env/bashrc/_custom.sh` },
  ],

  dirList: [
    // { path: `${os.homedir()}/dev-env`, backupAs: "dev-env", restore: false },
    { path: `${os.homedir()}/kms`, backupAs: "kms", restore: false },

    { path: `${os.homedir()}/adoc/cld`, backupAs: "adoc-cld", restore: true },
    // { path: `${os.homedir()}/adoc/lfs`, backupAs: "adoc-lfs", restore: false },
    { path: `${os.homedir()}/adoc/prj`, backupAs: "adoc-prj", restore: false },
    { path: `${os.homedir()}/adoc/rad`, backupAs: "adoc-rad", restore: true },
    // { path: `${os.homedir()}/adoc/tmp`, backupAs: "adoc-tmp", restore: false },
  ],

  symlinkList: [
    { at: `${os.homedir()}/adoc/minify.cjs`, path: `${os.homedir()}/dev-env/script/minify.cjs` },
    { at: `${symlinkDir}/bashrc.sh`, path: `${os.homedir()}/.bashrc` },

    {
      at: `${symlinkDir}/app`, path: `${os.homedir()}/app`,
      backupAs: "sym-app", restore: false
    },
    {
      at: `${symlinkDir}/ssh`, path: `${os.homedir()}/.ssh`,
      backupAs: "sym-ssh",

    },
    {
      at: `${symlinkDir}/sublime`, path: `${os.homedir()}/.config/sublime-text/Local`,
      backupAs: "sym-sublime",
    },
    {
      at: `${symlinkDir}/syncthing`, path: `${os.homedir()}/.local/state/syncthing`,
      backupAs: "sym-syncthing", restore: false,
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
      install: { from: "file", path: `${os.homedir()}/script/multiline-install-script/flatpak.sh` },
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
