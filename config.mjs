const ts = new Date()
const backupDir = `${os.homedir()}/abkp/${os.hostname()}__${ts.toISOString().split(".")[0].replaceAll(":", "-").replace("T", "__")}`
const symlinkDir = `${os.homedir()}/dev-env/symlink`
export const config = {
  ts, backupDir, symlinkDir,

  file: [
    { path: `${os.homedir()}/dev-env/bashrc/_custom.sh` },
  ],

  dirList: [
    { path: `${os.homedir()}/dev-env`, backupAs: "dev-env" },
    { path: `${os.homedir()}/kms`, backupAs: "kms" },

    { path: `${os.homedir()}/adoc/cld`, backupAs: "adoc-cld" },
    { path: `${os.homedir()}/adoc/lfs`, backupAs: "adoc-lfs" },
    { path: `${os.homedir()}/adoc/prj`, backupAs: "adoc-prj" },
    { path: `${os.homedir()}/adoc/rad`, backupAs: "adoc-rad" },
    { path: `${os.homedir()}/adoc/tmp`, backupAs: "adoc-tmp" },
  ],

  symlinkList: [
    { at: `${os.homedir()}/adoc/minify.cjs`, path: `${os.homedir()}/dev-env/script/minify.cjs` },
    { at: `${symlinkDir}/bashrc.sh`, path: `${os.homedir()}/.bashrc` },
    { at: `${symlinkDir}/ssh`, backupAs: "sym-ssh", path: `${os.homedir()}/.ssh` },
    { at: `${symlinkDir}/sublimeAutoSave`, backupAs: "sym-sublimeAutoSave", path: `${os.homedir()}/.config/sublime-text/Local` },
    { at: `${symlinkDir}/syncthing`, backupAs: "sym-syncthing", path: `${os.homedir()}/.local/state/syncthing` },
  ]
}
