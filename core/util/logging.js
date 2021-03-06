/*
 * noVNC: HTML5 VNC client
 * Copyright (C) 2012 Joel Martin
 * Licensed under MPL 2.0 (see LICENSE.txt)
 *
 * See README.md for usage and integration instructions.
 */

/*
 * Logging/debug routines
 */

let _log_level = 'warn';

let Debug = function (msg) {};
let Info = function (msg) {};
let Warn = function (msg) {};
let Error = function (msg) {};

export function init_logging (level) {
    if (typeof level === 'undefined') {
        level = _log_level;
    } else {
        _log_level = level;
    }

    Debug = Info = Warn = Error = function (msg) {};

    if (typeof window.console !== "undefined") {
        /* eslint-disable no-console, no-fallthrough */
        switch (level) {
            case 'debug':
                Debug = console.debug.bind(window.console);
            case 'info':
                Info  = console.info.bind(window.console);
            case 'warn':
                Warn  = console.warn.bind(window.console);
            case 'error':
                Error = console.error.bind(window.console);
            case 'none':
                break;
            default:
                throw new Error("invalid logging type '" + level + "'");
        }
        /* eslint-enable no-console, no-fallthrough */
    }
}

export function get_logging () {
    return _log_level;
}

export { Debug, Info, Warn, Error };

// Initialize logging level
init_logging();
