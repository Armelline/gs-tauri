# Tauri + GameSalad

This template should help you turn your GameSalad HTML5 game into a Windows exe, including NSIS installer, ready for submitting to stores like Steam.

It is based on the official GameSalad template located here: https://github.com/gamesalad/gs-tauri

This template includes some additional features:

* Quit button functionality so users can quit your game while in fullscreen mode.
* Window Mode toggle button functionality so users can toggle between Fullscreen mode (default) and Windowed mode.
* Optional bundling of all resources into the .exe file, rather than including them as a separate, browsable folder of images and sounds.
* Custom branding for the NSIS installer through Sidebar and Header images.

An accompanying GameSalad project file that shows how to trigger the Quit and Window Mode within your game itself can be found here: https://github.com/Armelline/SampleGamesaladProjects/blob/main/TauriButtons.zip

## Getting Set Up

**1. Install requirements.**

Download and install node.js using this link: [https://node.js.org/en/](https://node.js.org/en/)

Install NVM (Node Version Manager) from here: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

Install Git for Windows. You can use the default options. Download it from here: [https://git-scm.com/downloads/win](https://git-scm.com/downloads/win)

**2. Clone this repo.**

Using Windows Explorer, create a new folder at the location of your choice. I used “C:\Tauri".

Navigate into that folder, right click and select “Open Git Bash here”.

A command line window will open. Enter the following command. You can copy and paste, but note that to paste into the Git window you will need to either right click and select “Paste” or use “Shift+Ins” instead of “Ctrl+V”.

```git clone [https://github.com/gamesalad/gs-tauri](https://github.com/Armelline/gs-tauri)```

**3. Install project pre-requisites.**

Navigate into the project directory. To do this, type the following into the Git Bash window you opened:

```cd gs-tauri```

This will take you to the directory the GitHub repository was copied into. Most of what we’re going to do from here will take place in this directory.

Type in and run the following  command:

```npm install```

Wait for the required packages be installed. You don’t need to do anything in this step normally, but if it asks you for permission to do anything, go ahead and grant it.

That’s the setup complete!

## Generate an HTML5 project.

If you haven’t done so already, you’ll need to generate an HTML5 version of your game. See other GameSalad resources if you need help in doing that. We’re going to assume you’ve uploaded your game, Published it as an HTML5 project, and downloaded the resulting zip file. 

You'll probably want to use the sample project [linked above](https://github.com/Armelline/SampleGamesaladProjects/blob/main/TauriButtons.zip) for your initial setup and testing.

## Copy the relevant files from your GameSalad HTML5 project to the gs-tauri folder.

Download your GameSalad HTML5 package and place files as follows:

| GameSalad HTML5     | Tauri Project            | Note                          |
| ------------------- | ------------------------ | ----------------------------- |
| images              | src/assets/images        | Scene loading indicator image |
| js/gse/gs-export.js | src/js/gse/gs-export.js  | Game Engine                   |
| game                | src-tauri/resources/game | Game Project. Differnt so it's not compiled into the binary |
| css                 | src/assets/css           | CSS. Optional since it doesn't change often and are already included |

Note you want to copy the “default” folder from the “game” folder in your HTML5 project into the “game” folder at src-tauri/resources. In my case I end up with this folder path:

```C:\Tauri\gs-tauri\src-tauri\resources\game\default```

When you copy the game folder, that’s the majority of your game. Inside that folder are the images, sounds, all the actor and scene information.

The ones you need to be absolutely certain you copy correctly are the “gs-export.js” file and the “default” folder. The loading image is needed if you included a custom one during publishing. The CSS files rarely change but you should copy them to be safe.

Replace the files in each location if they already exist.

*Also note that if you choose to bundle the resources in the outputted .exe file, you'll be moving the resources file later. That's covered below, though. For now, put things as shown above.*

## Edit the “tauri.conf.json” file.

Before you can do your first test compilation, you need to make an edit to the “tauri.conf” file. If you attempt to test the build now, it will fail. There are other edits you’ll need want to make to this file, but those will be explained and added later. For now, the aim is just to get a first test running.

You’ll find the tauri.conf.json file in the ```gs-tauri/src-tauri``` folder.

Open the tauri.conf.json file in your choice of text editor. Just using Notepad is fine.

Find this section near the bottom of the file:

```
    "bundle": {
      "active": true,
      "targets": "all",
      "identifier": "**com.tauri.dev**",
      "resources": [
        "resources/**"
      ],
```

Edit ```com.tauri.dev``` to something unique to your game. Normally you’ll go with com.companyname.gamename. I use the same as the Bundle ID I used when publishing to the Apple App Store. For example you might change it to ```com.armelline.example```.

Be sure to save when you’re done!

## First test build!

*WARNING: When you perform this step, your game is going to start running in FULLSCREEN mode, with no internal way to quit it. When the time comes to quit, you’ll need to either press the Windows key if you have one, or tab out. Either way you’ll expose the task bar, and you can right-click on the “gs-tauri” item and “Close Window” to close the game. This is why it's good to add an in-game quit button, which you'll do in a later step! Other methods of quitting like from the tab menu should also work.*

Now it's time to run a test build and make sure everything is working right.

If you didn’t close your Git Bash window from earlier, you can keep using that one. If not, open up a new one using the same method as before (being sure to navigate back to the gs-tauri directory).

Type in this command and run it:

```npm run tauri dev```

The first time you run this you’ll see a whole long list of things being compiled.

After a few minutes (how long depends on the size of your game), your game should start running!

Assuming you read the warning above, you should be able to do some tests of your game and then exit it using them method explained. But that’s really not an ideal situation to put a player in! There are two ways you can avoid it. One is by adding a Quit button to your game, which we’ll cover later, and the other is to just start the game in Windowed mode. You can do the latter by editing the ```tauri.conf.json``` file, which is explore below.

*Note: If you’re doing this tutorial with the demo project provided, the buttons WILL NOT work at this stage. That’s coming later!*


## More editing of “tauri.conf”

Now that everything is set up right and you’ve done your first test of your game as a Windows app, let’s make more edits to the tauri.conf and polish things up a bit. I’ll highlight some sections and what you will probably want to edit in each.

**1. Game Name and version - add your game’s name and the version number.**

This is the first version for Windows so I’ve just gone with 1.0.0 for this example.

```
 "package": {
    "productName": “**Your Game Name**",
    "version": "**1.0.0**"
  },
```

**2. Window Settings**

This section needs some things changed and some things added. 

```
   "windows": [
      {
        "title": “Your Game Name",
        "width": 1280,
        "height": 720,
        "fullscreen": true,
        "resizable": true,
        "fileDropEnabled": false,
        "minWidth": 800,
        "minHeight": 600
      }
    ],
```

```title``` = The name displayed on the title bar at the top of the window. You can’t see it right now, but you’ll be able to if you follow these instructions to the end, which is strongly recommended. When you saw the game in the taskbar, you’ll have noticed it was called “gs-tauri” - changing this will change it there too.

```width and height``` = The default window size for your game. I made my game as a 720p project, so my default window size and width = 1280x720.

```fullscreen``` = If this is set to true, the game will launch fullscreen, like you just saw in your first test. If you set it to false, the game will launch windowed. Later in this tutorial we’re going to add a quit button and a way of toggling between windowed and fullscreen, so leave this set to “true”.

```resizable``` = If the game is in “windowed” mode, this toggles if the window can be resized or not. You almost certainly want to allow this. Note that resizing the window doesn’t resize the device size reported in-game - all it does is stretch out the game, maintaining the aspect ratio by adding black bars. There is no universalising needing to be worried about here, and any universalising code you have in your game won't be triggered by resizing the window. The aspect ratio of the Display Size attributes in your project will be what is used.

```fileDropEnabled``` = Your game is secretly just a web page. By default, web pages allow files to be dropped onto them. Though not strictly necessary as nothing will really happen if someone does drop a file on the game window (at least as far as I could find), I prefer to disable the option just to be safe.

```minWidth``` and ```minHeight``` = This is the smallest the game window will be allowed to be resized to. Setting this is entirely optional, but I set mine to 800x600 as playing it in a window smaller than that leads to a bad experience for my game. If you want to enforce a minimum size, and what size that is, is entirely up to you.

There are lots of other window settings you can explore and test. Be a little careful with some, though, as they can lead to an annoying user experience. You can read about them here: [https://v1.tauri.app/v1/api/config/#windowconfig](https://v1.tauri.app/v1/api/config/#windowconfig)

*NOTE: Ensure each entry has a comma at the end except the last one. If you get an error that looks something like this, you’ve probably missed out a comma or added one where it shouldn’t be!*

    Error unable to parse JSON Tauri config file at C:\Tauri\gs-tauri\src-tauri\tauri.conf.json because expected `,` or `}` at line 27 column 9

## Icons and Installer Images!

**1. Icons.**

You’ll have probably noticed that when you test run your game, the icon shown is the default Tauri icon. Let’s fix that!

In the ```gs-tauri``` folder is a folder called ```icons``` - open that up and take a look. The only ones you strictly need to change are the ones mentioned in the ```tauri.conf.json``` file, but since you can generate all of them at once, there's little point in being picky!

Take your 1024x1024 png of your icon and put it in the ```gs-tauri``` folder. Then, making sure you're in the same folder as your image, run this command:

```npm run tauri icon imagename.png```

Replace imagename.png with the actual name of your image. This will generate all the different icons using your provided image. They'll all be put in ```gs-tauri/src-tauri/icons/``` and you shouldn't move them from there.

**2. Installer Images.**

Later in this process, you're going to generate an NSIS installer. You don't strictly have to use it, you can just distribute your .exe file if you want, but it's recommended as it allows for easy installing and uninstalling for the user. There are two places we can customise the look of this installer - the sidebar image and header image. I've included example images in the ```gs-tauri/src-tauri/icons/``` folder which you can use for now if you want to just crack on, but you'll want to add your own custom ones before distributing your game.

Both must be Bitmap (.bmp) images.

The header image needs to be exactly: 150×57 pixels
The sidebar image needs to be exactly: 164×314 pixels.

Note that the installer generation is super fussy about the exact format of the images. I found a depth of 24, type truecolor, bmp3 were necessary. I'm not going to go into details here on how to use it, but I used this ImageMagick command successfully:

```magick /Path/To/File/installer-header.png -depth 24 -background white -flatten -type truecolor bmp3:installer-header.bmp```

Finally, there's the installer icon. I just copied the app icon.

Make sure they're named:


    installer-header.bmp
    installer-sidebar.bmp
    installer.ico

You can use different names if you want, but you'll need to remember to change the names in the edits to ```tauri.conf.json``` we're going to make in a moment.

