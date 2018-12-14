/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as isPlatform } from './chunk-523a9283.js';
import { k as createColorClasses, l as hostContext, m as createThemedClasses } from './chunk-f2ab991b.js';

class Buttons {
    static get is() { return "ion-buttons"; }
    static get encapsulation() { return "scoped"; }
    static get style() { return ".sc-ion-buttons-md-h {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  z-index: 99; }\n\n.sc-ion-buttons-md-s  ion-button  {\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  --box-shadow: none;\n  margin-left: 2px;\n  margin-right: 2px; }\n\n.sc-ion-buttons-md-s  ion-button  {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --height: 32px;\n  --box-shadow: none;\n  font-size: 14px;\n  font-weight: 500; }\n\n.sc-ion-buttons-md-s  ion-button:not(.button-round)  {\n  --border-radius: 2px; }\n\n.sc-ion-buttons-md-h.ion-color.sc-ion-buttons-md-s  .button , .ion-color .sc-ion-buttons-md-h.sc-ion-buttons-md-s  .button  {\n  --color: initial;\n  --color-activated: initial; }\n\n.sc-ion-buttons-md-s  .button-solid  {\n  --color: var(--ion-toolbar-background, #f8f8f8);\n  --color-activated: var(--ion-toolbar-background, #f8f8f8);\n  --background: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --background-activated: var(--ion-toolbar-color, var(--ion-text-color, #424242)); }\n\n.sc-ion-buttons-md-s  .button-outline  {\n  --color: initial;\n  --color-activated: currentColor;\n  --background: transparent;\n  --background-activated: transparent;\n  --border-color: currentColor; }\n\n.sc-ion-buttons-md-s  .button-clear  {\n  --color: initial;\n  --color-activated: currentColor;\n  --background: transparent; }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"start\"]  {\n  margin: 0;\n  margin-right: 0.3em;\n  font-size: 1.4em; }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"end\"]  {\n  margin: 0;\n  margin-left: 0.4em;\n  font-size: 1.4em; }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"icon-only\"]  {\n  padding: 0;\n  margin: 0;\n  font-size: 1.8em; }\n\n[slot=\"start\"].sc-ion-buttons-md-h {\n  -ms-flex-order: 2;\n  order: 2; }\n\n[slot=\"secondary\"].sc-ion-buttons-md-h {\n  -ms-flex-order: 4;\n  order: 4; }\n\n[slot=\"primary\"].sc-ion-buttons-md-h {\n  -ms-flex-order: 5;\n  order: 5;\n  text-align: end; }\n\n[slot=\"end\"].sc-ion-buttons-md-h {\n  -ms-flex-order: 6;\n  order: 6;\n  text-align: end; }"; }
    static get styleMode() { return "md"; }
}

