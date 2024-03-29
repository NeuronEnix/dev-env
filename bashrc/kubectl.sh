alias k='kubectl'
complete -o default -F __start_kubectl k
alias k-='kubectl'
alias k-a='k- apply -f'
alias k-c='k- config'
  alias k-cg='k-c get-contexts'
  alias k-cs='k-c set-context --current'
alias k-d='k- delete -f'
alias k-g='k- get'
  alias k-gd='k-g deployments'
  alias k-gi='k-g ingress'
  alias k-gp='k-g pods'
  alias k-gpv='k-g pv'
  alias k-gpvc='k-g pvc'
  alias k-gs='k- get services'
alias k-l='k- logs'
  alias k-lf='k-l -f'
alias k-r='k- restart -f'
alias k-x='k- exec'
  alias k-xit='kc exec -it'