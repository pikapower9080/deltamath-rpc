# DeltaMath Rich Presence

This repository is made up of a browser-based userscript and a server written in Bun.js that connect with Discord to show your progress on a DeltaMath lesson. If you have any issues getting started or seeing progress, please open an Issue.

## Setup

1. Install [Bun](https://bun.sh/)
2. Clone this repo
	```sh
	git clone https://github.com/pikapower9080/deltamath-rpc
	cd deltamath-rpc
	```
3. Install packages
	```sh
	bun i
	```
4. Launch Discord and start the rich presence server
	```sh
	bun start
	```
5. Install Tampermonkey ([Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) | [Firefox Addon](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/))
6. Install [the client userscript](https://raw.githubusercontent.com/pikapower9080/deltamath-rpc/refs/heads/main/userscript.user.js)
7. Reload DeltaMath to connect. If all went well, your Discord status should update.

## Notes

### Windows
- To run the commands above first press press <kbd>Windows</kbd> + <kbd>R</kbd> and type cmd. Paste the command you want and press enter.
- Make sure you download [Git for Windows](https://git-scm.com/downloads/win) before cloning the repository
- To install Bun, copy the command under the windows tab from the website and enter it into cmd.

### MacOS
- You can run the commands above by pressing <kbd>Cmd</kbd> + <kbd>Space</kbd> and searching for Terminal
- If git isn't installed, type `xcode-select --install` into the Terminal window and press enter, then follow the prompts.

### Linux
- If you installed Discord though flatpak, rich presence might not work. You can install through the [official package](https://discord.com/download#:~:text=Download-,Linux,-Download) or use a third party client like [Vesktop](https://github.com/Vencord/Vesktop).
