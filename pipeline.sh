#!/bin/bash
RED='\033[0;31m'
NC='\033[0m'

printf "${RED}Check if Prettier was ran${NC}\n"
npx prettier --check .

printf "\n${RED}Lint JS${NC}\n"
npx eslint .

printf "\n${RED}Lint HTML${NC}\n"
npx htmlhint "source/**/*.html"

printf "\n${RED}Lint CSS${NC}\n"
npx stylelint "source/**/*.css"