class Content {
    constructor() {
        this.isScrolling = false;
        this.lastScroll = 0;
        this.queued = false;
        this.cTop = -1;
        this.cBottom = -1;
        this.detail = {
            scrollTop: 0,
            scrollLeft: 0,
            type: "scroll",
            event: undefined,
            startX: 0,
            startY: 0,
            startTimeStamp: 0,
            currentX: 0,
            currentY: 0,
            velocityX: 0,
            velocityY: 0,
            deltaX: 0,
            deltaY: 0,
            timeStamp: 0,
            data: undefined,
            isScrolling: true,
        };
        this.fullscreen = false;
        this.scrollX = false;
        this.scrollY = true;
        this.scrollEvents = false;
    }
    onNavChanged() {
        this.resize();
    }
    componentWillLoad() {
        if (this.forceOverscroll === undefined) {
            this.forceOverscroll = this.mode === "ios" && isPlatform(this.win, "mobile");
        }
    }
    componentDidLoad() {
        this.resize();
    }
    componentDidUnload() {
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
    }
    resize() {
        if (this.fullscreen) {
            this.queue.read(this.readDimensions.bind(this));
        }
        else if (this.cTop !== 0 || this.cBottom !== 0) {
            this.cTop = this.cBottom = 0;
            this.el.forceUpdate();
        }
    }
    readDimensions() {
        const page = getPageElement(this.el);
        const top = Math.max(this.el.offsetTop, 0);
        const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
        const dirty = top !== this.cTop || bottom !== this.cBottom;
        if (dirty) {
            this.cTop = top;
            this.cBottom = bottom;
            this.el.forceUpdate();
        }
    }
    onScroll(ev) {
        const timeStamp = Date.now();
        const shouldStart = !this.isScrolling;
        this.lastScroll = timeStamp;
        if (shouldStart) {
            this.onScrollStart();
        }
        if (!this.queued && this.scrollEvents) {
            this.queued = true;
            this.queue.read(ts => {
                this.queued = false;
                this.detail.event = ev;
                updateScrollDetail(this.detail, this.scrollEl, ts, shouldStart);
                this.ionScroll.emit(this.detail);
            });
        }
    }
    getScrollElement() {
        return Promise.resolve(this.scrollEl);
    }
    scrollToTop(duration = 0) {
        return this.scrollToPoint(undefined, 0, duration);
    }
    scrollToBottom(duration = 0) {
        const y = this.scrollEl.scrollHeight - this.scrollEl.clientHeight;
        return this.scrollToPoint(undefined, y, duration);
    }
    scrollByPoint(x, y, duration) {
        return this.scrollToPoint(x + this.scrollEl.scrollLeft, y + this.scrollEl.scrollTop, duration);
    }
    async scrollToPoint(x, y, duration = 0) {
        const el = this.scrollEl;
        if (duration < 32) {
            if (y != null) {
                el.scrollTop = y;
            }
            if (x != null) {
                el.scrollLeft = x;
            }
            return;
        }
        let resolve;
        let startTime = 0;
        const promise = new Promise(r => resolve = r);
        const fromY = el.scrollTop;
        const fromX = el.scrollLeft;
        const deltaY = y != null ? y - fromY : 0;
        const deltaX = x != null ? x - fromX : 0;
        const step = (timeStamp) => {
            const linearTime = Math.min(1, ((timeStamp - startTime) / duration)) - 1;
            const easedT = Math.pow(linearTime, 3) + 1;
            if (deltaY !== 0) {
                el.scrollTop = Math.floor((easedT * deltaY) + fromY);
            }
            if (deltaX !== 0) {
                el.scrollLeft = Math.floor((easedT * deltaX) + fromX);
            }
            if (easedT < 1) {
                requestAnimationFrame(step);
            }
            else {
                resolve();
            }
        };
        requestAnimationFrame(ts => {
            startTime = ts;
            step(ts);
        });
        return promise;
    }
    onScrollStart() {
        this.isScrolling = true;
        this.ionScrollStart.emit({
            isScrolling: true
        });
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
        this.watchDog = setInterval(() => {
            if (this.lastScroll < Date.now() - 120) {
                this.onScrollEnd();
            }
        }, 100);
    }
    onScrollEnd() {
        clearInterval(this.watchDog);
        this.watchDog = null;
        this.isScrolling = false;
        this.ionScrollEnd.emit({
            isScrolling: false
        });
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { "content-sizing": hostContext("ion-popover", this.el), "overscroll": !!this.forceOverscroll }),
            style: {
                "--offset-top": `${this.cTop}px`,
                "--offset-bottom": `${this.cBottom}px`,
            }
        };
    }
    render() {
        const { scrollX, scrollY, forceOverscroll } = this;
        this.resize();
        return [
            h("div", { class: {
                    "inner-scroll": true,
                    "scroll-x": scrollX,
                    "scroll-y": scrollY,
                    "overscroll": (scrollX || scrollY) && !!forceOverscroll
                }, ref: el => this.scrollEl = el, onScroll: ev => this.onScroll(ev) }, h("slot", null)),
            h("slot", { name: "fixed" })
        ];
    }
    static get is() { return "ion-content"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "el": {
                "elementRef": true
            },
            "forceOverscroll": {
                "type": Boolean,
                "attr": "force-overscroll",
                "mutable": true
            },
            "fullscreen": {
                "type": Boolean,
                "attr": "fullscreen"
            },
            "getScrollElement": {
                "method": true
            },
            "queue": {
                "context": "queue"
            },
            "scrollByPoint": {
                "method": true
            },
            "scrollEvents": {
                "type": Boolean,
                "attr": "scroll-events"
            },
            "scrollToBottom": {
                "method": true
            },
            "scrollToPoint": {
                "method": true
            },
            "scrollToTop": {
                "method": true
            },
            "scrollX": {
                "type": Boolean,
                "attr": "scroll-x"
            },
            "scrollY": {
                "type": Boolean,
                "attr": "scroll-y"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionScrollStart",
                "method": "ionScrollStart",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionScroll",
                "method": "ionScroll",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionScrollEnd",
                "method": "ionScrollEnd",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "body:ionNavDidChange",
                "method": "onNavChanged"
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the Content\n   * \@prop --color: Color of the Content\n   * \@prop --padding-top: Padding top of the Content\n   * \@prop --padding-bottom: Padding bottom of the Content\n   * \@prop --padding-start: Padding start of the Content\n   * \@prop --padding-end: Padding end of the Content\n   * \@prop --keyboard-offset: Keyboard offset of the Content\n   * \@prop --offset-top: Offset top of the Content\n   * \@prop --offset-bottom: Offset bottom of the Content\n   */\n  --background: var(--ion-background-color, #fff);\n  --color: var(--ion-text-color, #000);\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --padding-start: 0px;\n  --padding-end: 0px;\n  --keyboard-offset: 0px;\n  --offset-top: 0px;\n  --offset-bottom: 0px;\n  --overflow: auto;\n  display: block;\n  position: relative;\n  -ms-flex: 1;\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  /* stylelint-disable */\n  margin: 0 !important;\n  padding: 0 !important;\n  /* stylelint-enable */\n  font-family: var(--ion-font-family, inherit);\n  contain: layout size style; }\n\n:host(.ion-color) .inner-scroll {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n:host(.outer-content) {\n  --background: var(--ion-background-color-step-50, #f2f2f2); }\n\n.inner-scroll {\n  left: 0px;\n  right: 0px;\n  top: calc(var(--offset-top) * -1);\n  bottom: calc(var(--offset-bottom) * -1);\n  padding: calc(var(--padding-top) + var(--offset-top)) var(--padding-end) calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom)) var(--padding-start);\n  position: absolute;\n  background: var(--background);\n  color: var(--color);\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  overflow: hidden; }\n\n.scroll-y,\n.scroll-x {\n  -webkit-overflow-scrolling: touch;\n  will-change: scroll-position;\n  -ms-scroll-chaining: none;\n  overscroll-behavior: contain; }\n\n.scroll-y {\n  overflow-y: var(--overflow); }\n\n.scroll-x {\n  overflow-x: var(--overflow); }\n\n.overscroll::before,\n.overscroll::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  content: \"\"; }\n\n.overscroll::before {\n  bottom: -1px; }\n\n.overscroll::after {\n  top: -1px; }\n\n:host(.content-sizing) {\n  contain: none; }\n\n:host(.content-sizing) .inner-scroll {\n  position: relative; }"; }
}
function getParentElement(el) {
    if (el.parentElement) {
        return el.parentElement;
    }
    if (el.parentNode && el.parentNode.host) {
        return el.parentNode.host;
    }
    return null;
}
function getPageElement(el) {
    const tabs = el.closest("ion-tabs");
    if (tabs) {
        return tabs;
    }
    const page = el.closest("ion-app,ion-page,.ion-page,page-inner");
    if (page) {
        return page;
    }
    return getParentElement(el);
}
function updateScrollDetail(detail, el, timestamp, shouldStart) {
    const prevX = detail.currentX;
    const prevY = detail.currentY;
    const prevT = detail.timeStamp;
    const currentX = el.scrollLeft;
    const currentY = el.scrollTop;
    if (shouldStart) {
        detail.startTimeStamp = timestamp;
        detail.startX = currentX;
        detail.startY = currentY;
        detail.velocityX = detail.velocityY = 0;
    }
    detail.timeStamp = timestamp;
    detail.currentX = detail.scrollLeft = currentX;
    detail.currentY = detail.scrollTop = currentY;
    detail.deltaX = currentX - detail.startX;
    detail.deltaY = currentY - detail.startY;
    const timeDelta = timestamp - prevT;
    if (timeDelta > 0 && timeDelta < 100) {
        const velocityX = (currentX - prevX) / timeDelta;
        const velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
    }
}

class Header {
    constructor() {
        this.translucent = false;
    }
    hostData() {
        const themedClasses = createThemedClasses(this.mode, "header");
        const translucentClasses = this.translucent ? createThemedClasses(this.mode, "header-translucent") : null;
        return {
            class: Object.assign({}, themedClasses, translucentClasses)
        };
    }
    static get is() { return "ion-header"; }
    static get properties() {
        return {
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            }
        };
    }
    static get style() { return "ion-header {\n  display: block;\n  position: relative;\n  -ms-flex-order: -1;\n  order: -1;\n  width: 100%;\n  z-index: 10; }\n\nion-header ion-toolbar:first-child {\n  padding-top: var(--ion-safe-area-top, 0); }\n\n.header-md::after {\n  left: 0;\n  bottom: -8px;\n  background-position: left 0 top 0;\n  position: absolute;\n  width: 100%;\n  height: 8px;\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAIBAMAAAACWGKkAAAAFVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQCkAAAAB3RSTlMFTEIzJBcOYhQUIwAAAB9JREFUCNdjEIQCBiUoYDCGAgYXKGAIhQKGNChgwAAAorMLKSCkL40AAAAASUVORK5CYII=\");\n  background-repeat: repeat-x;\n  content: \"\"; }\n\n.header-md[no-border]::after {\n  display: none; }"; }
    static get styleMode() { return "md"; }
}

class ToolbarTitle {
    getMode() {
        const toolbar = this.el.closest("ion-toolbar");
        return (toolbar && toolbar.mode) || this.mode;
    }
    hostData() {
        const mode = this.getMode();
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`title-${mode}`]: true })
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-title" }, h("slot", null))
        ];
    }
    static get is() { return "ion-title"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "el": {
                "elementRef": true
            }
        };
    }
    static get style() { return ":host {\n  /**\n   * \@prop --color: Text color of the title\n   */\n  --color: initial;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  color: var(--color); }\n\n:host(.title-ios) {\n  left: 0;\n  top: 0;\n  padding: 0 90px;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  font-size: 17px;\n  font-weight: 600;\n  letter-spacing: -.03em;\n  text-align: center;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  pointer-events: none; }\n\n:host(.title-md) {\n  padding: 0 12px;\n  font-size: 20px;\n  font-weight: 500; }\n\n:host(.ion-color) {\n  color: var(--ion-color-base); }\n\n.toolbar-title {\n  display: block;\n  width: 100%;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  pointer-events: auto; }"; }
}

