/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as Subject } from './chunk-c0d1889f.js';
import { a as debounceEvent, b as findItemLabel, c as renderHiddenInput, k as createColorClasses, l as hostContext } from './chunk-f2ab991b.js';

const nav = document.querySelector('ion-nav');
class AppAddGame {
    constructor() {
        this.newGame = { name: '' };
    }
    addGameCompletedHandler(newDocRef) {
        nav.pop();
    }
    changeValue(ev) {
        let value = ev.target.value;
        switch (ev.target.name) {
            case 'name': {
                this.newGame.name = value;
                break;
            }
        }
    }
    requestAddGame() {
        var requestStatus = new Subject();
        var requestSubscription = requestStatus.subscribe((newGameRef) => (null), () => console.log("Error adding game"), () => nav.pop());
        var request = { data: this.newGame, status: requestStatus };
        this.addGameRequested.emit(request);
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-button", { href: "/" },
                            h("ion-icon", { slot: "icon-only", name: "close" }))),
                    h("ion-title", null, "Add Game"))),
            h("ion-content", { padding: true },
                h("ion-list", null,
                    h("ion-item", null,
                        h("ion-label", { position: "floating" }, "Name"),
                        h("ion-input", { name: "name", onInput: (ev) => this.changeValue(ev), type: "text" }))),
                h("ion-button", { onClick: () => this.requestAddGame() }, "Add Game"))
        ];
    }
    static get is() { return "app-add-game"; }
    static get events() { return [{
            "name": "addGameRequested",
            "method": "addGameRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "addGameCompleted",
            "method": "addGameCompletedHandler"
        }]; }
    static get style() { return ""; }
}

