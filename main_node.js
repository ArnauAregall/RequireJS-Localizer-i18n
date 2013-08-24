var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require
});

requirejs(["i18n/Localizer"], function (Localizer) {
    var localizer = new Localizer();
    localizer.validateLiterals();
    console.log(localizer.get("hello_world"));

    localizer.setLocale("ca");
    console.log(localizer.get("hello_world"));

    localizer.setLocale("es");
    console.log(localizer.get("hello_world"));
});




