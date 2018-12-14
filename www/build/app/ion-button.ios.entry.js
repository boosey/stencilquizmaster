/*! Built with http://stenciljs.com */
const { h } = window.App;

import { i as hasShadowDom, k as createColorClasses, o as openURL, l as hostContext, m as createThemedClasses } from './chunk-f2ab991b.js';

class Button {
    constructor() {
        this.keyFocus = false;
        this.buttonType = "button";
        this.disabled = false;
        this.routerDirection = "forward";
        this.strong = false;
        this.type = "button";
        this.onFocus = () => {
            this.ionFocus.emit();
        };
        this.onKeyUp = () => {
            this.keyFocus = true;
        };
        this.onBlur = () => {
            this.keyFocus = false;
            this.ionBlur.emit();
        };
        this.onClick = (ev) => {
            if (this.type === "button") {
                return openURL(this.win, this.href, ev, this.routerDirection);
            }
            else if (hasShadowDom(this.el)) {
                const form = this.el.closest("form");
                if (form) {
                    ev.preventDefault();
                    const fakeButton = document.createElement("button");
                    fakeButton.type = this.type;
                    fakeButton.style.display = "none";
                    form.appendChild(fakeButton);
                    fakeButton.click();
                    fakeButton.remove();
                }
            }
            return Promise.resolve(false);
        };
    }
    componentWillLoad() {
        if (this.fill === undefined) {
            this.fill = this.el.closest("ion-buttons") ? "clear" : "solid";
        }
    }
    hostData() {
        const { buttonType, keyFocus, disabled, color, expand, fill, shape, size, strong } = this;
        return {
            "ion-activatable": true,
            "aria-disabled": this.disabled ? "true" : null,
            class: Object.assign({}, createColorClasses(color), { [buttonType]: true, [`${buttonType}-${expand}`]: !!expand, [`${buttonType}-${size}`]: !!size, [`${buttonType}-${shape}`]: !!shape, [`${buttonType}-${fill}`]: !!fill, [`${buttonType}-strong`]: strong, "focused": keyFocus, "button-disabled": disabled })
        };
    }
    render() {
        const TagType = this.href === undefined ? "button" : "a";
        const attrs = (TagType === "button")
            ? { type: this.type }
            : { href: this.href };
        return (h(TagType, Object.assign({}, attrs, { class: "button-native", disabled: this.disabled, onFocus: this.onFocus, onKeyUp: this.onKeyUp, onBlur: this.onBlur, onClick: this.onClick }), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" })), this.mode === "md" && h("ion-ripple-effect", null)));
    }
    static get is() { return "ion-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "buttonType": {
                "type": String,
                "attr": "button-type",
                "mutable": true
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "reflectToAttr": true
            },
            "el": {
                "elementRef": true
            },
            "expand": {
                "type": String,
                "attr": "expand",
                "reflectToAttr": true
            },
            "fill": {
                "type": String,
                "attr": "fill",
                "reflectToAttr": true,
                "mutable": true
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "keyFocus": {
                "state": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "routerDirection": {
                "type": String,
                "attr": "router-direction"
            },
            "shape": {
                "type": String,
                "attr": "shape",
                "reflectToAttr": true
            },
            "size": {
                "type": String,
                "attr": "size",
                "reflectToAttr": true
            },
            "strong": {
                "type": Boolean,
                "attr": "strong"
            },
            "type": {
                "type": String,
                "attr": "type"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the button\n   * \@prop --background-activated: Background of the button when activated\n   * \@prop --background-focused: Background of the button when focused\n   *\n   * \@prop --color: Text color of the button\n   * \@prop --color-activated: Text color of the button when activated\n   * \@prop --color-focused: Text color of the button when focused\n   *\n   * \@prop --width: Width of the button\n   * \@prop --height: Height of the button\n   *\n   * \@prop --transition: Transition of the button\n   *\n   * \@prop --border-radius: Border radius of the button\n   * \@prop --border-width: Border width of the button\n   * \@prop --border-style: Border style of the button\n   * \@prop --border-color: Border color of the button\n   *\n   * \@prop --ripple-color: Color of the button ripple effect\n   *\n   * \@prop --box-shadow: Box shadow of the button\n   * \@prop --opacity: Opacity of the button\n   *\n   * \@prop --margin-top: Margin top of the button\n   * \@prop --margin-end: Margin end of the button\n   * \@prop --margin-bottom: Margin bottom of the button\n   * \@prop --margin-start: Margin start of the button\n   *\n   * \@prop --padding-top: Padding top of the button\n   * \@prop --padding-end: Padding end of the button\n   * \@prop --padding-bottom: Padding bottom of the button\n   * \@prop --padding-start: Padding start of the button\n   */\n  --width: auto;\n  --overflow: hidden;\n  --ripple-color: currentColor;\n  display: inline-block;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  pointer-events: auto;\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  -webkit-font-kerning: none;\n  font-kerning: none; }\n\n:host(.button-disabled) {\n  pointer-events: none; }\n\n:host(.button-solid) {\n  --background: var(--ion-color-primary, #3880ff);\n  --background-focused: var(--ion-color-primary-shade, #3171e0);\n  --color: var(--ion-color-primary-contrast, #fff);\n  --color-activated: var(--ion-color-primary-contrast, #fff);\n  --color-focused: var(--ion-color-primary-contrast, #fff); }\n\n:host(.button-solid.ion-color) .button-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n:host(.button-solid.ion-color.focused) .button-native {\n  background: var(--ion-color-shade); }\n\n:host(.button-outline) {\n  --border-color: var(--ion-color-primary, #3880ff);\n  --background: transparent;\n  --color: var(--ion-color-primary, #3880ff);\n  --color-focused: var(--ion-color-primary, #3880ff); }\n\n:host(.button-outline.ion-color) .button-native {\n  border-color: var(--ion-color-base);\n  background: transparent;\n  color: var(--ion-color-base); }\n\n:host(.button-outline.focused.ion-color) .button-native {\n  background: rgba(var(--ion-color-base-rgb), 0.1);\n  color: var(--ion-color-base); }\n\n:host(.button-clear) {\n  --border-width: 0;\n  --background: transparent;\n  --color: var(--ion-color-primary, #3880ff); }\n\n:host(.button-clear.ion-color) .button-native {\n  background: transparent;\n  color: var(--ion-color-base); }\n\n:host(.button-clear.focused.ion-color) .button-native {\n  background: rgba(var(--ion-color-base-rgb), 0.1);\n  color: var(--ion-color-base); }\n\n:host(.button-clear.activated.ion-color) .button-native {\n  background: transparent; }\n\n:host(.button-block) {\n  display: block; }\n\n:host(.button-block) .button-native {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  clear: both;\n  contain: strict; }\n\n:host(.button-block) .button-native::after {\n  clear: both; }\n\n:host(.button-full) {\n  display: block; }\n\n:host(.button-full) .button-native {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  contain: strict; }\n\n:host(.button-full:not(.button-round)) .button-native {\n  border-radius: 0;\n  border-right-width: 0;\n  border-left-width: 0; }\n\n.button-native {\n  border-radius: var(--border-radius);\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin: var(--margin-top) var(--margin-end) var(--margin-bottom) var(--margin-start);\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: block;\n  position: relative;\n  width: var(--width);\n  height: var(--height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  line-height: 1;\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  contain: content;\n  cursor: pointer;\n  opacity: var(--opacity);\n  overflow: var(--overflow);\n  z-index: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\n.button-native[disabled] {\n  cursor: default;\n  opacity: .5;\n  pointer-events: none; }\n\n:host(.focused) .button-native {\n  background: var(--background-focused);\n  color: var(--color-focused); }\n\n:host(.activated) .button-native {\n  background: var(--background-activated);\n  color: var(--color-activated); }\n\n.button-inner {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n\n::slotted(ion-icon) {\n  font-size: 1.4em;\n  pointer-events: none; }\n\n::slotted(ion-icon[slot=\"start\"]) {\n  margin: 0 0.3em 0 -0.3em; }\n\n::slotted(ion-icon[slot=\"end\"]) {\n  margin: 0 -0.2em 0 0.3em; }\n\n::slotted(ion-icon[slot=\"icon-only\"]) {\n  font-size: 1.8em; }\n\nion-ripple-effect {\n  color: var(--ripple-color); }\n\n:host {\n  --border-radius: 12px;\n  --margin-top: 4px;\n  --margin-bottom: 4px;\n  --margin-start: 2px;\n  --margin-end: 2px;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 1em;\n  --padding-end: 1em;\n  --height: 2.8em;\n  --transition: background-color, opacity 100ms linear;\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: -0.03em; }\n\n:host(.button-solid) {\n  --background-activated: var(--ion-color-primary-shade, #3171e0); }\n\n\@media (any-hover: hover) {\n  :host(.button-solid:hover) {\n    --opacity: 0.8; } }\n\n:host(.button-solid.activated) {\n  --opacity: 1; }\n\n:host(.button-outline) {\n  --border-radius: 12px;\n  --border-width: 1px;\n  --border-style: solid;\n  --background-activated: var(--ion-color-primary, #3880ff);\n  --background-focused: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.1);\n  --color-activated: var(--ion-color-primary-contrast, #fff); }\n\n:host(.button-outline.activated.ion-color) .button-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n\@media (any-hover: hover) {\n  :host(.button-clear:hover) {\n    --opacity: 0.6; } }\n\n:host(.button-clear.activated) {\n  --opacity: 0.4; }\n\n:host(.button-clear) {\n  --background-activated: transparent;\n  --background-focused: rgba(var(--ion-color-primary-rgb, 56, 128, 255), 0.1);\n  --color-activated: var(--ion-color-primary, #3880ff);\n  --color-focused: var(--ion-color-primary, #3880ff); }\n\n:host(.button-round) {\n  --border-radius: 64px;\n  --padding-top: 0;\n  --padding-start: 26px;\n  --padding-end: 26px;\n  --padding-bottom: 0; }\n\n:host(.button-large) {\n  --border-radius: 14px;\n  --padding-top: 0;\n  --padding-start: 1em;\n  --padding-end: 1em;\n  --padding-bottom: 0;\n  --height: 2.8em;\n  font-size: 20px; }\n\n:host(.button-small) {\n  --border-radius: 8px;\n  --padding-top: 0;\n  --padding-start: 0.9em;\n  --padding-end: 0.9em;\n  --padding-bottom: 0;\n  --height: 2.1em;\n  font-size: 13px; }\n\n:host(.button-strong) {\n  font-weight: 600; }"; }
    static get styleMode() { return "ios"; }
}

class Item {
    constructor() {
        this.itemStyles = new Map();
        this.multipleInputs = false;
        this.button = false;
        this.detailIcon = "ios-arrow-forward";
        this.disabled = false;
        this.routerDirection = "forward";
        this.type = "button";
    }
    itemStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.itemStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach(key => {
            const itemKey = `item-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[itemKey]) {
                hasStyleChange = true;
            }
            if (newValue) {
                newStyles[itemKey] = true;
            }
        });
        if (hasStyleChange) {
            this.itemStyles.set(tagName, newStyles);
            this.el.forceUpdate();
        }
    }
    componentDidLoad() {
        Array.from(this.el.querySelectorAll("ion-button")).forEach(button => {
            if (!button.size) {
                button.size = "small";
            }
        });
        const inputs = this.el.querySelectorAll("ion-select, ion-datetime");
        this.multipleInputs = inputs.length > 1 ? true : false;
    }
    isClickable() {
        return (this.href !== undefined || this.button);
    }
    hostData() {
        const childStyles = {};
        this.itemStyles.forEach(value => {
            Object.assign(childStyles, value);
        });
        return {
            "ion-activatable": this.isClickable(),
            "aria-disabled": this.disabled ? "true" : null,
            class: Object.assign({}, childStyles, createColorClasses(this.color), { [`item-lines-${this.lines}`]: !!this.lines, "item-disabled": this.disabled, "in-list": hostContext("ion-list", this.el), "item": true, "item-multiple-inputs": this.multipleInputs })
        };
    }
    render() {
        const { href, detail, mode, win, detailIcon, routerDirection, type } = this;
        const clickable = this.isClickable();
        const TagType = clickable ? (href === undefined ? "button" : "a") : "div";
        const attrs = TagType === "button" ? { type } : { href };
        const showDetail = detail !== undefined ? detail : mode === "ios" && clickable;
        return [
            h(TagType, Object.assign({}, attrs, { class: "item-native", onClick: ev => openURL(win, href, ev, routerDirection) }), h("slot", { name: "start" }), h("div", { class: "item-inner" }, h("div", { class: "input-wrapper" }, h("slot", null)), h("slot", { name: "end" }), showDetail && h("ion-icon", { icon: detailIcon, lazy: false, class: "item-detail-icon" }), h("div", { class: "item-inner-highlight" })), clickable && mode === "md" && h("ion-ripple-effect", null)),
            h("div", { class: "item-highlight" })
        ];
    }
    static get is() { return "ion-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "button": {
                "type": Boolean,
                "attr": "button"
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "detail": {
                "type": Boolean,
                "attr": "detail"
            },
            "detailIcon": {
                "type": String,
                "attr": "detail-icon"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled"
            },
            "el": {
                "elementRef": true
            },
            "href": {
                "type": String,
                "attr": "href"
            },
            "lines": {
                "type": String,
                "attr": "lines"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "multipleInputs": {
                "state": true
            },
            "routerDirection": {
                "type": String,
                "attr": "router-direction"
            },
            "type": {
                "type": String,
                "attr": "type"
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get listeners() {
        return [{
                "name": "ionStyle",
                "method": "itemStyle"
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the item\n   * \@prop --background-activated: Background of the activated item\n   * \@prop --border-color: Color of the item border\n   * \@prop --border-radius: Radius of the item border\n   * \@prop --border-style: Style of the item border\n   * \@prop --border-width: Width of the item border\n   * \@prop --box-shadow: Box shadow of the item\n   * \@prop --color: Color of the item\n   *\n   * \@prop --detail-icon-color: Color of the item detail icon\n   * \@prop --detail-icon-opacity: Opacity of the item detail icon\n   * \@prop --detail-icon-font-size: Font size of the item detail icon\n   * \@prop --inner-border-width: Width of the item inner border\n   * \@prop --inner-box-shadow: Box shadow of the item inner\n   * \@prop --inner-padding-bottom: Bottom padding of the item inner\n   * \@prop --inner-padding-end: End padding of the item inner\n   * \@prop --inner-padding-start: Start padding of the item inner\n   * \@prop --inner-padding-top: Top padding of the item inner\n   *\n   * \@prop --min-height: Minimum height of the item\n   * \@prop --padding-bottom: Bottom padding of the item\n   * \@prop --padding-end: End padding of the item\n   * \@prop --padding-start: Start padding of the item\n   * \@prop --padding-top: Top padding of the item\n   * \@prop --transition: Transition of the item\n   *\n   * \@prop --highlight-height: The height of the highlight on the item\n   * \@prop --highlight-color-focused: The color of the highlight on the item when focused\n   * \@prop --highlight-color-valid: The color of the highlight on the item when valid\n   * \@prop --highlight-color-invalid: The color of the highlight on the item when invalid\n   */\n  --border-radius: 0px;\n  --border-width: 0px;\n  --border-style: solid;\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --padding-end: 0px;\n  --padding-start: 0px;\n  --box-shadow: none;\n  --inner-border-width: 0px;\n  --inner-padding-top: 0px;\n  --inner-padding-bottom: 0px;\n  --inner-padding-start: 0px;\n  --inner-padding-end: 0px;\n  --inner-box-shadow: none;\n  --show-full-highlight: 0;\n  --show-inset-highlight: 0;\n  --detail-icon-color: initial;\n  --detail-icon-font-size: 20px;\n  --detail-icon-opacity: 0.25;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  position: relative;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  text-align: initial;\n  text-decoration: none;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.ion-color) .item-native {\n  background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n:host(.ion-color) .item-native,\n:host(.ion-color) .item-inner {\n  border-color: var(--ion-color-shade); }\n\n:host(.activated) .item-native {\n  background: var(--background-activated); }\n\n:host(.ion-color.activated) .item-native {\n  background: var(--ion-color-tint); }\n\n:host(.item-disabled) {\n  cursor: default;\n  opacity: .3;\n  pointer-events: none; }\n\n.item-native {\n  border-radius: var(--border-radius);\n  margin: 0;\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) calc(var(--padding-start) + var(--ion-safe-area-left, 0px));\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex-align: center;\n  align-items: center;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: var(--min-height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbutton, a {\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-user-drag: none; }\n\n.item-inner {\n  margin: 0;\n  padding: var(--inner-padding-top) calc(var(--ion-safe-area-right, 0px) + var(--inner-padding-end)) var(--inner-padding-bottom) var(--inner-padding-start);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  min-height: inherit;\n  border-width: var(--inner-border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  -webkit-box-shadow: var(--inner-box-shadow);\n  box-shadow: var(--inner-box-shadow);\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.item-detail-icon {\n  color: var(--detail-icon-color);\n  font-size: var(--detail-icon-font-size);\n  opacity: var(--detail-icon-opacity); }\n\n::slotted(ion-icon) {\n  font-size: 1.6em; }\n\n::slotted(ion-button) {\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  z-index: 1; }\n\n:host([vertical-align-top]),\n:host(.item-input) {\n  -ms-flex-align: start;\n  align-items: flex-start; }\n\n.input-wrapper {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.item-label-stacked) .input-wrapper,\n:host(.item-label-floating) .input-wrapper {\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n.item-highlight,\n.item-inner-highlight {\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  background: var(--highlight-background); }\n\n.item-highlight {\n  height: var(--full-highlight-height); }\n\n.item-inner-highlight {\n  height: var(--inset-highlight-height); }\n\n:host(.item-interactive.item-has-focus) {\n  --highlight-background: var(--highlight-color-focused);\n  --full-highlight-height: calc(var(--highlight-height) * var(--show-full-highlight));\n  --inset-highlight-height: calc(var(--highlight-height) * var(--show-inset-highlight)); }\n\n:host(.item-interactive.ion-valid) {\n  --highlight-background: var(--highlight-color-valid); }\n\n:host(.item-interactive.ion-invalid) {\n  --highlight-background: var(--highlight-color-invalid); }\n\n:host(.item-label-stacked) ::slotted(ion-select),\n:host(.item-label-floating) ::slotted(ion-select) {\n  --padding-start: 0;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  width: 100%;\n  max-width: 100%; }\n\n:host(.item-label-stacked) ::slotted(ion-datetime),\n:host(.item-label-floating) ::slotted(ion-datetime) {\n  --padding-start: 0;\n  width: 100%; }\n\n:host(.item-multiple-inputs) ::slotted(ion-datetime),\n:host(.item-multiple-inputs) ::slotted(ion-select) {\n  position: relative; }\n\n:host(.item-textarea) {\n  -ms-flex-align: stretch;\n  align-items: stretch; }\n\n::slotted(ion-reorder[slot]) {\n  margin-top: 0;\n  margin-bottom: 0; }\n\n:host {\n  --min-height: 44px;\n  --transition: background-color 200ms linear;\n  --padding-start: 16px;\n  --inner-padding-end: 8px;\n  --inner-border-width: 0px 0px 0.55px 0px;\n  --background: var(--ion-item-background, var(--ion-background-color, #fff));\n  --background-activated: var(--ion-item-background-activated, #d9d9d9);\n  --border-color: var(--ion-item-border-color, var(--ion-border-color, #c8c7cc));\n  --color: var(--ion-item-color, var(--ion-text-color, #000));\n  --highlight-height: 0;\n  --highlight-color-focused: var(--ion-color-primary, #3880ff);\n  --highlight-color-valid: var(--ion-color-success, #10dc60);\n  --highlight-color-invalid: var(--ion-color-danger, #f04141);\n  font-size: 17px; }\n\n:host(.activated) {\n  --transition: none; }\n\n:host(.item-interactive) {\n  --show-full-highlight: 0;\n  --show-inset-highlight: 1; }\n\n:host(.item-lines-full) {\n  --border-width: 0px 0px 0.55px 0px;\n  --show-full-highlight: 1;\n  --show-inset-highlight: 0; }\n\n:host(.item-lines-inset) {\n  --inner-border-width: 0px 0px 0.55px 0px;\n  --show-full-highlight: 0;\n  --show-inset-highlight: 1; }\n\n:host(.item-lines-inset),\n:host(.item-lines-none) {\n  --border-width: 0px;\n  --show-full-highlight: 0; }\n\n:host(.item-lines-full),\n:host(.item-lines-none) {\n  --inner-border-width: 0px;\n  --show-inset-highlight: 0; }\n\n::slotted(:not(.interactive)[slot=\"start\"]) {\n  margin: 2px 16px 2px 0; }\n\n::slotted(:not(.interactive)[slot=\"end\"]) {\n  margin-left: 8px;\n  margin-right: 8px; }\n\n::slotted(ion-icon[slot=\"start\"]),\n::slotted(ion-icon[slot=\"end\"]) {\n  margin-left: 0;\n  margin-top: 7px;\n  margin-bottom: 7px; }\n\n:host(.item-label-stacked) ::slotted([slot=\"end\"]),\n:host(.item-label-floating) ::slotted([slot=\"end\"]) {\n  margin-top: 7px;\n  margin-bottom: 7px; }\n\n::slotted(.button-small) {\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --padding-start: .5em;\n  --padding-end: .5em;\n  --height: 24px;\n  font-size: 13px; }\n\n::slotted(ion-avatar) {\n  width: 36px;\n  height: 36px; }\n\n::slotted(ion-thumbnail) {\n  width: 56px;\n  height: 56px; }\n\n::slotted(ion-avatar[slot=\"end\"]),\n::slotted(ion-thumbnail[slot=\"end\"]) {\n  margin: 8px; }\n\n:host(.item-radio) ::slotted(ion-label),\n:host(.item-toggle) ::slotted(ion-label) {\n  margin-left: 0px; }\n\n:host(.item-label-floating),\n:host(.item-label-stacked) {\n  --min-height: 68px; }\n\n:host(.item-label-stacked) ::slotted(ion-input),\n:host(.item-label-floating) ::slotted(ion-input),\n:host(.item-label-stacked) ::slotted(ion-textarea),\n:host(.item-label-floating) ::slotted(ion-textarea),\n:host(.item-label-stacked) ::slotted(ion-select),\n:host(.item-label-floating) ::slotted(ion-select) {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  --padding-start: 0px; }"; }
    static get styleMode() { return "ios"; }
}

class Label {
    constructor() {
        this.noAnimate = false;
    }
    componentWillLoad() {
        this.noAnimate = (this.position === "floating");
        this.emitStyle();
    }
    componentDidLoad() {
        if (this.noAnimate) {
            setTimeout(() => {
                this.noAnimate = false;
            }, 1000);
        }
    }
    positionChanged() {
        this.emitStyle();
    }
    emitStyle() {
        const position = this.position;
        this.ionStyle.emit({
            "label": true,
            [`label-${position}`]: !!position
        });
    }
    hostData() {
        const position = this.position;
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`label-${position}`]: !!position, [`label-no-animate`]: (this.noAnimate) })
        };
    }
    static get is() { return "ion-label"; }
    static get encapsulation() { return "scoped"; }
    static get properties() {
        return {
            "color": {
                "type": String,
                "attr": "color"
            },
            "el": {
                "elementRef": true
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "noAnimate": {
                "state": true
            },
            "position": {
                "type": String,
                "attr": "position",
                "watchCallbacks": ["positionChanged"]
            }
        };
    }
    static get events() {
        return [{
                "name": "ionStyle",
                "method": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ".item.sc-ion-label-ios-h, .item   .sc-ion-label-ios-h {\n  \n  --color: initial;\n  margin: 0;\n  display: block;\n  -ms-flex: 1;\n  flex: 1;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  font-size: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.ion-color.sc-ion-label-ios-h {\n  color: var(--ion-color-base); }\n\n[text-wrap].sc-ion-label-ios-h {\n  white-space: normal; }\n\n.item-interactive-disabled.sc-ion-label-ios-h, .item-interactive-disabled   .sc-ion-label-ios-h {\n  cursor: default;\n  opacity: .3;\n  pointer-events: none; }\n\n.item-input.sc-ion-label-ios-h, .item-input   .sc-ion-label-ios-h {\n  -ms-flex: initial;\n  flex: initial;\n  max-width: 200px;\n  pointer-events: none; }\n\n.label-fixed.sc-ion-label-ios-h {\n  -ms-flex: 0 0 100px;\n  flex: 0 0 100px;\n  width: 100px;\n  min-width: 100px;\n  max-width: 200px; }\n\n.label-stacked.sc-ion-label-ios-h, .label-floating.sc-ion-label-ios-h {\n  margin-bottom: 0;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  width: auto;\n  max-width: 100%; }\n\n.item-has-focus.label-floating.sc-ion-label-ios-h, .item-has-focus   .label-floating.sc-ion-label-ios-h, .item-has-placeholder.label-floating.sc-ion-label-ios-h, .item-has-placeholder   .label-floating.sc-ion-label-ios-h, .item-has-value.label-floating.sc-ion-label-ios-h, .item-has-value   .label-floating.sc-ion-label-ios-h {\n  -webkit-transform: translate3d(0,  0,  0) scale(0.8);\n  transform: translate3d(0,  0,  0) scale(0.8); }\n\n.label-no-animate.label-floating.sc-ion-label-ios-h {\n  -webkit-transition: none;\n  transition: none; }\n\n.item.sc-ion-label-ios-h, .item   .sc-ion-label-ios-h {\n  margin: 10px 8px 10px 0; }\n\n[text-wrap].sc-ion-label-ios-h {\n  font-size: 14px;\n  line-height: 1.5; }\n\n.label-stacked.sc-ion-label-ios-h {\n  margin-bottom: 4px;\n  font-size: 13.6px; }\n\n.label-floating.sc-ion-label-ios-h {\n  margin-bottom: 0;\n  -webkit-transform: translate3d(0,  27px,  0);\n  transform: translate3d(0,  27px,  0);\n  -webkit-transform-origin: left top;\n  transform-origin: left top;\n  -webkit-transition: -webkit-transform 150ms ease-in-out;\n  transition: -webkit-transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out; }\n\n.sc-ion-label-ios-s  h1  {\n  margin: 0 0 2px;\n  font-size: 24px;\n  font-weight: normal; }\n\n.sc-ion-label-ios-s  h2  {\n  margin: 0 0 2px;\n  font-size: 17px;\n  font-weight: normal; }\n\n.sc-ion-label-ios-s  h3 , .sc-ion-label-ios-s  h4 , .sc-ion-label-ios-s  h5 , .sc-ion-label-ios-s  h6  {\n  margin: 0 0 3px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: normal; }\n\n.sc-ion-label-ios-s  p  {\n  margin: 0 0 2px;\n  font-size: 14px;\n  line-height: normal;\n  text-overflow: inherit;\n  overflow: inherit; }\n\n.sc-ion-label-ios-s > p {\n  color: var(--ion-text-color-step-600, #999999); }\n\n.sc-ion-label-ios-h.ion-color.sc-ion-label-ios-s > p, .ion-color .sc-ion-label-ios-h.sc-ion-label-ios-s > p {\n  color: inherit; }\n\n.sc-ion-label-ios-s  h2:last-child , .sc-ion-label-ios-s  h3:last-child , .sc-ion-label-ios-s  h4:last-child , .sc-ion-label-ios-s  h5:last-child , .sc-ion-label-ios-s  h6:last-child , .sc-ion-label-ios-s  p:last-child  {\n  margin-bottom: 0; }"; }
    static get styleMode() { return "ios"; }
}

class List {
    constructor() {
        this.inset = false;
    }
    async closeSlidingItems() {
        const item = this.el.querySelector("ion-item-sliding");
        if (item && item.closeOpened) {
            return item.closeOpened();
        }
        return false;
    }
    hostData() {
        return {
            class: Object.assign({}, createThemedClasses(this.mode, "list"), { [`list-lines-${this.lines}`]: !!this.lines, "list-inset": this.inset, [`list-${this.mode}-lines-${this.lines}`]: !!this.lines })
        };
    }
    static get is() { return "ion-list"; }
    static get properties() {
        return {
            "closeSlidingItems": {
                "method": true
            },
            "el": {
                "elementRef": true
            },
            "inset": {
                "type": Boolean,
                "attr": "inset"
            },
            "lines": {
                "type": String,
                "attr": "lines"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            }
        };
    }
    static get style() { return "ion-list {\n  margin: 0;\n  padding: 0;\n  display: block;\n  contain: content;\n  list-style-type: none; }\n\nion-list.list-inset {\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  overflow: hidden; }\n\n.list-ios {\n  margin: -1px 0 32px;\n  background: var(--ion-item-background, var(--ion-background-color, #fff)); }\n\n.list-ios:not(.list-inset):not(.list-ios-lines-none) .item:last-child {\n  --inner-border-width: 0;\n  --border-width: 0 0 0.55px 0; }\n\n.list-ios.list-inset {\n  margin: 16px;\n  border-radius: 4px; }\n\n.list-ios.list-inset ion-item {\n  --border-width: 0 0 1px 0;\n  --inner-border-width: 0; }\n\n.list-ios.list-inset ion-item:last-child {\n  --border-width: 0;\n  --inner-border-width: 0; }\n\n.list-ios.list-inset + ion-list.list-inset {\n  margin-top: 0; }\n\n.list-ios-lines-none .item {\n  --border-width: 0;\n  --inner-border-width: 0; }\n\n.list-ios-lines-full .item,\n.list-ios .item-lines-full {\n  --border-width: 0 0 0.55px 0; }\n\n.list-ios-lines-full .item {\n  --inner-border-width: 0; }\n\n.list-ios-lines-inset .item,\n.list-ios .item-lines-inset {\n  --inner-border-width: 0 0 0.55px 0; }\n\n.list-ios .item-lines-inset {\n  --border-width: 0; }\n\n.list-ios .item-lines-full {\n  --inner-border-width: 0; }"; }
    static get styleMode() { return "ios"; }
}

class MenuToggle {
    constructor() {
        this.visible = false;
        this.autoHide = true;
    }
    componentDidLoad() {
        return this.updateVisibility();
    }
    async onClick() {
        const menuCtrl = await getMenuController(this.doc);
        if (menuCtrl) {
            const menu = await menuCtrl.get(this.menu);
            if (menu) {
                menuCtrl.toggle(this.menu);
            }
        }
    }
    async updateVisibility() {
        const menuCtrl = await getMenuController(this.doc);
        if (menuCtrl) {
            const menu = await menuCtrl.get(this.menu);
            if (menu && await menu.isActive()) {
                this.visible = true;
                return;
            }
        }
        this.visible = false;
    }
    hostData() {
        const hidden = this.autoHide && !this.visible;
        return {
            "aria-hidden": hidden ? "true" : null,
            class: {
                "menu-toggle-hidden": hidden,
            }
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-menu-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "autoHide": {
                "type": Boolean,
                "attr": "auto-hide"
            },
            "doc": {
                "context": "document"
            },
            "menu": {
                "type": String,
                "attr": "menu"
            },
            "visible": {
                "state": true
            }
        };
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClick"
            }, {
                "name": "body:ionMenuChange",
                "method": "updateVisibility"
            }, {
                "name": "body:ionSplitPaneVisible",
                "method": "updateVisibility"
            }];
    }
    static get style() { return ":host(.menu-toggle-hidden) {\n  display: none; }"; }
}
function getMenuController(doc) {
    const menuControllerElement = doc.querySelector("ion-menu-controller");
    if (!menuControllerElement) {
        return Promise.resolve(undefined);
    }
    return menuControllerElement.componentOnReady();
}

export { Button as IonButton, Item as IonItem, Label as IonLabel, List as IonList, MenuToggle as IonMenuToggle };
