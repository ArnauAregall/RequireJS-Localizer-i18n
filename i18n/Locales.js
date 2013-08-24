/**
 * @fileOverview Simple RequireJS module that acts as i18n data loader.
 * @author <a href="https://github.com/ArnauAregall">Arnau Aregall</a>
 * @version 0.1
 */
define(["i18n/locales/en", "i18n/locales/ca", "i18n/locales/es"], function (en, ca, es){
    return {
        "en" : en,
        "ca" : ca,
        "es" : es
    }

});