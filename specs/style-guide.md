# Setup

1. If necessary, get the latest version of these files from the master branch:
   `.eslintrc.json`, `.htmlhintrc`, `.prettierignore`, `.prettierrc.json`, `.stylelintrc.json`, `package-lock.json`, and `package.json`.
1. Run `npm i` to install the necessary modules.
1. Install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) VSCode extension.

# Prettier

We will use [Prettier](https://prettier.io/) to format our codebase.

**Two ways to format:**

1. CLI
   - Run `npx prettier --write .` from the project root directory to format all files in our codebase.
   - Run `npx prettier --write <path>` to format a file or directory.
1. VSCode
   - `CMD/CTRL + Shift + P` -> Format Document
   - There are other options you could use [here](https://github.com/prettier/prettier-vscode#usage).

# HTML

HTMLHint will enforce additional rules. Our team's rules can be found in the `.htmlhintrc` file in
the root directory. To learn more about these rules, check out the list of
[HTMLHint rules](https://htmlhint.com/docs/user-guide/list-rules).

**Using HTMLHint in VSCode:**

- Install and enable the [HTMLHint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint)
  extension in VSCode.

# CSS

Check out the list of [stylelint rules](https://stylelint.io/user-guide/rules/list).

**Using stylelint in VSCode**

- Install and enable the [stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
  extension in VSCode.

# JavaScript

**Rules:** https://standardjs.com/rules.html

**Exceptions:**

- "curly"
  - Always use curly braces for blocks.
- "semi"
  - Always terminate a statement with a semicolon.

**Using ESLint in VSCode:**

- Install and enable the [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  extension in VSCode.
