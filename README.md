RequireJS-Localizer-i18n
========================

##Overview##

Custom **RequireJS module** for Javascript i18n locale support.

A simple Javascript OOP alternative solution for the official [RequireJS i18n bundle](http://requirejs.org/docs/api.html#i18n "RequireJS i18n Bundle"). Can be used on **web applications** and on **NodeJS**.

It supports **literal keys validation** (all the locales *must* have the same keys!) and **browser language detection**.

## Requirements ##
The only requirement to use this Javascript i18n Localizer is to use **RequireJS**.

* [RequireJS official site](http://requirejs.org/ "RequireJS official site")
* [RequireJS @ Github](https://github.com/jrburke/requirejs "RequireJS @ Github")

## Installation ##
* ###Web app###

  Just place the `i18n` folder at the same level as your `require.js`  file.

* ###NodeJS###
     You can install RequireJS with **npm** :  `npm install requirejs`.

     Then, in your `index.js` file or wherever, you must setup the **RequireJS config** :

        var requirejs = require('requirejs');
        requirejs.config({ nodeRequire: require });

## Locale Setup ##

You should place your locale files into the `/i18n/locales` directory, and name them with the proper locale ID. A locale file is *defined* as a RequireJS *module* object, with properties (*literals*) and values for them.

Should look like the following:

    define({
        "some_key" : "Some Value for the Key"
    });

Then, in the `/i18n/Locales` module, which acts as a *locale data loader*, you may load the locale files as dependencies :

    define(["i18n/locales/en.js"], function(en) {
        en : en
    });

## Usage ##
This module can be used in a Browser Javascript app or with NodeJS (in both scenarios using RequireJS).

 * #### Web app  ####
	* HTML (just include your main loader `script` tag):

           `<script data-main="main_browser" src="require.js"></script>`

	* `main_browser.js` :

            require(["i18n/Localizer"], function (Localizer) {
               var localizer = new Localizer(); // default locale 'en'
    	       localizer.validateLiterals();
   	        console.log(localizer.get("hello_world"));
            });

 * #### NodeJS ####

       * In your `index.js`, with RequireJS ***previously configured*** (in this repo, see `main_node.js`) :

            requirejs(["i18n/Localizer"], function (Localizer) {
               var localizer = new Localizer();
               localizer.validateLiterals();
               console.log(localizer.get("hello_world"));
            });

## Test ##

Comming soon.

## Demo ##

For a **Web App** demo, just check the `index.html` file and open your browser console.

For **NodeJS**, just `node main_node.js`.
