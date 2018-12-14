/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as GESTURE_CONTROLLER } from './chunk-647a6bad.js';
import { h as now } from './chunk-f2ab991b.js';

class Backdrop {
    constructor() {
        this.lastClick = -10000;
        this.blocker = GESTURE_CONTROLLER.createBlocker({
            disableScroll: true
        });
        this.visible = true;
        this.tappable = true;
        this.stopPropagation = true;
    }
    componentDidLoad() {
        if (this.stopPropagation) {
            this.blocker.block();
        }
    }
    componentDidUnload() {
        this.blocker.destroy();
    }
    onTouchStart(ev) {
        this.lastClick = now(ev);
        this.emitTap(ev);
    }
    onMouseDown(ev) {
        if (this.lastClick < now(ev) - 2500) {
            this.emitTap(ev);
        }
    }
    emitTap(ev) {
        if (this.stopPropagation) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        if (this.tappable) {
            this.ionBackdropTap.emit();
        }
    }
    hostData() {
        return {
            tabindex: "-1",
            class: {
                "backdrop-hide": !this.visible,
                "backdrop-no-tappable": !this.tappable,
            }
        };
    }
    static get is() { return "ion-backdrop"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "doc": {
                "context": "document"
            },
            "stopPropagation": {
                "type": Boolean,
                "attr": "stop-propagation"
            },
            "tappable": {
                "type": Boolean,
                "attr": "tappable"
            },
            "visible": {
                "type": Boolean,
                "attr": "visible"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionBackdropTap",
                "method": "ionBackdropTap",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "touchstart",
                "method": "onTouchStart",
                "capture": true
            }, {
                "name": "click",
                "method": "onMouseDown",
                "capture": true
            }, {
                "name": "mousedown",
                "method": "onMouseDown",
                "capture": true
            }];
    }
    static get style() { return ":host {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: block;\n  position: absolute;\n  -webkit-transform: translateZ(0);\n  transform: translateZ(0);\n  contain: strict;\n  cursor: pointer;\n  opacity: .01;\n  -ms-touch-action: none;\n  touch-action: none;\n  z-index: 2; }\n\n:host(.backdrop-hide) {\n  background: transparent; }\n\n:host(.backdrop-no-tappable) {\n  cursor: auto; }\n\n:host {\n  background-color: var(--ion-backdrop-color, #000); }"; }
    static get styleMode() { return "ios"; }
}

export { Backdrop as IonBackdrop };
