/**
 * @fileOverview RequireJS module for JavaScript i18n support.
 * @author <a href="https://github.com/ArnauAregall">Arnau Aregall</a>
 * @version 0.1
 */
define(["i18n/Locales"],
        /**
         * @param {Object} locales
         * @returns {Localizer}
         */
        function(locales) {
            /**
             * The literals loaded from the Literals module.
             * @type {Object}
             * @private
             */
            var _locales = locales;

            /**
             * The default language that will be set if non specified on the constructor either via methods.
             * @type {string}
             * @private
             */
            var _defaultLocale = "en";

            /**
             * @class
             * @constructor
             * @param {string} [locale]
             * @throws {Error} If the default language is not part of the literals object.
             */
            function Localizer(locale)  {
                this._locales = _locales;
                if (locale) {
                    if (this._isLanguageAvailable(locale)) {
                        this._locale = locale; return;
                    } else {
                        throw new Error("Localizer#constructor([langauge]) : provided language '"+locale+"' " +
                            "is not available.\n");
                    }
                }
                this._locale = _defaultLocale;
            };

            /**
             * Getter for the {@link Localizer} locale property.
             * @public
             * @returns {string} the {@link Localizer} locale..
             */
            Localizer.prototype.getLocale = function fn() {
                return this._locale;
            };

            /**
             * Getter for the {@link Localizer} available locales.
             * @public
             * @returns {Object} the available locales.
             */
            Localizer.prototype.getLocales = function fn() {
                return this._locales;
            };

            /**
             * Getter for the literals loaded.
             * @public
             * @returns {Object} The literals loaded.
             */
            Localizer.prototype.getLiterals = function fn() {
                return this._locales[this._locale];
            };

            /**
             * Getter for the browser language.
             * @public
             * @returns {string} The browser language.
             */
            Localizer.prototype.getBrowserLanguage = function fn() {
                var userLang = navigator.language || navigator.userLanguage;
                return userLang;
            };

            /**
             * Setter for the {@link Localizer} language property.
             * @public
             * @param {string} locale
             * @throws {Error} If the language param is not supplied.
             * @throws {Error} If the language to be set is not found in the literals loaded.
             */
            Localizer.prototype.setLocale = function fn(locale) {
                if (!locale) {
                    throw new Error("Localizer#setLocale(locale) : locale param is required.");
                }
                if (this._isLanguageAvailable(locale))  {
                    this._locale = locale;
                } else {
                    throw new Error("Localizer#setLocale(locale) : provided locale '"+locale+"'" +
                        " is not available.");
                }
            };

            /**
             * Detects the browser language preference and sets it as the {@link Localizer} language property.
             * @public
             */
            Localizer.prototype.detectLocalePreference = function fn() {
                var found = false;
                for (var locale in this._locales) {
                    if (this.getBrowserLanguage().indexOf(locale) != -1) {
                        found = locale;
                    }
                }
                if (found != false) {
                    this._locale = found;
                }
            };
            /**
             * Checks if the given locale is in the loaded locales.
             * @param locale
             * @returns {boolean}
             * @private
             */
            Localizer.prototype._isLanguageAvailable = function(locale) {
                return (locale in this._locales);
            };

            /**
             * Validates that all the loaded locales contain the same literal keys.
             * Note this may be used in a development environment only.
             * @public
             */
            Localizer.prototype.validateLiterals = function() {
                var literalsValid = true;
                for (var locale in this._locales) {
                    var literals = this._locales[locale];
                    for (var checkedLocale in this._locales) {
                        var checkedLiterals = this._locales[checkedLocale];
                        for (var checkedLiteral in checkedLiterals) {
                            if (!(checkedLiteral in literals)) {
                                literalsValid = false;
                                console.log("****** Error found when validating language '"+locale+"' : \n" +
                                    "Comparing language '"+locale+"' with '"+checkedLocale+"' : \n" +
                                    "Literal missing in '"+locale+"' : " + checkedLiteral);
                            }
                        }
                    }
                }
                if (literalsValid) {
                    console.log("Literals validated successfully.");
                }
            };

            /**
             * Looks for the literal key in the literals loaded within the current locale.
             * @public
             * @param {String} literalKey The literal key.
             * @returns {String} The value for the literal key or a message indicating that has not been found.
             */
            Localizer.prototype.get = function fn(literalKey)  {
                var literal = this._locales[this._locale][literalKey];
                if (literal) {
                    return literal;
                }
                return "NOTFOUND_" + literalKey + "_locale="+this._locale;
            };

            return Localizer;
    }
);