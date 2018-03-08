# Viblo Atom Plugin package

![plugin-screen-shot](./images/ss1.png)

Viblo Plugin for Atom editor. Vietnamese documentation is available [here](./README.vi.md).

## Requirement
- [Atom](https://atom.io/) version 1.x

## Installation
- Open `Atom`
- Go the `Packages` > `Settings View` > `Open` or press <kbd>Ctrl + Shift + P</kbd> (Linux/Windows) or <kbd>Cmd + Shift + P</kbd> (macOS),
in the search menu type the keywords **Install packages** and click **Settings View:Install Packages and Themes**.
- In the search bar type `viblo` and then install it :smile:

## Features
- Get Posts and Drafts list from Viblo
- Create a new post and save it as a draft or publish it
- Edit an existed draft or post
- Upload images to Viblo
- Markdown preview with Viblo's supported syntaxes

## Usage
### Setting
- Go to [Viblo Setting Page](https://viblo.asia/settings/oauth) to create an API key
- Press <kbd>Ctrl + Shift + P</kbd> (Linux/Windows) or <kbd>Cmd + Shift + P</kbd> (macOS), type `viblo`, then go to `Viblo: Settings` page.
Paste your API key here then reload your Atom.
- Go to:
    - `Viblo: Publish Posts` page to check your published posts.
    - `Viblo: Draft Posts` page to check your drafts.
    - `Viblo: Gallery` page to manage your images.

### Create new posts
- Press <kbd>Ctrl + Shift + P</kbd> or <kbd>Cmd + Shift + P</kbd> (macOS), type `viblo` then go to `Viblo: Create Post`.
Viblo editor will be open for you. Let's fill your post contents here.
- Right click at Atom, then choose `Viblo Toggle Preview` to review your post contents.
- Right click at Atom, then choose `Save to Viblo` to open Publish Form where you can fill title, tags, category and language.
After that, click `Publish post` button or `Save as Draft` button to save this post into Viblo.
- And on the other way, you can create (or open) `markdown` file (with `.md` as file extension).
Then right click  at Atom, choose `Save to Viblo` to save post into Viblo.

### Edit a post or draft
- Go to `Viblo: Publish Posts` or `Viblo: Draft Posts` page to check your posts.
- Click on the post title that you want to edit. The Viblo editor will be open.
- Right click at Atom, then choose `Viblo Toggle Preview` to review your post contents.
- Right click at Atom, then choose `Save to Viblo` to open Publish Form where you can fill title, tags, category and language.
After that, click `Publish post` button or `Save as Draft` button to save post into Viblo.

### Key maps
 If you are using macOS, use <kbd>Cmd</kbd> instead <kbd>Ctrl</kbd>.
**Atom key maps** that you should know before using:
- <kbd>Ctrl + Shift + P</kbd>: Find and run available commands in atom.
- <kbd>Ctrl + S</kbd>: Save your contents to local file from atom editor.
- <kbd>Ctrl + Shift + F5</kbd>: Restart/Reload Atom.

**Viblo Atom Plugin key maps** are supported:
- <kbd>Ctrl + Alt + O</kbd> or <kbd>Ctrl + Alt P</kbd>: Open `Publish Posts` page - List of all published posts.
- <kbd>Ctrl + Alt + D</kbd>: Open `Draft Posts` page - List of all (public) drafts.
- <kbd>Ctrl + Alt + G</kbd>: Open `Gallery` page.
- <kbd>Ctrl + Alt + S</kbd>: Open `Settings` page - Where you can login or logout by Viblo Api token.
- <kbd>Ctrl + Alt + A</kbd>: Open `About` page - Information about Viblo Atom Plugin.
- <kbd>Ctrl + Alt + C</kbd>: Create new post.
- <kbd>Ctrl + Shift + S</kbd>: Toggle Publish Form to save content from atom editor into Viblo.
- <kbd>Ctrl + Alt + V</kbd>: Toggle Viblo Preview to review your content from atom editor before publish.
- <kbd>Ctrl + Alt + I</kbd>: Toggle Image Helper from atom editor to upload your image, insert image into your contents.

## Developing
1. Clone repository
```
cd ~/ & git clone git@github.com:viblo-asia/atom-plugin.git
```
 to `~/.atom/packages` folder or make `symlink` inside this folder named `viblo`
```
ln -s ~/atom-plugin ~/.atom/packages/viblo
```

2. Press <kbd>Ctrl + Shift + P</kbd>, type the command `Window: reload` or just `reload` and press <kbd>Enter</kbd>
to reload Atom workspace and after that `viblo` will be available in list of installed packages.
3. Check that our package has been installed, press <kbd>Ctrl + Shift + P</kbd>, type the command
`Settings View: View Installed Packages` or just `Installed Packages` (command line have fuzzy autocomplete)
and press <kbd>Enter</kbd>.

> **Note:** To check your code need to reload Atom workspace each time

### Helpful links
- [Documentation of Atom](https://atom.io/docs)
- [Atom API](https://atom.io/docs/api/)
- [Specification of Versioning of package](http://semver.org/)

### Licence
[MIT](./LICENSE.md)
