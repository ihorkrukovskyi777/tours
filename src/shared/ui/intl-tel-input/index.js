var X = Object.create;
var V = Object.defineProperty;
var tt = Object.getOwnPropertyDescriptor;
var et = Object.getOwnPropertyNames;
var it = Object.getPrototypeOf, nt = Object.prototype.hasOwnProperty;
var ot = (c, p) => () => (p || c((p = {exports: {}}).exports, p), p.exports);
var rt = (c, p, g, m) => {
    if (p && typeof p == "object" || typeof p == "function") for (let _ of et(p)) !nt.call(c, _) && _ !== g && V(c, _, {
        get: () => p[_],
        enumerable: !(m = tt(p, _)) || m.enumerable
    });
    return c
};
var at = (c, p, g) => (g = c != null ? X(it(c)) : {}, rt(p || !c || !c.__esModule ? V(g, "default", {
    value: c,
    enumerable: !0
}) : g, c));
var H = ot((dt, N) => {
    (function (c) {
        typeof N == "object" && N.exports ? N.exports = c() : window.intlTelInput = c()
    })(function (c) {
        "use strict";
        return function () {
            for (var p = [["Afghanistan", "af", "93"], ["Albania", "al", "355"], ["Algeria", "dz", "213"], ["American Samoa", "as", "1", 5, ["684"]], ["Andorra", "ad", "376"], ["Angola", "ao", "244"], ["Anguilla", "ai", "1", 6, ["264"]], ["Antigua & Barbuda", "ag", "1", 7, ["268"]], ["Argentina", "ar", "54"], ["Armenia", "am", "374"], ["Aruba", "aw", "297"], ["Ascension Island", "ac", "247"], ["Australia", "au", "61", 0], ["Austria", "at", "43"], ["Azerbaijan", "az", "994"], ["Bahamas", "bs", "1", 8, ["242"]], ["Bahrain", "bh", "973"], ["Bangladesh", "bd", "880"], ["Barbados", "bb", "1", 9, ["246"]], ["Belarus", "by", "375"], ["Belgium", "be", "32"], ["Belize", "bz", "501"], ["Benin", "bj", "229"], ["Bermuda", "bm", "1", 10, ["441"]], ["Bhutan", "bt", "975"], ["Bolivia", "bo", "591"], ["Bosnia & Herzegovina", "ba", "387"], ["Botswana", "bw", "267"], ["Brazil", "br", "55"], ["British Indian Ocean Territory", "io", "246"], ["British Virgin Islands", "vg", "1", 11, ["284"]], ["Brunei", "bn", "673"], ["Bulgaria", "bg", "359"], ["Burkina Faso", "bf", "226"], ["Burundi", "bi", "257"], ["Cambodia", "kh", "855"], ["Cameroon", "cm", "237"], ["Canada", "ca", "1", 1, ["204", "226", "236", "249", "250", "263", "289", "306", "343", "354", "365", "367", "368", "382", "387", "403", "416", "418", "428", "431", "437", "438", "450", "584", "468", "474", "506", "514", "519", "548", "579", "581", "584", "587", "604", "613", "639", "647", "672", "683", "705", "709", "742", "753", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905"]], ["Cape Verde", "cv", "238"], ["Caribbean Netherlands", "bq", "599", 1, ["3", "4", "7"]], ["Cayman Islands", "ky", "1", 12, ["345"]], ["Central African Republic", "cf", "236"], ["Chad", "td", "235"], ["Chile", "cl", "56"], ["China", "cn", "86"], ["Christmas Island", "cx", "61", 2, ["89164"]], ["Cocos (Keeling) Islands", "cc", "61", 1, ["89162"]], ["Colombia", "co", "57"], ["Comoros", "km", "269"], ["Congo - Brazzaville", "cg", "242"], ["Congo - Kinshasa", "cd", "243"], ["Cook Islands", "ck", "682"], ["Costa Rica", "cr", "506"], ["C\xF4te d\u2019Ivoire", "ci", "225"], ["Croatia", "hr", "385"], ["Cuba", "cu", "53"], ["Cura\xE7ao", "cw", "599", 0], ["Cyprus", "cy", "357"], ["Czech Republic", "cz", "420"], ["Denmark", "dk", "45"], ["Djibouti", "dj", "253"], ["Dominica", "dm", "1", 13, ["767"]], ["Dominican Republic", "do", "1", 2, ["809", "829", "849"]], ["Ecuador", "ec", "593"], ["Egypt", "eg", "20"], ["El Salvador", "sv", "503"], ["Equatorial Guinea", "gq", "240"], ["Eritrea", "er", "291"], ["Estonia", "ee", "372"], ["Eswatini", "sz", "268"], ["Ethiopia", "et", "251"], ["Falkland Islands", "fk", "500"], ["Faroe Islands", "fo", "298"], ["Fiji", "fj", "679"], ["Finland", "fi", "358", 0], ["France", "fr", "33"], ["French Guiana", "gf", "594"], ["French Polynesia", "pf", "689"], ["Gabon", "ga", "241"], ["Gambia", "gm", "220"], ["Georgia", "ge", "995"], ["Germany", "de", "49"], ["Ghana", "gh", "233"], ["Gibraltar", "gi", "350"], ["Greece", "gr", "30"], ["Greenland", "gl", "299"], ["Grenada", "gd", "1", 14, ["473"]], ["Guadeloupe", "gp", "590", 0], ["Guam", "gu", "1", 15, ["671"]], ["Guatemala", "gt", "502"], ["Guernsey", "gg", "44", 1, ["1481", "7781", "7839", "7911"]], ["Guinea", "gn", "224"], ["Guinea-Bissau", "gw", "245"], ["Guyana", "gy", "592"], ["Haiti", "ht", "509"], ["Honduras", "hn", "504"], ["Hong Kong", "hk", "852"], ["Hungary", "hu", "36"], ["Iceland", "is", "354"], ["India", "in", "91"], ["Indonesia", "id", "62"], ["Iran", "ir", "98"], ["Iraq", "iq", "964"], ["Ireland", "ie", "353"], ["Isle of Man", "im", "44", 2, ["1624", "74576", "7524", "7924", "7624"]], ["Israel", "il", "972"], ["Italy", "it", "39", 0], ["Jamaica", "jm", "1", 4, ["876", "658"]], ["Japan", "jp", "81"], ["Jersey", "je", "44", 3, ["1534", "7509", "7700", "7797", "7829", "7937"]], ["Jordan", "jo", "962"], ["Kazakhstan", "kz", "7", 1, ["33", "7"]], ["Kenya", "ke", "254"], ["Kiribati", "ki", "686"], ["Kosovo", "xk", "383"], ["Kuwait", "kw", "965"], ["Kyrgyzstan", "kg", "996"], ["Laos", "la", "856"], ["Latvia", "lv", "371"], ["Lebanon", "lb", "961"], ["Lesotho", "ls", "266"], ["Liberia", "lr", "231"], ["Libya", "ly", "218"], ["Liechtenstein", "li", "423"], ["Lithuania", "lt", "370"], ["Luxembourg", "lu", "352"], ["Macau", "mo", "853"], ["Madagascar", "mg", "261"], ["Malawi", "mw", "265"], ["Malaysia", "my", "60"], ["Maldives", "mv", "960"], ["Mali", "ml", "223"], ["Malta", "mt", "356"], ["Marshall Islands", "mh", "692"], ["Martinique", "mq", "596"], ["Mauritania", "mr", "222"], ["Mauritius", "mu", "230"], ["Mayotte", "yt", "262", 1, ["269", "639"]], ["Mexico", "mx", "52"], ["Micronesia", "fm", "691"], ["Moldova", "md", "373"], ["Monaco", "mc", "377"], ["Mongolia", "mn", "976"], ["Montenegro", "me", "382"], ["Montserrat", "ms", "1", 16, ["664"]], ["Morocco", "ma", "212", 0], ["Mozambique", "mz", "258"], ["Myanmar (Burma)", "mm", "95"], ["Namibia", "na", "264"], ["Nauru", "nr", "674"], ["Nepal", "np", "977"], ["Netherlands", "nl", "31"], ["New Caledonia", "nc", "687"], ["New Zealand", "nz", "64"], ["Nicaragua", "ni", "505"], ["Niger", "ne", "227"], ["Nigeria", "ng", "234"], ["Niue", "nu", "683"], ["Norfolk Island", "nf", "672"], ["North Korea", "kp", "850"], ["North Macedonia", "mk", "389"], ["Northern Mariana Islands", "mp", "1", 17, ["670"]], ["Norway", "no", "47", 0], ["Oman", "om", "968"], ["Pakistan", "pk", "92"], ["Palau", "pw", "680"], ["Palestine", "ps", "970"], ["Panama", "pa", "507"], ["Papua New Guinea", "pg", "675"], ["Paraguay", "py", "595"], ["Peru", "pe", "51"], ["Philippines", "ph", "63"], ["Poland", "pl", "48"], ["Portugal", "pt", "351"], ["Puerto Rico", "pr", "1", 3, ["787", "939"]], ["Qatar", "qa", "974"], ["R\xE9union", "re", "262", 0], ["Romania", "ro", "40"], ["Russia", "ru", "7", 0], ["Rwanda", "rw", "250"], ["Samoa", "ws", "685"], ["San Marino", "sm", "378"], ["S\xE3o Tom\xE9 & Pr\xEDncipe", "st", "239"], ["Saudi Arabia", "sa", "966"], ["Senegal", "sn", "221"], ["Serbia", "rs", "381"], ["Seychelles", "sc", "248"], ["Sierra Leone", "sl", "232"], ["Singapore", "sg", "65"], ["Sint Maarten", "sx", "1", 21, ["721"]], ["Slovakia", "sk", "421"], ["Slovenia", "si", "386"], ["Solomon Islands", "sb", "677"], ["Somalia", "so", "252"], ["South Africa", "za", "27"], ["South Korea", "kr", "82"], ["South Sudan", "ss", "211"], ["Spain", "es", "34"], ["Sri Lanka", "lk", "94"], ["St Barth\xE9lemy", "bl", "590", 1], ["St Helena", "sh", "290"], ["St Kitts & Nevis", "kn", "1", 18, ["869"]], ["St Lucia", "lc", "1", 19, ["758"]], ["St Martin", "mf", "590", 2], ["St Pierre & Miquelon", "pm", "508"], ["St Vincent & Grenadines", "vc", "1", 20, ["784"]], ["Sudan", "sd", "249"], ["Suriname", "sr", "597"], ["Svalbard & Jan Mayen", "sj", "47", 1, ["79"]], ["Sweden", "se", "46"], ["Switzerland", "ch", "41"], ["Syria", "sy", "963"], ["Taiwan", "tw", "886"], ["Tajikistan", "tj", "992"], ["Tanzania", "tz", "255"], ["Thailand", "th", "66"], ["Timor-Leste", "tl", "670"], ["Togo", "tg", "228"], ["Tokelau", "tk", "690"], ["Tonga", "to", "676"], ["Trinidad & Tobago", "tt", "1", 22, ["868"]], ["Tunisia", "tn", "216"], ["Turkey", "tr", "90"], ["Turkmenistan", "tm", "993"], ["Turks & Caicos Islands", "tc", "1", 23, ["649"]], ["Tuvalu", "tv", "688"], ["Uganda", "ug", "256"], ["Ukraine", "ua", "380"], ["United Arab Emirates", "ae", "971"], ["United Kingdom", "gb", "44", 0], ["United States", "us", "1", 0], ["Uruguay", "uy", "598"], ["US Virgin Islands", "vi", "1", 24, ["340"]], ["Uzbekistan", "uz", "998"], ["Vanuatu", "vu", "678"], ["Vatican City", "va", "39", 1, ["06698"]], ["Venezuela", "ve", "58"], ["Vietnam", "vn", "84"], ["Wallis & Futuna", "wf", "681"], ["Western Sahara", "eh", "212", 1, ["5288", "5289"]], ["Yemen", "ye", "967"], ["Zambia", "zm", "260"], ["Zimbabwe", "zw", "263"], ["\xC5land Islands", "ax", "358", 1, ["18"]]], g = 0; g < p.length; g++) {
                var m = p[g];
                p[g] = {
                    name: m[0],
                    iso2: m[1],
                    dialCode: m[2],
                    priority: m[3] || 0,
                    areaCodes: m[4] || null,
                    nodeById: {}
                }
            }

            function _(a) {
                for (var n = 1; n < arguments.length; n++) {
                    var t = arguments[n] != null ? Object(arguments[n]) : {}, e = Object.keys(t);
                    typeof Object.getOwnPropertySymbols == "function" && e.push.apply(e, Object.getOwnPropertySymbols(t).filter(function (i) {
                        return Object.getOwnPropertyDescriptor(t, i).enumerable
                    })), e.forEach(function (i) {
                        P(a, i, t[i])
                    })
                }
                return a
            }

            function P(a, n, t) {
                return n = E(n), n in a ? Object.defineProperty(a, n, {
                    value: t,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : a[n] = t, a
            }

            function M(a, n) {
                return D(a) || U(a, n) || O(a, n) || x()
            }

            function x() {
                throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)
            }

            function O(a, n) {
                if (a) {
                    if (typeof a == "string") return A(a, n);
                    var t = Object.prototype.toString.call(a).slice(8, -1);
                    if (t === "Object" && a.constructor && (t = a.constructor.name), t === "Map" || t === "Set") return Array.from(a);
                    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return A(a, n)
                }
            }

            function A(a, n) {
                (n == null || n > a.length) && (n = a.length);
                for (var t = 0, e = new Array(n); t < n; t++) e[t] = a[t];
                return e
            }

            function U(a, n) {
                var t = a == null ? null : typeof Symbol < "u" && a[Symbol.iterator] || a["@@iterator"];
                if (t != null) {
                    var e, i, o, r, s = [], l = !0, u = !1;
                    try {
                        if (o = (t = t.call(a)).next, n === 0) {
                            if (Object(t) !== t) return;
                            l = !1
                        } else for (; !(l = (e = o.call(t)).done) && (s.push(e.value), s.length !== n); l = !0) ;
                    } catch (h) {
                        u = !0, i = h
                    } finally {
                        try {
                            if (!l && t.return != null && (r = t.return(), Object(r) !== r)) return
                        } finally {
                            if (u) throw i
                        }
                    }
                    return s
                }
            }

            function D(a) {
                if (Array.isArray(a)) return a
            }

            function C(a, n) {
                if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function")
            }

            function b(a, n) {
                for (var t = 0; t < n.length; t++) {
                    var e = n[t];
                    e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(a, E(e.key), e)
                }
            }

            function w(a, n, t) {
                return n && b(a.prototype, n), t && b(a, t), Object.defineProperty(a, "prototype", {writable: !1}), a
            }

            function E(a) {
                var n = B(a, "string");
                return typeof n == "symbol" ? n : String(n)
            }

            function B(a, n) {
                if (typeof a != "object" || a === null) return a;
                var t = a[Symbol.toPrimitive];
                if (t !== c) {
                    var e = t.call(a, n || "default");
                    if (typeof e != "object") return e;
                    throw new TypeError("@@toPrimitive must return a primitive value.")
                }
                return (n === "string" ? String : Number)(a)
            }

            var S = {
                getInstance: function (n) {
                    var t = n.getAttribute("data-intl-tel-input-id");
                    return window.intlTelInputGlobals.instances[t]
                }, instances: {}, documentReady: function () {
                    return document.readyState === "complete"
                }
            };
            typeof window == "object" && (window.intlTelInputGlobals = S);
            var Y = 0, K = {
                    allowDropdown: !0,
                    autoInsertDialCode: !1,
                    autoPlaceholder: "polite",
                    countrySearch: !0,
                    containerClass: "",
                    customPlaceholder: null,
                    defaultToFirstCountry: !0,
                    dropdownContainer: null,
                    excludeCountries: [],
                    fixDropdownWidth: !0,
                    formatAsYouType: !0,
                    formatOnDisplay: !0,
                    geoIpLookup: null,
                    hiddenInput: null,
                    i18n: {},
                    initialCountry: "",
                    nationalMode: !0,
                    onlyCountries: [],
                    placeholderNumberType: "MOBILE",
                    preferredCountries: [],
                    showFlags: !0,
                    showSelectedDialCode: !1,
                    useFullscreenPopup: typeof navigator < "u" && typeof window < "u" ? /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 500 : !1,
                    utilsScript: ""
                },
                J = ["800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889"],
                k = function (n) {
                    var t = window.intlTelInputGlobals.instances;
                    Object.values(t).forEach(function (e) {
                        return e[n]()
                    })
                }, Z = function () {
                    function a(n) {
                        var t = arguments.length > 1 && arguments[1] !== c ? arguments[1] : {};
                        C(this, a), this.id = Y++, this.telInput = n, this.activeItem = null, this.highlightedItem = null, this.options = Object.assign({}, K, t), this.hadInitialPlaceholder = !!n.getAttribute("placeholder")
                    }

                    return w(a, [{
                        key: "_init", value: function () {
                            var t = this;
                            this.options.useFullscreenPopup && (this.options.fixDropdownWidth = !1), this.options.countrySearch && !this.options.useFullscreenPopup && (this.options.fixDropdownWidth = !0), this.options.nationalMode && (this.options.autoInsertDialCode = !1), this.options.showSelectedDialCode && (this.options.autoInsertDialCode = !1);
                            var e = this.options.allowDropdown && !this.options.showSelectedDialCode;
                            if (!this.options.showFlags && e && (this.options.showFlags = !0), this.options.useFullscreenPopup && !this.options.dropdownContainer && (this.options.dropdownContainer = document.body), this.isRTL = !!this.telInput.closest("[dir=rtl]"), typeof Promise < "u") {
                                var i = new Promise(function (r, s) {
                                    t.resolveAutoCountryPromise = r, t.rejectAutoCountryPromise = s
                                }), o = new Promise(function (r, s) {
                                    t.resolveUtilsScriptPromise = r, t.rejectUtilsScriptPromise = s
                                });
                                this.promise = Promise.all([i, o])
                            } else this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function () {
                            }, this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function () {
                            };
                            this.selectedCountryData = {}, this._processCountryData(), this._generateMarkup(), this._setInitialState(), this._initListeners(), this._initRequests()
                        }
                    }, {
                        key: "_processCountryData", value: function () {
                            this._processAllCountries(), this._processDialCodes(), this._processPreferredCountries(), this._translateCountryNames(), (this.options.onlyCountries.length || this.options.i18n) && this.countries.sort(this._countryNameSort)
                        }
                    }, {
                        key: "_addToDialCodeMap", value: function (t, e, i) {
                            e.length > this.dialCodeMaxLen && (this.dialCodeMaxLen = e.length), this.dialCodeToIso2Map.hasOwnProperty(e) || (this.dialCodeToIso2Map[e] = []);
                            for (var o = 0; o < this.dialCodeToIso2Map[e].length; o++) if (this.dialCodeToIso2Map[e][o] === t) return;
                            var r = i !== c ? i : this.dialCodeToIso2Map[e].length;
                            this.dialCodeToIso2Map[e][r] = t
                        }
                    }, {
                        key: "_processAllCountries", value: function () {
                            if (this.options.onlyCountries.length) {
                                var t = this.options.onlyCountries.map(function (i) {
                                    return i.toLowerCase()
                                });
                                this.countries = p.filter(function (i) {
                                    return t.indexOf(i.iso2) > -1
                                })
                            } else if (this.options.excludeCountries.length) {
                                var e = this.options.excludeCountries.map(function (i) {
                                    return i.toLowerCase()
                                });
                                this.countries = p.filter(function (i) {
                                    return e.indexOf(i.iso2) === -1
                                })
                            } else this.countries = p
                        }
                    }, {
                        key: "_translateCountryNames", value: function () {
                            for (var t = 0; t < this.countries.length; t++) {
                                var e = this.countries[t].iso2.toLowerCase();
                                this.options.i18n.hasOwnProperty(e) && (this.countries[t].name = this.options.i18n[e])
                            }
                        }
                    }, {
                        key: "_countryNameSort", value: function (t, e) {
                            return t.name.localeCompare(e.name)
                        }
                    }, {
                        key: "_processDialCodes", value: function () {
                            this.dialCodes = {}, this.dialCodeMaxLen = 0, this.dialCodeToIso2Map = {};
                            for (var t = 0; t < this.countries.length; t++) {
                                var e = this.countries[t];
                                this.dialCodes[e.dialCode] || (this.dialCodes[e.dialCode] = !0), this._addToDialCodeMap(e.iso2, e.dialCode, e.priority)
                            }
                            for (var i = 0; i < this.countries.length; i++) {
                                var o = this.countries[i];
                                if (o.areaCodes) for (var r = this.dialCodeToIso2Map[o.dialCode][0], s = 0; s < o.areaCodes.length; s++) {
                                    for (var l = o.areaCodes[s], u = 1; u < l.length; u++) {
                                        var h = o.dialCode + l.substr(0, u);
                                        this._addToDialCodeMap(r, h), this._addToDialCodeMap(o.iso2, h)
                                    }
                                    this._addToDialCodeMap(o.iso2, o.dialCode + l)
                                }
                            }
                        }
                    }, {
                        key: "_processPreferredCountries", value: function () {
                            this.preferredCountries = [];
                            for (var t = 0; t < this.options.preferredCountries.length; t++) {
                                var e = this.options.preferredCountries[t].toLowerCase(), i = this._getCountryData(e, !0);
                                i && this.preferredCountries.push(i)
                            }
                        }
                    }, {
                        key: "_createEl", value: function (t, e, i) {
                            var o = document.createElement(t);
                            return e && Object.entries(e).forEach(function (r) {
                                var s = M(r, 2), l = s[0], u = s[1];
                                return o.setAttribute(l, u)
                            }), i && i.appendChild(o), o
                        }
                    }, {
                        key: "_generateMarkup", value: function () {
                            this.telInput.classList.add("iti__tel-input"), !this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete")) && this.telInput.setAttribute("autocomplete", "off");
                            var t = this.options, e = t.allowDropdown, i = t.showSelectedDialCode, o = t.showFlags,
                                r = t.containerClass, s = t.hiddenInput, l = t.dropdownContainer, u = t.fixDropdownWidth,
                                h = t.useFullscreenPopup, y = t.countrySearch, v = "iti";
                            e && (v += " iti--allow-dropdown"), i && (v += " iti--show-selected-dial-code"), o && (v += " iti--show-flags"), r && (v += " ".concat(r)), h || (v += " iti--inline-dropdown");
                            var f = this._createEl("div", {class: v});
                            this.telInput.parentNode.insertBefore(f, this.telInput);
                            var I = e || o || i;
                            if (I && (this.flagsContainer = this._createEl("div", {class: "iti__flag-container"}, f)), f.appendChild(this.telInput), I && (this.selectedFlag = this._createEl("div", _({class: "iti__selected-flag"}, e && {
                                role: "combobox",
                                "aria-haspopup": "listbox",
                                "aria-controls": "iti-".concat(this.id, "__country-listbox"),
                                "aria-expanded": "false",
                                "aria-label": this.options.i18n.selectedCountryAriaLabel || "Selected country"
                            }), this.flagsContainer)), o && (this.selectedFlagInner = this._createEl("div", {class: "iti__flag"}, this.selectedFlag)), this.selectedFlag && this.telInput.disabled && this.selectedFlag.setAttribute("aria-disabled", "true"), i && (this.selectedDialCode = this._createEl("div", {class: "iti__selected-dial-code"}, this.selectedFlag)), e) {
                                this.telInput.disabled || this.selectedFlag.setAttribute("tabindex", "0"), this.dropdownArrow = this._createEl("div", {class: "iti__arrow"}, this.selectedFlag);
                                var $ = u ? "" : "iti--flexible-dropdown-width";
                                if (this.dropdownContent = this._createEl("div", {class: "iti__dropdown-content iti__hide ".concat($)}), y && (this.searchInput = this._createEl("input", {
                                    type: "text",
                                    class: "iti__search-input",
                                    placeholder: this.options.i18n.searchPlaceholder || "Search"
                                }, this.dropdownContent)), this.countryList = this._createEl("ul", {
                                    class: "iti__country-list",
                                    id: "iti-".concat(this.id, "__country-listbox"),
                                    role: "listbox",
                                    "aria-label": this.options.i18n.countryListAriaLabel || "List of countries"
                                }, this.dropdownContent), this.preferredCountries.length && !y && (this._appendListItems(this.preferredCountries, "iti__preferred", !0), this._createEl("li", {
                                    class: "iti__divider",
                                    "aria-hidden": "true"
                                }, this.countryList)), this._appendListItems(this.countries, "iti__standard"), l) {
                                    var F = "iti iti--container";
                                    h ? F += " iti--fullscreen-popup" : F += " iti--inline-dropdown", y && (F += " iti--country-search"), this.dropdown = this._createEl("div", {class: F}), this.dropdown.appendChild(this.dropdownContent)
                                } else this.flagsContainer.appendChild(this.dropdownContent)
                            }
                            if (s) {
                                var j = this.telInput.getAttribute("name"), T = s(j),
                                    Q = T !== null && typeof T == "object", L, G;
                                if (Q ? (L = T.phone || j, G = T.country || "".concat(L, "_country")) : (L = T || j, G = "".concat(L, "_country")), !L) return;
                                this.hiddenInput = this._createEl("input", {
                                    type: "hidden",
                                    name: L
                                }), this.hiddenInputCountry = this._createEl("input", {
                                    type: "hidden",
                                    name: G
                                }), f.appendChild(this.hiddenInput), f.appendChild(this.hiddenInputCountry)
                            }
                        }
                    }, {
                        key: "_appendListItems", value: function (t, e, i) {
                            for (var o = 0; o < t.length; o++) {
                                var r = t[o], s = i ? "-preferred" : "", l = this._createEl("li", {
                                    id: "iti-".concat(this.id, "__item-").concat(r.iso2).concat(s),
                                    class: "iti__country ".concat(e),
                                    tabindex: "-1",
                                    role: "option",
                                    "data-dial-code": r.dialCode,
                                    "data-country-code": r.iso2,
                                    "aria-selected": "false"
                                }, this.countryList);
                                r.nodeById[this.id] = l;
                                var u = "";
                                this.options.showFlags && (u += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(r.iso2, "'></div></div>")), u += "<span class='iti__country-name'>".concat(r.name, "</span>"), u += "<span class='iti__dial-code'>+".concat(r.dialCode, "</span>"), l.insertAdjacentHTML("beforeend", u)
                            }
                        }
                    }, {
                        key: "_setInitialState", value: function () {
                            var t = arguments.length > 0 && arguments[0] !== c ? arguments[0] : !1,
                                e = this.telInput.getAttribute("value"), i = this.telInput.value,
                                o = e && e.charAt(0) === "+" && (!i || i.charAt(0) !== "+"), r = o ? e : i,
                                s = this._getDialCode(r), l = this._isRegionlessNanp(r), u = this.options,
                                h = u.initialCountry, y = u.autoInsertDialCode, v = u.defaultToFirstCountry;
                            if (s && !l) this._updateFlagFromNumber(r); else if (h !== "auto" || t) {
                                var f = h ? h.toLowerCase() : "", I = f && this._getCountryData(f, !0);
                                I ? this._setFlag(f) : s && l ? this._setFlag("us") : v && !r ? (this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2, this._setFlag(this.defaultCountry)) : this._setFlag(), !r && y && (this.telInput.value = "+".concat(this.selectedCountryData.dialCode))
                            }
                            r && this._updateValFromNumber(r)
                        }
                    }, {
                        key: "_initListeners", value: function () {
                            this._initKeyListeners(), this.options.autoInsertDialCode && this._initBlurListeners(), this.options.allowDropdown && this._initDropdownListeners(), this.hiddenInput && this._initHiddenInputListener()
                        }
                    }, {
                        key: "_initHiddenInputListener", value: function () {
                            var t = this;
                            this._handleHiddenInputSubmit = function () {
                                t.hiddenInput.value = t.getNumber(), t.hiddenInputCountry.value = t.getSelectedCountryData().iso2
                            }, this.telInput.form && this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit)
                        }
                    }, {
                        key: "_initDropdownListeners", value: function () {
                            var t = this;
                            this._handleLabelClick = function (i) {
                                t.dropdownContent.classList.contains("iti__hide") ? t.telInput.focus() : i.preventDefault()
                            };
                            var e = this.telInput.closest("label");
                            e && e.addEventListener("click", this._handleLabelClick), this._handleClickSelectedFlag = function () {
                                t.dropdownContent.classList.contains("iti__hide") && !t.telInput.disabled && !t.telInput.readOnly && t._showDropdown()
                            }, this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag), this._handleFlagsContainerKeydown = function (i) {
                                var o = t.dropdownContent.classList.contains("iti__hide");
                                o && ["ArrowUp", "ArrowDown", " ", "Enter"].includes(i.key) && (i.preventDefault(), i.stopPropagation(), t._showDropdown()), i.key === "Tab" && t._closeDropdown()
                            }, this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown)
                        }
                    }, {
                        key: "_initRequests", value: function () {
                            var t = this;
                            this.options.utilsScript && !window.intlTelInputUtils ? window.intlTelInputGlobals.documentReady() ? window.intlTelInputGlobals.loadUtils(this.options.utilsScript) : window.addEventListener("load", function () {
                                window.intlTelInputGlobals.loadUtils(t.options.utilsScript)
                            }) : this.resolveUtilsScriptPromise(), this.options.initialCountry === "auto" && !this.selectedCountryData.iso2 ? this._loadAutoCountry() : this.resolveAutoCountryPromise()
                        }
                    }, {
                        key: "_loadAutoCountry", value: function () {
                            var t = this;
                            window.intlTelInputGlobals.autoCountry ? this.handleAutoCountry() : window.intlTelInputGlobals.startedLoadingAutoCountry || (window.intlTelInputGlobals.startedLoadingAutoCountry = !0, typeof this.options.geoIpLookup == "function" && this.options.geoIpLookup(function () {
                                var e = arguments.length > 0 && arguments[0] !== c ? arguments[0] : "", i = e.toLowerCase(),
                                    o = i && t._getCountryData(i, !0);
                                o ? (window.intlTelInputGlobals.autoCountry = i, setTimeout(function () {
                                    return k("handleAutoCountry")
                                })) : (t._setInitialState(!0), k("rejectAutoCountryPromise"))
                            }, function () {
                                return k("rejectAutoCountryPromise")
                            }))
                        }
                    }, {
                        key: "_initKeyListeners", value: function () {
                            var t = this, e = !1;
                            this._handleKeyEvent = function (i) {
                                if (t._updateFlagFromNumber(t.telInput.value) && t._triggerCountryChange(), i && i.data && /[^+0-9]/.test(i.data) ? e = !0 : /[^+0-9]/.test(t.telInput.value) || (e = !1), t.options.formatAsYouType && !e) {
                                    var o = t.telInput.selectionStart, r = t.telInput.value.substring(0, o),
                                        s = r.replace(/[^+0-9]/g, "").length,
                                        l = i && i.inputType === "deleteContentForward", u = t._formatNumberAsYouType(),
                                        h = t._translateCursorPosition(s, u, o, l);
                                    t.telInput.value = u, t.telInput.setSelectionRange(h, h)
                                }
                            }, this.telInput.addEventListener("input", this._handleKeyEvent), this._handleClipboardEvent = function () {
                                setTimeout(t._handleKeyEvent)
                            }, this.telInput.addEventListener("cut", this._handleClipboardEvent), this.telInput.addEventListener("paste", this._handleClipboardEvent)
                        }
                    }, {
                        key: "_translateCursorPosition", value: function (t, e, i, o) {
                            if (i === 0 && !o) return 0;
                            for (var r = 0, s = 0; s < e.length; s++) {
                                if (/[+0-9]/.test(e[s]) && r++, r === t && !o) return s + 1;
                                if (o && r === t + 1) return s
                            }
                            return e.length
                        }
                    }, {
                        key: "_cap", value: function (t) {
                            var e = this.telInput.getAttribute("maxlength");
                            return e && t.length > e ? t.substr(0, e) : t
                        }
                    }, {
                        key: "_initBlurListeners", value: function () {
                            var t = this;
                            this._handleSubmitOrBlurEvent = function () {
                                t._removeEmptyDialCode()
                            }, this.telInput.form && this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent), this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent)
                        }
                    }, {
                        key: "_removeEmptyDialCode", value: function () {
                            if (this.telInput.value.charAt(0) === "+") {
                                var t = this._getNumeric(this.telInput.value);
                                (!t || this.selectedCountryData.dialCode === t) && (this.telInput.value = "")
                            }
                        }
                    }, {
                        key: "_getNumeric", value: function (t) {
                            return t.replace(/\D/g, "")
                        }
                    }, {
                        key: "_trigger", value: function (t) {
                            var e = new Event(t, {bubbles: !0, cancelable: !0});
                            this.telInput.dispatchEvent(e)
                        }
                    }, {
                        key: "_showDropdown", value: function () {
                            if (this.options.fixDropdownWidth && (this.dropdownContent.style.width = "".concat(this.telInput.offsetWidth, "px")), this.dropdownContent.classList.remove("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "true"), this._setDropdownPosition(), this.options.countrySearch) {
                                var t = this.countryList.firstElementChild;
                                t && this._highlightListItem(t, !1), this.searchInput.focus()
                            } else this.activeItem && (this._highlightListItem(this.activeItem, !1), this._scrollTo(this.activeItem, !0));
                            this._bindDropdownListeners(), this.dropdownArrow.classList.add("iti__arrow--up"), this._trigger("open:countrydropdown")
                        }
                    }, {
                        key: "_toggleClass", value: function (t, e, i) {
                            i && !t.classList.contains(e) ? t.classList.add(e) : !i && t.classList.contains(e) && t.classList.remove(e)
                        }
                    }, {
                        key: "_setDropdownPosition", value: function () {
                            var t = this;
                            if (this.options.dropdownContainer && this.options.dropdownContainer.appendChild(this.dropdown), !this.options.useFullscreenPopup) {
                                var e = this.telInput.getBoundingClientRect(), i = document.documentElement.scrollTop,
                                    o = e.top + i, r = this.dropdownContent.offsetHeight,
                                    s = o + this.telInput.offsetHeight + r < i + window.innerHeight, l = o - r > i,
                                    u = !this.options.countrySearch && !s && l;
                                if (this._toggleClass(this.dropdownContent, "iti__dropdown-content--dropup", u), this.options.dropdownContainer) {
                                    var h = u ? 0 : this.telInput.offsetHeight;
                                    this.dropdown.style.top = "".concat(o + h, "px"), this.dropdown.style.left = "".concat(e.left + document.body.scrollLeft, "px"), this._handleWindowScroll = function () {
                                        return t._closeDropdown()
                                    }, window.addEventListener("scroll", this._handleWindowScroll)
                                }
                            }
                        }
                    }, {
                        key: "_bindDropdownListeners", value: function () {
                            var t = this;
                            this._handleMouseoverCountryList = function (l) {
                                var u = l.target.closest(".iti__country");
                                u && t._highlightListItem(u, !1)
                            }, this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList), this._handleClickCountryList = function (l) {
                                var u = l.target.closest(".iti__country");
                                u && t._selectListItem(u)
                            }, this.countryList.addEventListener("click", this._handleClickCountryList);
                            var e = !0;
                            this._handleClickOffToClose = function () {
                                e || t._closeDropdown(), e = !1
                            }, document.documentElement.addEventListener("click", this._handleClickOffToClose);
                            var i = "", o = null;
                            if (this._handleKeydownOnDropdown = function (l) {
                                ["ArrowUp", "ArrowDown", "Enter", "Escape"].includes(l.key) && (l.preventDefault(), l.stopPropagation(), l.key === "ArrowUp" || l.key === "ArrowDown" ? t._handleUpDownKey(l.key) : l.key === "Enter" ? t._handleEnterKey() : l.key === "Escape" && t._closeDropdown()), !t.options.countrySearch && /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(l.key) && (l.stopPropagation(), o && clearTimeout(o), i += l.key.toLowerCase(), t._searchForCountry(i), o = setTimeout(function () {
                                    i = ""
                                }, 1e3))
                            }, document.addEventListener("keydown", this._handleKeydownOnDropdown), this.options.countrySearch) {
                                var r = function () {
                                    var u = t.searchInput.value.trim();
                                    u ? t._filterCountries(u) : t._filterCountries("", !0)
                                }, s = null;
                                this._handleSearchChange = function () {
                                    s && clearTimeout(s), s = setTimeout(function () {
                                        r(), s = null
                                    }, 100)
                                }, this.searchInput.addEventListener("input", this._handleSearchChange), this.searchInput.addEventListener("click", function (l) {
                                    return l.stopPropagation()
                                })
                            }
                        }
                    }, {
                        key: "_normaliseString", value: function () {
                            var t = arguments.length > 0 && arguments[0] !== c ? arguments[0] : "";
                            return t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
                        }
                    }, {
                        key: "_filterCountries", value: function (t) {
                            var e = arguments.length > 1 && arguments[1] !== c ? arguments[1] : !1, i = !0;
                            this.countryList.innerHTML = "";
                            for (var o = this._normaliseString(t), r = 0; r < this.countries.length; r++) {
                                var s = this.countries[r], l = this._normaliseString(s.name), u = "+".concat(s.dialCode);
                                (e || l.includes(o) || u.includes(o) || s.iso2.includes(o)) && (this.countryList.appendChild(s.nodeById[this.id]), i && (this._highlightListItem(s.nodeById[this.id], !1), i = !1))
                            }
                        }
                    }, {
                        key: "_handleUpDownKey", value: function (t) {
                            var e = t === "ArrowUp" ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
                            if (e ? e.classList.contains("iti__divider") && (e = t === "ArrowUp" ? e.previousElementSibling : e.nextElementSibling) : this.countryList.childElementCount > 1 && (e = t === "ArrowUp" ? this.countryList.lastElementChild : this.countryList.firstElementChild), e) {
                                var i = !this.options.countrySearch;
                                this._highlightListItem(e, i), this.options.countrySearch && this._scrollTo(e, !1)
                            }
                        }
                    }, {
                        key: "_handleEnterKey", value: function () {
                            this.highlightedItem && this._selectListItem(this.highlightedItem)
                        }
                    }, {
                        key: "_searchForCountry", value: function (t) {
                            for (var e = 0; e < this.countries.length; e++) if (this._startsWith(this.countries[e].name, t)) {
                                var i = this.countries[e].nodeById[this.id];
                                this._highlightListItem(i, !1), this._scrollTo(i, !0);
                                break
                            }
                        }
                    }, {
                        key: "_startsWith", value: function (t, e) {
                            return t.substr(0, e.length).toLowerCase() === e
                        }
                    }, {
                        key: "_updateValFromNumber", value: function (t) {
                            var e = t;
                            if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
                                var i = this.options.nationalMode || e.charAt(0) !== "+" && !this.options.showSelectedDialCode,
                                    o = intlTelInputUtils.numberFormat, r = o.NATIONAL, s = o.INTERNATIONAL, l = i ? r : s;
                                e = intlTelInputUtils.formatNumber(e, this.selectedCountryData.iso2, l)
                            }
                            e = this._beforeSetNumber(e), this.telInput.value = e
                        }
                    }, {
                        key: "_updateFlagFromNumber", value: function (t) {
                            var e = t.indexOf("+"), i = e ? t.substring(e) : t, o = this.selectedCountryData.dialCode,
                                r = o === "1";
                            i && r && i.charAt(0) !== "+" && (i.charAt(0) !== "1" && (i = "1".concat(i)), i = "+".concat(i)), this.options.showSelectedDialCode && o && i.charAt(0) !== "+" && (i = "+".concat(o).concat(i));
                            var s = this._getDialCode(i, !0), l = this._getNumeric(i), u = null;
                            if (s) {
                                var h = this.dialCodeToIso2Map[this._getNumeric(s)],
                                    y = h.indexOf(this.selectedCountryData.iso2) !== -1 && l.length <= s.length - 1,
                                    v = o === "1" && this._isRegionlessNanp(l);
                                if (!v && !y) {
                                    for (var f = 0; f < h.length; f++) if (h[f]) {
                                        u = h[f];
                                        break
                                    }
                                }
                            } else i.charAt(0) === "+" && l.length ? u = "" : (!i || i === "+") && !this.selectedCountryData.iso2 && (u = this.defaultCountry);
                            return u !== null ? this._setFlag(u) : !1
                        }
                    }, {
                        key: "_isRegionlessNanp", value: function (t) {
                            var e = this._getNumeric(t);
                            if (e.charAt(0) === "1") {
                                var i = e.substr(1, 3);
                                return J.indexOf(i) !== -1
                            }
                            return !1
                        }
                    }, {
                        key: "_highlightListItem", value: function (t, e) {
                            var i = this.highlightedItem;
                            i && i.classList.remove("iti__highlight"), this.highlightedItem = t, this.highlightedItem.classList.add("iti__highlight"), this.selectedFlag.setAttribute("aria-activedescendant", t.getAttribute("id")), e && this.highlightedItem.focus()
                        }
                    }, {
                        key: "_getCountryData", value: function (t, e) {
                            for (var i = 0; i < this.countries.length; i++) if (this.countries[i].iso2 === t) return this.countries[i];
                            if (e) return null;
                            throw new Error("No country data for '".concat(t, "'"))
                        }
                    }, {
                        key: "_setFlag", value: function (t) {
                            var e = this.options, i = e.allowDropdown, o = e.showSelectedDialCode, r = e.showFlags,
                                s = e.countrySearch, l = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
                            if (this.selectedCountryData = t ? this._getCountryData(t, !1) : {}, this.selectedCountryData.iso2 && (this.defaultCountry = this.selectedCountryData.iso2), r) {
                                var u = t ? "iti__".concat(t) : "iti__globe";
                                this.selectedFlagInner.setAttribute("class", "iti__flag ".concat(u))
                            }
                            if (this._setSelectedCountryFlagTitleAttribute(t, o), o) {
                                var h = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
                                this.selectedDialCode.innerHTML = h;
                                var y = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
                                this.isRTL ? this.telInput.style.paddingRight = "".concat(y + 6, "px") : this.telInput.style.paddingLeft = "".concat(y + 6, "px")
                            }
                            if (this._updatePlaceholder(), i && !s) {
                                var v = this.activeItem;
                                if (v && (v.classList.remove("iti__active"), v.setAttribute("aria-selected", "false")), t) {
                                    var f = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(t, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(t));
                                    f.setAttribute("aria-selected", "true"), f.classList.add("iti__active"), this.activeItem = f
                                }
                            }
                            return l.iso2 !== t
                        }
                    }, {
                        key: "_setSelectedCountryFlagTitleAttribute", value: function (t, e) {
                            if (this.selectedFlag) {
                                var i;
                                t && !e ? i = "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode) : t ? i = this.selectedCountryData.name : i = "Unknown", this.selectedFlag.setAttribute("title", i)
                            }
                        }
                    }, {
                        key: "_getHiddenSelectedFlagWidth", value: function () {
                            var t = this.telInput.parentNode.cloneNode();
                            t.style.visibility = "hidden", document.body.appendChild(t);
                            var e = this.flagsContainer.cloneNode();
                            t.appendChild(e);
                            var i = this.selectedFlag.cloneNode(!0);
                            e.appendChild(i);
                            var o = i.offsetWidth;
                            return t.parentNode.removeChild(t), o
                        }
                    }, {
                        key: "_updatePlaceholder", value: function () {
                            var t = this.options.autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite";
                            if (window.intlTelInputUtils && t) {
                                var e = intlTelInputUtils.numberType[this.options.placeholderNumberType],
                                    i = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, e) : "";
                                i = this._beforeSetNumber(i), typeof this.options.customPlaceholder == "function" && (i = this.options.customPlaceholder(i, this.selectedCountryData)), this.telInput.setAttribute("placeholder", i)
                            }
                        }
                    }, {
                        key: "_selectListItem", value: function (t) {
                            var e = this._setFlag(t.getAttribute("data-country-code"));
                            this._closeDropdown(), this._updateDialCode(t.getAttribute("data-dial-code")), this.telInput.focus(), e && this._triggerCountryChange()
                        }
                    }, {
                        key: "_closeDropdown", value: function () {
                            this.dropdownContent.classList.add("iti__hide"), this.selectedFlag.setAttribute("aria-expanded", "false"), this.selectedFlag.removeAttribute("aria-activedescendant"), this.dropdownArrow.classList.remove("iti__arrow--up"), document.removeEventListener("keydown", this._handleKeydownOnDropdown), this.options.countrySearch && this.searchInput.removeEventListener("input", this._handleSearchChange), document.documentElement.removeEventListener("click", this._handleClickOffToClose), this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList), this.countryList.removeEventListener("click", this._handleClickCountryList), this.options.dropdownContainer && (this.options.useFullscreenPopup || window.removeEventListener("scroll", this._handleWindowScroll), this.dropdown.parentNode && this.dropdown.parentNode.removeChild(this.dropdown)), this._trigger("close:countrydropdown")
                        }
                    }, {
                        key: "_scrollTo", value: function (t, e) {
                            var i = this.countryList, o = document.documentElement.scrollTop, r = i.offsetHeight,
                                s = i.getBoundingClientRect().top + o, l = s + r, u = t.offsetHeight,
                                h = t.getBoundingClientRect().top + o, y = h + u, v = h - s + i.scrollTop,
                                f = r / 2 - u / 2;
                            if (h < s) e && (v -= f), i.scrollTop = v; else if (y > l) {
                                e && (v += f);
                                var I = r - u;
                                i.scrollTop = v - I
                            }
                        }
                    }, {
                        key: "_updateDialCode", value: function (t) {
                            var e = this.telInput.value, i = "+".concat(t), o;
                            if (e.charAt(0) === "+") {
                                var r = this._getDialCode(e);
                                r ? o = e.replace(r, i) : o = i, this.telInput.value = o
                            } else this.options.autoInsertDialCode && (e ? o = i + e : o = i, this.telInput.value = o)
                        }
                    }, {
                        key: "_getDialCode", value: function (t, e) {
                            var i = "";
                            if (t.charAt(0) === "+") for (var o = "", r = 0; r < t.length; r++) {
                                var s = t.charAt(r);
                                if (!isNaN(parseInt(s, 10))) {
                                    if (o += s, e) this.dialCodeToIso2Map[o] && (i = t.substr(0, r + 1)); else if (this.dialCodes[o]) {
                                        i = t.substr(0, r + 1);
                                        break
                                    }
                                    if (o.length === this.dialCodeMaxLen) break
                                }
                            }
                            return i
                        }
                    }, {
                        key: "_getFullNumber", value: function () {
                            var t = this.telInput.value.trim(), e = this.selectedCountryData.dialCode, i,
                                o = this._getNumeric(t);
                            return this.options.showSelectedDialCode && !this.options.nationalMode && t.charAt(0) !== "+" && e && o ? i = "+".concat(e) : i = "", i + t
                        }
                    }, {
                        key: "_beforeSetNumber", value: function (t) {
                            var e = t;
                            if (this.options.showSelectedDialCode) {
                                var i = this._getDialCode(e);
                                if (i) {
                                    i = "+".concat(this.selectedCountryData.dialCode);
                                    var o = e[i.length] === " " || e[i.length] === "-" ? i.length + 1 : i.length;
                                    e = e.substr(o)
                                }
                            }
                            return this._cap(e)
                        }
                    }, {
                        key: "_triggerCountryChange", value: function () {
                            this._trigger("countrychange")
                        }
                    }, {
                        key: "_formatNumberAsYouType", value: function () {
                            var t = this._getFullNumber(),
                                e = window.intlTelInputUtils ? intlTelInputUtils.formatNumberAsYouType(t, this.selectedCountryData.iso2) : t,
                                i = this.selectedCountryData.dialCode;
                            if (this.options.showSelectedDialCode && !this.options.nationalMode && this.telInput.value.charAt(0) !== "+" && e.includes("+".concat(i))) {
                                var o = e.split("+".concat(i))[1] || "";
                                return o.trim()
                            }
                            return e
                        }
                    }, {
                        key: "handleAutoCountry", value: function () {
                            this.options.initialCountry === "auto" && (this.defaultCountry = window.intlTelInputGlobals.autoCountry, this.telInput.value || this.setCountry(this.defaultCountry), this.resolveAutoCountryPromise())
                        }
                    }, {
                        key: "handleUtils", value: function () {
                            window.intlTelInputUtils && (this.telInput.value && this._updateValFromNumber(this.telInput.value), this._updatePlaceholder()), this.resolveUtilsScriptPromise()
                        }
                    }, {
                        key: "destroy", value: function () {
                            var t = this.telInput.form;
                            if (this.options.allowDropdown) {
                                this._closeDropdown(), this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag), this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
                                var e = this.telInput.closest("label");
                                e && e.removeEventListener("click", this._handleLabelClick)
                            }
                            this.hiddenInput && t && t.removeEventListener("submit", this._handleHiddenInputSubmit), this.options.autoInsertDialCode && (t && t.removeEventListener("submit", this._handleSubmitOrBlurEvent), this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent)), this.telInput.removeEventListener("input", this._handleKeyEvent), this.telInput.removeEventListener("cut", this._handleClipboardEvent), this.telInput.removeEventListener("paste", this._handleClipboardEvent), this.telInput.removeAttribute("data-intl-tel-input-id");
                            var i = this.telInput.parentNode;
                            i.parentNode.insertBefore(this.telInput, i), i.parentNode.removeChild(i), delete window.intlTelInputGlobals.instances[this.id]
                        }
                    }, {
                        key: "getExtension", value: function () {
                            return window.intlTelInputUtils ? intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2) : ""
                        }
                    }, {
                        key: "getNumber", value: function (t) {
                            if (window.intlTelInputUtils) {
                                var e = this.selectedCountryData.iso2;
                                return intlTelInputUtils.formatNumber(this._getFullNumber(), e, t)
                            }
                            return ""
                        }
                    }, {
                        key: "getNumberType", value: function () {
                            return window.intlTelInputUtils ? intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2) : -99
                        }
                    }, {
                        key: "getSelectedCountryData", value: function () {
                            return this.selectedCountryData
                        }
                    }, {
                        key: "getValidationError", value: function () {
                            if (window.intlTelInputUtils) {
                                var t = this.selectedCountryData.iso2;
                                return intlTelInputUtils.getValidationError(this._getFullNumber(), t)
                            }
                            return -99
                        }
                    }, {
                        key: "isValidNumber", value: function (t) {
                            var e = this._getFullNumber();
                            return window.intlTelInputUtils ? intlTelInputUtils.isPossibleNumber(e, this.selectedCountryData.iso2, t) : null
                        }
                    }, {
                        key: "isValidNumberPrecise", value: function () {
                            var t = this._getFullNumber();
                            return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(t, this.selectedCountryData.iso2) : null
                        }
                    }, {
                        key: "setCountry", value: function (t) {
                            var e = t.toLowerCase();
                            this.selectedCountryData.iso2 !== e && (this._setFlag(e), this._updateDialCode(this.selectedCountryData.dialCode), this._triggerCountryChange())
                        }
                    }, {
                        key: "setNumber", value: function (t) {
                            var e = this._updateFlagFromNumber(t);
                            this._updateValFromNumber(t), e && this._triggerCountryChange()
                        }
                    }, {
                        key: "setPlaceholderNumberType", value: function (t) {
                            this.options.placeholderNumberType = t, this._updatePlaceholder()
                        }
                    }]), a
                }();
            S.getCountryData = function () {
                return p
            };
            var z = function (n, t, e) {
                var i = document.createElement("script");
                i.onload = function () {
                    k("handleUtils"), t && t()
                }, i.onerror = function () {
                    k("rejectUtilsScriptPromise"), e && e()
                }, i.className = "iti-load-utils", i.async = !0, i.src = n, document.body.appendChild(i)
            };
            return S.loadUtils = function (a) {
                if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
                    if (window.intlTelInputGlobals.startedLoadingUtilsScript = !0, typeof Promise < "u") return new Promise(function (n, t) {
                        return z(a, n, t)
                    });
                    z(a)
                }
                return null
            }, S.defaults = K, S.version = "19.5.6", function (a, n) {
                var t = new Z(a, n);
                return t._init(), a.setAttribute("data-intl-tel-input-id", t.id), window.intlTelInputGlobals.instances[t.id] = t, t
            }
        }()
    })
});
var q = at(H());
import st, {useRef as W, useEffect as lt} from "react";
import d from "prop-types";

