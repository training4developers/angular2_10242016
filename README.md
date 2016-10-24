# Welcome to Comprehensive Angular 2!

## Instructor

Eric Greene - [http://t4d.io](http://t4d.io) - [LinkedIn](https://www.linkedin.com/in/ericwgreene)

## Schedule

Class:
- Monday - Friday: 8:30am to 4:30pm (end at 4pm on Friday)

Breaks:
- Morning: 10:15am to 10:30am
- Lunch: Noon to 1pm
- Afternoon: 2:45pm to 3:00pm

## Course Outline

	TypeScript & JavaScript topics will be included as needed into the Angular 2 content

- Day 1 - Introduction to Components, Pipes, Event Handling, Directives, Services
- Day 2 - Form Validation, Custom Validators, Custom Pipes, Service Injection
- Day 3 - Http Service & REST Services, Observables/Promises, Web Sockets, Redis
- Day 4 - Routing, Composing Components, Structural and Attribute Directives, Unit Testing
- Day 5 - Project Day

## Links

### Instructor's Resources

- [Accelebrate, Inc.](https://www.accelebrate.com/)
- [Eric's Blog](http://t4d.io/)
- [WintellectNOW](https://www.wintellectnow.com/Home/Instructor?instructorId=EricGreene) - Special Offer Code: GREENE-2016
- [Microsoft Virtual Academy](https://mva.microsoft.com/search/SearchResults.aspx#!q=Eric%20Greene&lang=1033)
- [JavaScript Blog Posts](https://www.accelebrate.com/blog/?s=Greene)

### Other Resources

- [Accelebrate's Blog](https://www.accelebrate.com/blog/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)
- [JavaScript Air Podcast](http://javascriptair.podbean.com/)

## Overview

This project configuration is adapted from the [Angular 2 Webpack Starter project](https://angular.io/docs/ts/latest/guide/webpack.html).

## Application Setup

Step 1. Install Node.js version 6 or higher. To install Node.js click [here](https://nodejs.org).

Step 2. Download this repository from [here](https://github.com/training4developers/angular2_10242016/archive/master.zip). Extract the zip file to a working folder on your system.

Step 3. Open a terminal window, change to the folder where you extracted the zip file. You should see a **package.json** file in the folder.

On Windows, the terminal is called "Node.js Command Prompt". This will command prompt will contain the proper paths for Node.js development. DO NOT RUN the Node.js program. Click the icon named "Node.js Command Prompt". For Mac users, the Mac terminal is all you need.

Step 4. From the terminal, run the following command:

```bash
$ npm i && npm start
```

It could take a few minutes for this command to complete. If you have connection issues due to a proxy server, please edit the **.npmrc** and **.typingsrc** files per the instructions in those files. Then re-run the command above.

This set has been completed successfully when you receive the following message:

```bash
Hash: 9c2fcd4942f7122f9a69
[0] Version: webpack 1.13.2
[0] Time: 11132ms
[0]        Asset       Size  Chunks             Chunk Names
[0]       app.js    85.9 kB       0  [emitted]  app
[0] polyfills.js     745 kB       1  [emitted]  polyfills
[0]    vendor.js    7.15 MB       2  [emitted]  vendor
[0]   index.html  507 bytes          [emitted]  
[0]     + 657 hidden modules
[0] Child html-webpack-plugin for "index.html":
[0]         + 3 hidden modules
```

This terminal window is now running the web server, a second terminal window will need to be opened to run additional terminal commands.

Step 5. Open a web browser, and navigate to [http://localhost:3000](http://localhost:3000).  The Angular 2 web application should load and be usable.

**To Modify the Web Application**

Step 6. Open your favorite text editor (such as [Atom](https://atom.io/) or [Visual Studio Code](https://code.visualstudio.com)), and modify the files in the **src** folder. When file changes are saved, **webpack** will automatically transpile and bundle the application code and assets, and deploy it to the **dist** folder. To see the changes, reload your web browser.

Visual Studio Code supports TypeScript out of the box. Atom requires the 	**atom-typescript** package to be installed. To install it from the menu bar, go to Packages -> Settings View -> Install Packages/Themes. Search for **atom-typescript**, then click **Install**. Sometimes Atom will not be able to download the package because of proxy settings. To resolve this run the following commands from a terminal window, replacing the localhost URL with your proxy URL setting:

```bash
$ apm config set proxy "http://localhost:8080"

$ apm config set https_proxy "http://localhost:8080"

$ apm config set strict-ssl false
```

Restart Atom, then re-attempt to install the **atom-typescript** package again.

## Running Unit Tests

From a terminal run the following command:

```bash
$ npm test
```

The results of the unit tests and code coverage report will be displayed in the terminal window.

To view the HTML version of the code coverage report, open the **index.html** in the **reports/coverage/browser-name** folder with a web browser.

## NPM Scripts Command Reference

From a terminal, in the root project folder (where the **package.json** file exists), the following commands can be executed to perform various project development tasks.

- **npm start** - removes the dist folder, builds and deploys the web app, and starts the web app and the rest app
- **npm test** - starts karma to run unit tests
- **npm run clean** - removes the **dist** folder
- **npm run typings** - installs TypeScript type definitions as specified in the **typings.json** file
- **npm run webpack** - runs webpack in watch mode so web app file changes are automatically processed, and deployed to the **dist** folder
- **npm run webpack-once** - runs webpack once to process web app files, and deploys them to the **dist** folder
- **npm run web** - starts the web server
- **npm run rest** - starts the rest server

To learn more about the Angular 2/WebPack/TypeScript/Karma configuration, click [here](https://github.com/training4developers/ng2-widgets-app/tree/master/config).

## Useful Resources

- [TypeScript Coding Guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines)
- [Angular 2 Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html)
- [Angular 2 Cheat Sheet](https://angular.io/docs/ts/latest/guide/cheatsheet.html)
- [Angular 2 API](https://angular.io/docs/ts/latest/api/)
- [Angular Quick Start Project](https://angular.io/docs/ts/latest/quickstart.html)
- [Angular Webpack Project](https://angular.io/docs/ts/latest/guide/webpack.html)
