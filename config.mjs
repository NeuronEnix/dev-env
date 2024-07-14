const ts = new Date()

export const config = {
  ts: ts,
  backupDir: `${os.homedir()}/adoc/bkp/${os.hostname()}__${ts.toISOString().split(".")[0].replaceAll(":", "-").replace("T", "__")}`,
  symlinkDir: `${os.homedir()}/dev-env/symlink`,

  file: [
    { path: `${os.homedir()}/dev-env/bashrc/_custom.sh` },
  ],

  dirList: [
    { path: `${os.homedir()}/dev-env`, backupAs: "dev-env" },
    { path: `${os.homedir()}/kms`, backupAs: "kms" },

    { path: `${os.homedir()}/adoc/bkp`, },
    { path: `${os.homedir()}/adoc/cld`, backupAs: "adoc-cld" },
    { path: `${os.homedir()}/adoc/lfs`, backupAs: "adoc-lfs" },
    { path: `${os.homedir()}/adoc/prj`, backupAs: "adoc-prj" },
    { path: `${os.homedir()}/adoc/rad`, backupAs: "adoc-rad" },
    { path: `${os.homedir()}/adoc/tmp`, backupAs: "adoc-tmp" },
  ],

  symlinkList: [
    { as: "bashrc.sh", path: `${os.homedir()}/.bashrc` },
    { as: "ssh", backupAs: "sym-ssh", path: `${os.homedir()}/.ssh` },
    { as: "sublimeAutoSave", backupAs: "sym-sublimeAutoSave", path: `${os.homedir()}/.config/sublime-text/Local` },
    { as: "syncthing", backupAs: "sym-syncthing", path: `${os.homedir()}/.local/state/syncthing` },
  ]
}