class Toolbar {
    constructor() {
        this.childrenStyles = new Map();
    }
    childrenStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.childrenStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach(key => {
            const childKey = `toolbar-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[childKey]) {
                hasStyleChange = true;
            }
            if (newValue) {
                newStyles[childKey] = true;
            }
        });
        if (hasStyleChange) {
            this.childrenStyles.set(tagName, newStyles);
            this.el.forceUpdate();
        }
    }
    hostData() {
        const childStyles = {};
        this.childrenStyles.forEach(value => {
            Object.assign(childStyles, value);
        });
        return {
            class: Object.assign({}, childStyles, createColorClasses(this.color))
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-background" }),
            h("div", { class: "toolbar-container" }, h("slot", { name: "start" }), h("slot", { name: "secondary" }), h("div", { class: "toolbar-content" }, h("slot", null)), h("slot", { name: "primary" }), h("slot", { name: "end" }))
        ];
    }
    static get is() { return "ion-toolbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "el": {
                "elementRef": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get listeners() {
        return [{
                "name": "ionStyle",
                "method": "childrenStyle"
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the toolbar\n   * \@prop --border-color: Color of the toolbar border\n   * \@prop --border-style: Style of the toolbar border\n   * \@prop --border-width: Width of the toolbar border\n   * \@prop --color: Color of the toolbar text\n   * \@prop --min-height: Minimum height of the toolbar\n   * \@prop --opacity: Opacity of the toolbar background\n   * \@prop --padding-bottom: Bottom padding of the toolbar\n   * \@prop --padding-end: End padding of the toolbar\n   * \@prop --padding-start: Start padding of the toolbar\n   * \@prop --padding-top: Top padding of the toolbar\n   */\n  --border-width: 0;\n  --border-style: solid;\n  --opacity: 1;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  padding-left: var(--ion-safe-area-left);\n  padding-right: var(--ion-safe-area-right);\n  display: block;\n  position: relative;\n  width: 100%;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  contain: content;\n  z-index: 10;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.ion-color) {\n  color: var(--ion-color-contrast); }\n\n:host(.ion-color) .toolbar-background {\n  background: var(--ion-color-base); }\n\n.toolbar-container {\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: var(--min-height);\n  contain: content;\n  overflow: hidden;\n  z-index: 10;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.toolbar-background {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  background: var(--background);\n  contain: strict;\n  opacity: var(--opacity);\n  z-index: -1;\n  pointer-events: none; }\n\n:host(.toolbar-segment) {\n  --min-height: auto; }\n\n:host {\n  --background: var(--ion-toolbar-background, #f8f8f8);\n  --color: var(--ion-toolbar-color, var(--ion-text-color, #424242));\n  --border-color: var(--ion-toolbar-border-color, var(--ion-border-color, #c1c4cd));\n  --padding-top: 4px;\n  --padding-bottom: 4px;\n  --padding-start: 4px;\n  --padding-end: 4px;\n  --min-height: 56px; }\n\n.toolbar-content {\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-order: 3;\n  order: 3;\n  min-width: 0;\n  max-width: 100%; }\n\n:host(.toolbar-segment) {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0; }"; }
    static get styleMode() { return "md"; }
}

export { Buttons as IonButtons, Content as IonContent, Header as IonHeader, ToolbarTitle as IonTitle, Toolbar as IonToolbar };
