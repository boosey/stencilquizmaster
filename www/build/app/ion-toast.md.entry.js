/*! Built with http://stenciljs.com */
const { h } = window.App;

import { b as dismiss, c as eventMethod, d as present } from './chunk-1004ea03.js';
import { k as createColorClasses, n as getClassMap } from './chunk-f2ab991b.js';

function iosEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', top);
            break;
        case 'middle':
            const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', bottom);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.155,1.105,.295,1.12)')
        .duration(400)
        .add(wrapperAnimation));
}

function iosLeaveAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(-10px - var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(10px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', top, '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', bottom, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

function mdEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    const bottom = `calc(8px + var(--ion-safe-area-bottom, 0px))`;
    const top = `calc(8px + var(--ion-safe-area-top, 0px))`;
    switch (position) {
        case 'top':
            wrapperEl.style.top = top;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        case 'middle':
            const topPosition = Math.floor(hostEl.clientHeight / 2 - wrapperEl.clientHeight / 2);
            wrapperEl.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperEl.style.bottom = bottom;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(wrapperAnimation));
}

function mdLeaveAnimation(AnimationC, baseEl) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const hostEl = baseEl.host || baseEl;
    const wrapperEl = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEl);
    wrapperAnimation.fromTo('opacity', 0.99, 0);
    return Promise.resolve(baseAnimation
        .addElement(hostEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

class Toast {
    constructor() {
        this.presented = false;
        this.duration = 0;
        this.keyboardClose = false;
        this.position = "bottom";
        this.showCloseButton = false;
        this.translucent = false;
        this.animated = true;
    }
    componentDidLoad() {
        this.ionToastDidLoad.emit();
    }
    componentDidUnload() {
        this.ionToastDidUnload.emit();
    }
    async present() {
        await present(this, "toastEnter", iosEnterAnimation, mdEnterAnimation, this.position);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(undefined, "timeout"), this.duration);
        }
    }
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, "toastLeave", iosLeaveAnimation, mdLeaveAnimation, this.position);
    }
    onDidDismiss() {
        return eventMethod(this.el, "ionToastDidDismiss");
    }
    onWillDismiss() {
        return eventMethod(this.el, "ionToastWillDismiss");
    }
    hostData() {
        return {
            style: {
                zIndex: 60000 + this.overlayIndex,
            },
            class: Object.assign({}, createColorClasses(this.color), getClassMap(this.cssClass), { "toast-translucent": this.translucent })
        };
    }
    render() {
        const wrapperClass = {
            "toast-wrapper": true,
            [`toast-${this.position}`]: true
        };
        return (h("div", { class: wrapperClass }, h("div", { class: "toast-container" }, this.message !== undefined &&
            h("div", { class: "toast-message" }, this.message), this.showCloseButton &&
            h("ion-button", { fill: "clear", "ion-activatable": true, class: "toast-button", onClick: () => this.dismiss(undefined, "cancel") }, this.closeButtonText || "Close"))));
    }
    static get is() { return "ion-toast"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "animated": {
                "type": Boolean,
                "attr": "animated"
            },
            "animationCtrl": {
                "connect": "ion-animation-controller"
            },
            "closeButtonText": {
                "type": String,
                "attr": "close-button-text"
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "config": {
                "context": "config"
            },
            "cssClass": {
                "type": String,
                "attr": "css-class"
            },
            "dismiss": {
                "method": true
            },
            "duration": {
                "type": Number,
                "attr": "duration"
            },
            "el": {
                "elementRef": true
            },
            "enterAnimation": {
                "type": "Any",
                "attr": "enter-animation"
            },
            "keyboardClose": {
                "type": Boolean,
                "attr": "keyboard-close"
            },
            "leaveAnimation": {
                "type": "Any",
                "attr": "leave-animation"
            },
            "message": {
                "type": String,
                "attr": "message"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "onDidDismiss": {
                "method": true
            },
            "onWillDismiss": {
                "method": true
            },
            "overlayIndex": {
                "type": Number,
                "attr": "overlay-index"
            },
            "position": {
                "type": String,
                "attr": "position"
            },
            "present": {
                "method": true
            },
            "showCloseButton": {
                "type": Boolean,
                "attr": "show-close-button"
            },
            "translucent": {
                "type": Boolean,
                "attr": "translucent"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionToastDidLoad",
                "method": "ionToastDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastDidPresent",
                "method": "didPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastWillPresent",
                "method": "willPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastWillDismiss",
                "method": "willDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastDidDismiss",
                "method": "didDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionToastDidUnload",
                "method": "ionToastDidUnload",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the toast\n   * \@prop --button-color: Color of the button text\n   * \@prop --color: Color of the toast text\n   */\n  --button-color: inherit;\n  left: 0;\n  top: 0;\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  color: var(--color);\n  font-family: var(--ion-font-family, inherit);\n  contain: strict;\n  z-index: 1000;\n  pointer-events: none; }\n\n:host(.ion-color) {\n  --color: var(--ion-color-contrast);\n  --background: var(--ion-color-base);\n  --button-color: inherit; }\n\n.toast-wrapper {\n  background: var(--background); }\n\n.toast-container {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  pointer-events: auto;\n  contain: content; }\n\n.toast-button {\n  color: var(--button-color); }\n\n.toast-message {\n  -ms-flex: 1;\n  flex: 1;\n  white-space: pre; }\n\n:host {\n  --button-color: var(--ion-color-primary, #3880ff);\n  --background: var(--ion-text-color-step-200, #333333);\n  --color: var(--ion-background-color-step-50, #f2f2f2);\n  font-size: 14px; }\n\n.toast-wrapper {\n  border-radius: 4px;\n  left: 8px;\n  right: 8px;\n  margin: auto;\n  display: block;\n  position: absolute;\n  max-width: 700px;\n  -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);\n  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);\n  opacity: .01;\n  z-index: 10; }\n\n.toast-message {\n  padding: 14px 16px;\n  line-height: 20px; }\n\n.toast-button {\n  --margin-end: 0; }"; }
    static get styleMode() { return "md"; }
}

export { Toast as IonToast };
