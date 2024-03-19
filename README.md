# Tauri + Vanilla

This template should help get you started developing with Tauri and GameSalad HTML5

## Dev Setup
* Install Node.js
-- Install current version: https://node.js.org/en/
  - Install via NVM (Node Version Manager) https://github.com/nvm-sh/nvm
* Download this repo
* Run `npm install` to install all dependencies.

## Game Setup
Download your GameSalad HTML5 package and place files as follows:

| GameSalad HTML5     | Tauri Project            | Note                          |
| ------------------- | ------------------------ | ----------------------------- |
| images              | src/assets/images        | Scene loading indicator image |
| js/gse/gs-export.js | src/js/gse/gs-export.js  | Game Engine                   |
| game                | src-tauri/resources/game | Game Project. Differnt so it's not compiled into the binary |
| css                 | src/assets/css           | CSS. Optional since it doesn't change often and are already included |

## Development
To add custom functionality to your game, edit the delegate.js file.
This file allows you to define delegates that are run in response to certain game lifecyle and behavior events.

To learn more about extending GameSalad via JS, take a look at:
https://help.gamesalad.com/knowledge-base/does-the-html5-engine-have-any-apis-i-can-interact-with/

## Testing
To test your game run the following in the command line:
`npm run tauri dev`

## Prepping for Deploy
You will need to update a few things in tauri.conf.json before deploying
Please update the windows.title, width, and height to match your game.
Also update bundle.identifier to match your game's package id.
As-is you'll get a warning when you try to build to force you to change it.
Finally update the icons in src-tauri/icons to the icon you want your app to have.

## Build
To build your game pacakge for the current platform run:
`npm run tauri build`

Tauri builds both the "binary" and the installer (dmg for mac, msi for windows).

While this might change in the future, it seems cross compiling doesn't work great so you will need the appropriate dev environment on your target platform to build the installer package.