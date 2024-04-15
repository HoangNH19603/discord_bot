"use strict";

class Media {
    constructor(mediaName, src, rate) {
        this.name = mediaName;
        this._src = src;
        this._rate = rate;
    }

    set rate(newRate) {
        this._rate = newRate;
    }

    get rate() {
        return this._rate;
    }

    set src(newSrc) {
        this._src = newSrc;
    }

    get src() {
        return this._src;
    }
}