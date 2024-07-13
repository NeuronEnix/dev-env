const ts = new Date()

export const config = {
  ts: ts,
  backupDir: `${os.homedir()}/abkp/${os.hostname()}__${ts.toISOString().split(".")[0].replaceAll(":", "-").replace("T", "__")}`,
  dir: [
    { path: `${os.homedir()}/dev-env`, backupAs: "dev-env.zip", copySymlinkOriginalData: true},
    { path: `${os.homedir()}/adoc/prj`, backupAs: "adoc-prj.zip" },
    { path: `${os.homedir()}/adoc/rad`, backupAs: "adoc-rad.zip" },
    { path: `${os.homedir()}/adoc/cld`, backupAs: "adoc-cld.zip" },
    { path: `${os.homedir()}/adoc/tmp`, backupAs: "adoc-tmp.zip" },
    { path: `${os.homedir()}/kms`, backupAs: "kms.zip" }
  ]
}