class Input {
    constructor() {
        this.inputId = `ion-input-${inputIds++}`;
        this.didBlurAfterEdit = false;
        this.hasFocus = false;
        this.autocapitalize = "off";
        this.autocomplete = "off";
        this.autocorrect = "off";
        this.autofocus = false;
        this.clearInput = false;
        this.debounce = 0;
        this.disabled = false;
        this.name = this.inputId;
        this.readonly = false;
        this.required = false;
        this.spellcheck = false;
        this.type = "text";
        this.value = "";
        this.onInput = (ev) => {
            const input = ev.target;
            if (input) {
                this.value = input.value || "";
            }
            this.ionInput.emit(ev);
        };
        this.onBlur = () => {
            this.hasFocus = false;
            this.focusChanged();
            this.emitStyle();
            this.ionBlur.emit();
        };
        this.onFocus = () => {
            this.hasFocus = true;
            this.focusChanged();
            this.emitStyle();
            this.ionFocus.emit();
        };
        this.onKeydown = () => {
            if (this.clearOnEdit) {
                if (this.didBlurAfterEdit && this.hasValue()) {
                    this.clearTextInput();
                }
                this.didBlurAfterEdit = false;
            }
        };
        this.clearTextInput = () => {
            this.value = "";
        };
    }
    debounceChanged() {
        this.ionChange = debounceEvent(this.ionChange, this.debounce);
    }
    disabledChanged() {
        this.emitStyle();
    }
    valueChanged() {
        this.emitStyle();
        this.ionChange.emit({ value: this.value });
    }
    componentWillLoad() {
        if (this.clearOnEdit === undefined && this.type === "password") {
            this.clearOnEdit = true;
        }
        this.emitStyle();
    }
    componentDidLoad() {
        this.debounceChanged();
        this.ionInputDidLoad.emit();
    }
    componentDidUnload() {
        this.ionInputDidUnload.emit();
    }
    setFocus() {
        if (this.nativeInput) {
            this.nativeInput.focus();
        }
    }
    getValue() {
        return this.value || "";
    }
    emitStyle() {
        this.ionStyle.emit({
            "interactive": true,
            "input": true,
            "has-placeholder": this.placeholder != null,
            "has-value": this.hasValue(),
            "has-focus": this.hasFocus,
            "interactive-disabled": this.disabled,
        });
    }
    focusChanged() {
        if (this.clearOnEdit && !this.hasFocus && this.hasValue()) {
            this.didBlurAfterEdit = true;
        }
    }
    hasValue() {
        return this.getValue().length > 0;
    }
    hostData() {
        return {
            "aria-disabled": this.disabled ? "true" : null,
            class: Object.assign({}, createColorClasses(this.color), { "in-item": hostContext("ion-item", this.el), "has-value": this.hasValue(), "has-focus": this.hasFocus })
        };
    }
    render() {
        const value = this.getValue();
        renderHiddenInput(false, this.el, this.name, value, this.disabled);
        const labelId = this.inputId + "-lbl";
        const label = findItemLabel(this.el);
        if (label) {
            label.id = labelId;
        }
        return [
            h("input", { class: "native-input", ref: input => this.nativeInput = input, "aria-labelledby": labelId, disabled: this.disabled, accept: this.accept, autoCapitalize: this.autocapitalize, autoComplete: this.autocomplete, autoCorrect: this.autocorrect, autoFocus: this.autofocus, inputMode: this.inputmode, min: this.min, max: this.max, minLength: this.minlength, maxLength: this.maxlength, multiple: this.multiple, name: this.name, pattern: this.pattern, placeholder: this.placeholder || "", readOnly: this.readonly, required: this.required, spellCheck: this.spellcheck, step: this.step, size: this.size, type: this.type, value: value, onInput: this.onInput, onBlur: this.onBlur, onFocus: this.onFocus, onKeyDown: this.onKeydown }),
            (this.clearInput && !this.readonly && !this.disabled) && h("button", { type: "button", class: "input-clear-icon", tabindex: "-1", onTouchStart: this.clearTextInput, onMouseDown: this.clearTextInput })
        ];
    }
    static get is() { return "ion-input"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "accept": {
                "type": String,
                "attr": "accept"
            },
            "autocapitalize": {
                "type": String,
                "attr": "autocapitalize"
            },
            "autocomplete": {
                "type": String,
                "attr": "autocomplete"
            },
            "autocorrect": {
                "type": String,
                "attr": "autocorrect"
            },
            "autofocus": {
                "type": Boolean,
                "attr": "autofocus"
            },
            "clearInput": {
                "type": Boolean,
                "attr": "clear-input"
            },
            "clearOnEdit": {
                "type": Boolean,
                "attr": "clear-on-edit",
                "mutable": true
            },
            "color": {
                "type": String,
                "attr": "color"
            },
            "debounce": {
                "type": Number,
                "attr": "debounce",
                "watchCallbacks": ["debounceChanged"]
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "watchCallbacks": ["disabledChanged"]
            },
            "el": {
                "elementRef": true
            },
            "hasFocus": {
                "state": true
            },
            "inputmode": {
                "type": String,
                "attr": "inputmode"
            },
            "max": {
                "type": String,
                "attr": "max"
            },
            "maxlength": {
                "type": Number,
                "attr": "maxlength"
            },
            "min": {
                "type": String,
                "attr": "min"
            },
            "minlength": {
                "type": Number,
                "attr": "minlength"
            },
            "mode": {
                "type": String,
                "attr": "mode"
            },
            "multiple": {
                "type": Boolean,
                "attr": "multiple"
            },
            "name": {
                "type": String,
                "attr": "name"
            },
            "pattern": {
                "type": String,
                "attr": "pattern"
            },
            "placeholder": {
                "type": String,
                "attr": "placeholder"
            },
            "readonly": {
                "type": Boolean,
                "attr": "readonly"
            },
            "required": {
                "type": Boolean,
                "attr": "required"
            },
            "setFocus": {
                "method": true
            },
            "size": {
                "type": Number,
                "attr": "size"
            },
            "spellcheck": {
                "type": Boolean,
                "attr": "spellcheck"
            },
            "step": {
                "type": String,
                "attr": "step"
            },
            "type": {
                "type": String,
                "attr": "type"
            },
            "value": {
                "type": String,
                "attr": "value",
                "mutable": true,
                "watchCallbacks": ["valueChanged"]
            }
        };
    }
    static get events() {
        return [{
                "name": "ionInput",
                "method": "ionInput",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionChange",
                "method": "ionChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionBlur",
                "method": "ionBlur",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionFocus",
                "method": "ionFocus",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionInputDidLoad",
                "method": "ionInputDidLoad",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionInputDidUnload",
                "method": "ionInputDidUnload",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionStyle",
                "method": "ionStyle",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the input\n   * \@prop --color: Color of the input text\n   * \@prop --padding-top: Top padding of the input\n   * \@prop --padding-end: End padding of the input\n   * \@prop --padding-bottom: Bottom padding of the input\n   * \@prop --padding-start: Start padding of the input\n   * \@prop --placeholder-color: Color of the input placeholder text\n   * \@prop --placeholder-font-style: Font style of the input placeholder text\n   * \@prop --placeholder-font-weight: Font weight of the input placeholder text\n   * \@prop --placeholder-opacity: Opacity of the input placeholder text\n   */\n  --placeholder-color: initial;\n  --placeholder-font-style: initial;\n  --placeholder-font-weight: initial;\n  --placeholder-opacity: .5;\n  --padding-top: 0;\n  --padding-end: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --background: transparent;\n  --color: initial;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -ms-flex: 1;\n  flex: 1;\n  -ms-flex-align: center;\n  align-items: center;\n  width: 100%;\n  /* stylelint-disable */\n  /* TODO: find a better solution in padding.css, that does not require !important, */\n  padding: 0 !important;\n  background: var(--background);\n  color: var(--color);\n  /* stylelint-enable */\n  font-family: var(--ion-font-family, inherit);\n  z-index: 2; }\n\n:host(.ion-color) {\n  color: var(--ion-color-base); }\n\n.native-input {\n  border-radius: var(--border-radius);\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: inline-block;\n  -ms-flex: 1;\n  flex: 1;\n  width: 100%;\n  border: 0;\n  outline: none;\n  background: transparent;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n  .native-input::-webkit-input-placeholder {\n    color: var(--placeholder-color);\n    font-family: inherit;\n    font-style: var(--placeholder-font-style);\n    font-weight: var(--placeholder-font-weight);\n    opacity: var(--placeholder-opacity); }\n  .native-input:-ms-input-placeholder {\n    color: var(--placeholder-color);\n    font-family: inherit;\n    font-style: var(--placeholder-font-style);\n    font-weight: var(--placeholder-font-weight);\n    opacity: var(--placeholder-opacity); }\n  .native-input::-ms-input-placeholder {\n    color: var(--placeholder-color);\n    font-family: inherit;\n    font-style: var(--placeholder-font-style);\n    font-weight: var(--placeholder-font-weight);\n    opacity: var(--placeholder-opacity); }\n  .native-input::placeholder {\n    color: var(--placeholder-color);\n    font-family: inherit;\n    font-style: var(--placeholder-font-style);\n    font-weight: var(--placeholder-font-weight);\n    opacity: var(--placeholder-opacity); }\n  .native-input:-webkit-autofill {\n    background-color: transparent; }\n  .native-input:invalid {\n    -webkit-box-shadow: none;\n    box-shadow: none; }\n  .native-input::-ms-clear {\n    display: none; }\n\n.native-input[disabled] {\n  opacity: .4; }\n\n.cloned-input {\n  left: 0;\n  top: 0;\n  position: absolute;\n  pointer-events: none; }\n\n.input-clear-icon {\n  margin: 0;\n  padding: 0;\n  background-position: center;\n  border: 0;\n  outline: none;\n  background-color: transparent;\n  background-repeat: no-repeat;\n  visibility: hidden;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none; }\n\n:host(.has-focus.has-value) .input-clear-icon {\n  visibility: visible; }\n\n:host(.has-focus) {\n  pointer-events: none; }\n\n:host(.has-focus) input,\n:host(.has-focus) a,\n:host(.has-focus) button {\n  pointer-events: auto; }\n\n:host {\n  --padding-top: 10px;\n  --padding-end: 0;\n  --padding-bottom: 11px;\n  --padding-start: 8px;\n  font-size: inherit; }\n\n.input-clear-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf-8,<svg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'><polygon%20fill='var(--ion-text-color-step-400,%20%23666666)'%20points='405,136.798%20375.202,107%20256,226.202%20136.798,107%20107,136.798%20226.202,256%20107,375.202%20136.798,405%20256,285.798%20375.202,405%20405,375.202%20285.798,256'/></svg>\");\n  width: 30px;\n  height: 30px;\n  background-size: 22px; }"; }
    static get styleMode() { return "md"; }
}
let inputIds = 0;

export { AppAddGame, Input as IonInput };
