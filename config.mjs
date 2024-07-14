const ts = new Date()
const backupDir = `${os.homedir()}/abkp/${os.hostname()}__${ts.toISOString().split(".")[0].replaceAll(":", "-").replace("T", "__")}`
const symlinkDir = `${os.homedir()}/dev-env/symlink`
export const config = {
  ts, backupDir, symlinkDir,

  file: [
    { path: `${os.homedir()}/dev-env/bashrc/_custom.sh` },
  ],

  dirList: [
    // { path: `${os.homedir()}/dev-env`, backupAs: "dev-env", restore: false },
    { path: `${os.homedir()}/kms`, backupAs: "kms", restore: false },

    { path: `${os.homedir()}/adoc/cld`, backupAs: "adoc-cld", restore: false },
    // { path: `${os.homedir()}/adoc/lfs`, backupAs: "adoc-lfs", restore: false },
    { path: `${os.homedir()}/adoc/prj`, backupAs: "adoc-prj", restore: false },
    { path: `${os.homedir()}/adoc/rad`, backupAs: "adoc-rad", restore: false },
    // { path: `${os.homedir()}/adoc/tmp`, backupAs: "adoc-tmp", restore: false },
  ],

  symlinkList: [
    { at: `${os.homedir()}/adoc/minify.cjs`, path: `${os.homedir()}/dev-env/script/minify.cjs` },
    { at: `${symlinkDir}/bashrc.sh`, path: `${os.homedir()}/.bashrc` },

    { at: `${symlinkDir}/app`, backupAs: "sym-app", path: `${os.homedir()}/app`, restore: false },
    { at: `${symlinkDir}/ssh`, backupAs: "sym-ssh", path: `${os.homedir()}/.ssh` },
    { at: `${symlinkDir}/sublime`, backupAs: "sym-sublime", path: `${os.homedir()}/.config/sublime-text/Local` },
    { at: `${symlinkDir}/syncthing`, backupAs: "sym-syncthing", path: `${os.homedir()}/.local/state/syncthing`, restore: false },
  ]
}
