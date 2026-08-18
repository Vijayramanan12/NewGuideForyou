---
title: "How to Create a GitHub Repository and Add Code"
date: 2026-08-18
author: "Vijayaramanan"
category: "Tutorial"
tags:
  - GitHub
  - Git
  - version control
  - repositories
description: "Learn how to create a GitHub repository, connect it to a local project, commit your files, and push code safely from the command line."
---

# How to Create a GitHub Repository and Add Code

If you have a project on your computer, you can create a GitHub repository for it and upload the code in a few commands. This tutorial explains the complete workflow: prepare the project, create the remote repository, connect it to Git, commit the files, and push them to GitHub.

By the end, you will have a working GitHub repository containing your project’s code and a repeatable workflow for publishing future changes. The guide is intended for beginners, but it also covers the decisions and common errors that experienced developers encounter when connecting an existing local project to GitHub.

> **Primary search intent:** Learn how to create a GitHub repository and add an existing local project to it.

The command-line workflow is useful because Git records each change as a commit before it is sent to GitHub. That history makes it easier to review work, restore earlier versions, collaborate with others, and use related workflows such as [creating a branch](/tutorials/git-branches/) or [opening a pull request](/tutorials/github-pull-requests/).

## What You Need Before You Start

You need the following items:

| Requirement | Purpose |
| --- | --- |
| A GitHub account | Creates and owns the remote repository. |
| Git installed on your computer | Tracks files, creates commits, and sends changes to GitHub. |
| A local project folder | Contains the code you want to publish. |
| Terminal, Command Prompt, or Git Bash | Runs Git commands. |
| GitHub authentication | Authorizes Git or GitHub CLI to access your account. |

You do not need to be an expert in Git. However, it helps to understand three basic terms:

- A **repository** is a project directory whose files and change history are tracked by Git. A GitHub repository is the remote copy hosted on GitHub.
- A **commit** is a saved snapshot of staged changes. A commit exists locally until you push it.
- A **remote** is a named URL that connects your local repository to a hosted repository. The conventional remote name is `origin`.

Check that Git is installed by opening a terminal and running:

```bash
git --version
```

