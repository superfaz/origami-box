wt -M -d %CD% pwsh -NoExit -c yarn start ; ^
sp -H -d %CD% pwsh -NoExit -c yarn test ; ^
mf up ; ^
sp -V -d %CD% pwsh -NoExit -c yarn local:db ; ^
mf down ; ^
sp -V -d %CD% pwsh -NoExit -c yarn local:api
