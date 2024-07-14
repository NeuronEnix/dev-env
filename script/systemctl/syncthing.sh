[Unit]
Description=Syncthing - Open Source Continuous File Synchronization
Documentation=https://docs.syncthing.net/
After=network.target

[Service]
User=__USER__
ExecStart=/home/__USER__/app/syncthing/syncthing -no-browser -gui-address=0.0.0.0:8384
Restart=on-failure
RestartSec=5
StartLimitInterval=60s
StartLimitBurst=3

[Install]
WantedBy=multi-user.target