If the command is not recognized, install Git from the [official Git website](https://git-scm.com/downloads). You can also use [GitHub Desktop](https://desktop.github.com/) if you prefer a graphical interface, or [GitHub CLI](https://cli.github.com/) to create and manage repositories from the terminal.

## Step 1: Prepare the Local Project

Open a terminal and move into the folder that contains your project. Replace the example path with the actual path on your computer:

```bash
cd /path/to/your-project
```

On Windows, a path may look like this:

```powershell
cd "C:\Users\YourName\Documents\my-project"
```

Confirm that you are in the correct directory:

```bash
pwd
ls
```

On Windows Command Prompt, use `cd` to display the current directory and `dir` to list files. Make sure the folder contains the code you intend to publish.

Before tracking files, create a `.gitignore` file. It tells Git which files should remain local, such as dependencies, build output, operating-system metadata, and environment files. For example:

```gitignore
# Dependencies
node_modules/

# Build output
dist/
build/

# Local environment variables
.env
.env.*

# Operating-system files
.DS_Store
Thumbs.db
```

Adjust the file for your language or framework. GitHub maintains templates in the [github/gitignore repository](https://github.com/github/gitignore). Never commit passwords, API keys, private certificates, or other secrets; GitHub’s documentation specifically warns against adding sensitive information to a repository.[1]

## Step 2: Initialize Git in the Project

If the project is not already a Git repository, initialize it from the project’s root directory:

```bash
git init -b main
```

The `-b main` option creates the initial branch with the name `main`. It is supported by Git 2.28 and later.[1]

If your Git version is older, use the following equivalent commands:

```bash
git init
git symbolic-ref HEAD refs/heads/main
```

You can check whether the project is already tracked by Git with:

```bash
git status
```

If `git status` works and reports the project’s branch or changes, do not run `git init` again. Running it in an existing repository is usually unnecessary and can confuse the workflow.

## Step 3: Review the Files Before Staging Them

List the files Git sees as new or changed:

```bash
git status
```

Review this output carefully. The status should include the source files you want to publish and exclude files covered by `.gitignore`.

If a file contains a secret, remove the secret before continuing. A `.gitignore` entry prevents an untracked file from being added, but it does not remove a secret that has already been staged or committed. If a secret has already reached a remote repository, rotate or revoke it and follow GitHub’s guidance for [removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository).[1]

## Step 4: Stage and Commit the Code

Stage the project files:

```bash
git add .
```

The period means “stage changes in the current directory.” To stage only selected files, name them explicitly instead:

```bash
git add README.md src/ tests/
```

Check what is staged:

```bash
git status
git diff --cached
```

The second command displays the exact changes that will be included in the next commit. When the staged content looks correct, create the first commit:

```bash
git commit -m "Initial commit"
```

A good commit message briefly describes the change. For example, use `Add project setup` rather than a vague message such as `Changes`.

## Step 5: Create the GitHub Repository

Sign in to GitHub and open the [new repository page](https://github.com/new). Alternatively, select **New repository** from the account menu.

Choose the account or organization that should own the repository, enter a repository name, and add a short description. Select **Public** if anyone should be able to view the code, or **Private** if access should be restricted.

If you are pushing an existing local project with its own commit, leave **Add a README**, `.gitignore`, and license options unchecked. Creating an empty remote repository avoids an unnecessary first commit that may need to be merged with your local history.[1]

Click **Create repository**, then copy the repository’s HTTPS or SSH URL from the Quick Setup page. It will resemble one of these examples:

```text
https://github.com/USERNAME/PROJECT-NAME.git
git@github.com:USERNAME/PROJECT-NAME.git
```

Use your own GitHub username and repository name in the real URL.

## Step 6: Connect the Local Project to GitHub

Add the GitHub repository as the `origin` remote:

```bash
git remote add origin https://github.com/USERNAME/PROJECT-NAME.git
```

Replace the example URL with the URL you copied from GitHub. Verify the connection:

```bash
git remote -v
```

You should see `origin` listed for both fetching and pushing. If a remote named `origin` already exists, inspect it first:

```bash
git remote -v
```

To replace an incorrect URL, use:

```bash
git remote set-url origin https://github.com/USERNAME/PROJECT-NAME.git
```

## Step 7: Authenticate with GitHub

GitHub must verify that you are allowed to push to the repository. The exact sign-in method depends on the remote URL and the tools installed on your computer.

For the simplest command-line setup, install GitHub CLI and sign in interactively:

```bash
gh auth login
```

When prompted, choose GitHub.com, select HTTPS or SSH, and complete the browser-based authentication flow. Check the active account with:

```bash
gh auth status
```

If you use Git directly over HTTPS, follow GitHub’s current [command-line authentication guidance](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line). Do not enter your GitHub account password as a Git password. Use an approved authentication method, such as GitHub CLI, a credential manager, or an SSH key.

## Step 8: Push the Code to GitHub

Push the local `main` branch and set its upstream remote:

```bash
git push -u origin main
```

The `-u` option records the relationship between your local `main` branch and `origin/main`. After this first push, you can usually publish later commits with the shorter command:

```bash
git push
```

Refresh the repository page on GitHub. You should see your project files, the initial commit, and the `main` branch. GitHub’s official workflow uses the same sequence—add the remote, verify it, and push the branch to GitHub.[1]

## A Complete Existing-Project Workflow

Once Git and authentication are ready, the normal workflow for an existing project looks like this:

```bash
cd /path/to/your-project
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/PROJECT-NAME.git
git push -u origin main
```

Do not run this block blindly if the project is already a Git repository or if it contains files that should not be published. Run `git status` and inspect the staged changes before committing.

## Alternative: Create and Push the Repository with GitHub CLI

GitHub CLI can create the remote repository and push an existing local repository in one command. First, make sure the project has at least one local commit and that you are authenticated with `gh auth login`.

To create a private repository from the current directory and push the existing commits, run:

```bash
gh repo create PROJECT-NAME --private --source=. --remote=origin --push
```

For a public repository, use:

```bash
gh repo create PROJECT-NAME --public --source=. --remote=origin --push
```

GitHub CLI supports `--source` for an existing local repository, `--public`, `--private`, and `--internal` for visibility, `--remote` for the remote name, and `--push` to upload local commits.[2]

If you prefer to answer prompts interactively, run:

```bash
gh repo create
```

The interactive flow asks whether to create a new repository, which visibility to use, and whether to add the remote and push the current branch.[1]

## Alternative: Add Code Through the GitHub Website

For a small file or a quick edit, you can add code without using a local Git installation. On the repository’s main page, select **Add file** and then choose **Upload files**. Drag files into the browser or select them from your computer, enter a meaningful commit message, choose whether to commit to the current branch or create a new branch, and then select **Propose changes**.[3]

This method is convenient for small changes, but it is not a replacement for a local Git workflow for most software projects. Browser uploads are limited to 25 MiB per file, while command-line uploads support files up to 100 MiB each; larger files require Git Large File Storage.[3] Use Git when you need `.gitattributes` behavior, repeatable commits, tests before pushing, or a larger set of project changes.

## Troubleshooting and Common Pitfalls

| Problem | Cause | Solution |
| --- | --- | --- |
| `remote origin already exists` | The local repository already has a remote named `origin`. | Run `git remote -v` to inspect it, then use `git remote set-url origin YOUR-URL` or choose a different remote name. |
| `src refspec main does not match any` | There is no local `main` branch or no commit exists yet. | Run `git branch --show-current` and `git log --oneline`. Create a commit, or replace `main` in the push command with your actual branch name. |
| `fatal: not a git repository` | The terminal is not inside the project’s Git directory. | Run `pwd` and `ls`, then use `cd` to move to the project root. Initialize Git if necessary. |
| `Authentication failed` | GitHub rejected the credentials or the selected authentication method is incomplete. | Run `gh auth login`, configure a credential manager, or set up an SSH key according to GitHub’s authentication documentation. |
| `rejected because the remote contains work` | The remote repository has commits that are not in the local repository, often because a README was created online. | Pull and reconcile the histories with `git pull --rebase origin main`, resolve conflicts, then push again. For a new project, creating an empty remote repository avoids this situation. |
| Files are missing after `git add .` | They may be excluded by `.gitignore`, outside the current directory, or not saved locally. | Review `git status`, inspect `.gitignore`, and run `git check-ignore -v path/to/file` for an ignored file. |
| A secret was committed | Sensitive data was included before it was ignored. | Revoke or rotate the secret immediately, remove it from the working tree and history, and follow GitHub’s sensitive-data removal procedure. |
| A large file cannot be uploaded | The file exceeds GitHub’s normal file-size limits or repository rules. | Remove generated artifacts, use Git Large File Storage where appropriate, or store release assets outside the regular source tree. |

### Resolving a Remote-History Conflict

If you accidentally selected **Add a README** while creating a repository for a local project, the remote has a commit that your local repository does not have. One common way to incorporate it is:

```bash
git pull --rebase origin main
git push -u origin main
```

If Git reports conflicts, open the listed files, resolve the conflict markers, stage the resolved files, and continue the rebase:

```bash
git add path/to/resolved-file
git rebase --continue
```

Do not use `git push --force` as a first fix. Force-pushing can overwrite remote commits and other contributors’ work. If you are unsure whether rewriting history is safe, stop and review the branch history before taking further action.

## Pro Tips and Best Practices

### Use a useful `.gitignore` before the first commit

Adding a `.gitignore` before `git add .` prevents common local-only files from entering the repository. Include dependency directories, build output, editor settings, logs, and environment files as appropriate for your project. Do not use `.gitignore` as a substitute for rotating a secret that has already been exposed.

### Make small, meaningful commits

A commit should represent one understandable change, such as `Add database schema` or `Fix login validation`. Small commits are easier to review, revert, and explain than one large commit containing unrelated work.

### Work on a branch for collaborative projects

For personal experiments, committing directly to `main` may be acceptable. For a shared project, create a feature branch and open a pull request:

```bash
git switch -c add-homepage
git add .
git commit -m "Add homepage"
git push -u origin add-homepage
```

A branch keeps unfinished work separate from the default branch. A pull request then gives collaborators a place to review and discuss the changes. See the related New Guide topic on [how to create a Git branch and pull request](/tutorials/git-branches-and-pull-requests/).

### Check the repository visibility

Public repositories can be viewed and cloned by other people. Private repositories restrict access according to the repository’s permissions. Confirm the visibility setting before pushing proprietary code or personal data.

### Verify the result locally and remotely

Use these commands to inspect the local state and recent history:

```bash
git status
git log --oneline --decorate --graph -n 5
git remote -v
```

Then open the repository on GitHub and confirm that the expected files, branch, and commit message are present. This simple check catches wrong-directory, wrong-remote, and wrong-branch errors early.

### Keep generated files out of source control when appropriate

Compiled bundles, caches, dependency directories, and local logs often do not belong in a source repository. Excluding them reduces repository size and keeps reviews focused on the files needed to reproduce the project. If a generated file is required for deployment, document that decision in the project’s README.

## Summary and Next Steps

You now know how to create a GitHub repository and add code from an existing local project. The essential sequence is to prepare the project, initialize Git, review and stage files, create an empty GitHub repository, add it as `origin`, authenticate, and push the `main` branch.

For the next stage, add a project README, create a feature branch, and use a pull request to review changes before merging them. You may also want to learn [how to clone a GitHub repository](/tutorials/clone-github-repository/), [how to write a useful README](/tutorials/write-a-github-readme/), and [how to protect secrets in Git projects](/tutorials/protect-secrets-in-git/).

## References

[1]: https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github "GitHub Docs: Adding locally hosted code to GitHub"
[2]: https://cli.github.com/manual/gh_repo_create "GitHub CLI Manual: gh repo create"
[3]: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository "GitHub Docs: Adding a file to a repository"
[4]: https://docs.github.com/en/get-started/start-your-journey/creating-a-repository-for-your-project-on-github "GitHub Docs: Creating a repository for your project on GitHub"
