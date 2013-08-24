require.config({ urlArgs: "bust=" + (new Date()).getTime() });

require(["i18n/Localizer"], function (Localizer) {
    var localizer = new Localizer(); // default locale 'en'
    localizer.validateLiterals();
    console.log(localizer.get("hello_world"));

    localizer.setLocale("ca");
    console.log(localizer.get("hello_world"));

    localizer.detectLocalePreference(); // will detect browser language
    console.log(localizer.get("hello_world"));

    localizer.setLocale("de"); // locale 'de' doesn't exists, will throw an Error
});