var R = ({
             initialValue: c,
             onChangeNumber: p,
             onChangeCountry: g,
             onChangeValidity: m,
             onChangeErrorCode: _,
             initOptions: P,
             className: M,
             disabled: x,
             onFocus: O,
             onBlur: A,
             placeholder: U
         }) => {
    let D = W(null), C = W(null), b = () => {
        let w = C.current.getNumber(), E = C.current.getSelectedCountryData().iso2;
        if (p(w), g(E), C.current.isValidNumber()) m(!0), _(null); else {
            let B = C.current.getValidationError();
            m(!1), _(B)
        }
    };
    return lt(() => {
        let w = D.current;
        return C.current = (0, q.default)(D.current, P), w.addEventListener("countrychange", b), () => {
            w.removeEventListener("countrychange", b), C.current.destroy()
        }
    }, []), st.createElement("input", {
        type: "tel",
        ref: D,
        onInput: b,
        defaultValue: c,
        className: M,
        disabled: x,
        onFocus: O,
        onBlur: A,
        placeholder: U
    })
};
R.propTypes = {
    initialValue: d.string,
    placeholder: d.string,
    onChangeNumber: d.func,
    onChangeCountry: d.func,
    onChangeValidity: d.func,
    onChangeErrorCode: d.func,
    initOptions: d.shape({
        allowDropdown: d.bool,
        autoInsertDialCode: d.bool,
        autoPlaceholder: d.string,
        containerClass: d.string,
        countrySearch: d.bool,
        customPlaceholder: d.func,
        dropdownContainer: d.node,
        excludeCountries: d.arrayOf(d.string),
        fixDropdownWidth: d.bool,
        formatAsYouType: d.bool,
        formatOnDisplay: d.bool,
        geoIpLookup: d.func,
        hiddenInput: d.func,
        i18n: d.objectOf(d.string),
        initialCountry: d.string,
        nationalMode: d.bool,
        onlyCountries: d.arrayOf(d.string),
        placeholderNumberType: d.string,
        preferredCountries: d.arrayOf(d.string),
        showFlags: d.bool,
        showSelectedDialCode: d.bool,
        useFullscreenPopup: d.bool,
        utilsScript: d.string
    }),
    className: d.string,
    disabled: d.bool,
    onFocus: d.func,
    onBlur: d.func
};
R.defaultProps = {
    initialValue: "", placeholder: "", onChangeNumber: () => {
    }, onChangeCountry: () => {
    }, onChangeValidity: () => {
    }, onChangeErrorCode: () => {
    }, initOptions: {}, className: "", disabled: !1, onFocus: () => {
    }, onBlur: () => {
    }
};
var pt = R;
export {pt as default};
//# sourceMappingURL=IntlTelInput.esm.js.map