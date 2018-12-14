/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as GESTURE_CONTROLLER } from './chunk-647a6bad.js';
import { a as now, b as hasShadowDom, c as assert, d as isEndSide, g as createColorClasses, h as openURL, i as createThemedClasses } from './chunk-4d8c34e4.js';

class AppMainMenu {
    constructor() {
        this.user = null;
        this.menu = null;
    }
    close() {
        this.menu && this.menu.close();
    }
    render() {
        return [
            h("ion-menu", { side: "start", contentId: "mainmenu", ref: (el) => this.menu = el },
                h("ion-header", null,
                    h("ion-toolbar", null,
                        h("ion-menu-toggle", null,
                            h("ion-button", { fill: "clear" },
                                h("ion-icon", { slot: "start", name: "close" }))))),
                h("ion-content", { id: "mainmenu" },
                    h("ion-list", null,
                        h("ion-item", null,
                            h("stencil-route-link", { url: '/' },
                                h("ion-button", { fill: "clear" }, "Games"))),
                        (this.user === null) ?
                            h("ion-item", null,
                                h("ion-button", { fill: "clear", onClick: () => this.loginRequested.emit() }, "Login"))
                            :
                                h("ion-item", null,
                                    h("ion-button", { fill: "clear", onClick: () => this.logoutRequested.emit() }, "Logout")))))
        ];
    }
    static get is() { return "app-mainmenu"; }
    static get properties() { return {
        "close": {
            "method": true
        },
        "user": {
            "type": "Any",
            "attr": "user"
        }
    }; }
    static get events() { return [{
            "name": "loginRequested",
            "method": "loginRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "logoutRequested",
            "method": "logoutRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

function transitionEnd(el, callback) {
    let unRegTrans;
    const opts = { passive: true };
    function unregister() {
        if (unRegTrans) {
            unRegTrans();
        }
    }
    function onTransitionEnd(ev) {
        if (el === ev.target) {
            unregister();
            callback(ev);
        }
    }
    if (el) {
        el.addEventListener('webkitTransitionEnd', onTransitionEnd, opts);
        el.addEventListener('transitionend', onTransitionEnd, opts);
        unRegTrans = () => {
            el.removeEventListener('webkitTransitionEnd', onTransitionEnd, opts);
            el.removeEventListener('transitionend', onTransitionEnd, opts);
        };
    }
    return unregister;
}

const CSS_VALUE_REGEX = /(^-?\d*\.?\d*)(.*)/;
const DURATION_MIN = 32;
const TRANSITION_END_FALLBACK_PADDING_MS = 400;
const TRANSFORM_PROPS = {
    'translateX': 1,
    'translateY': 1,
    'translateZ': 1,
    'scale': 1,
    'scaleX': 1,
    'scaleY': 1,
    'scaleZ': 1,
    'rotate': 1,
    'rotateX': 1,
    'rotateY': 1,
    'rotateZ': 1,
    'skewX': 1,
    'skewY': 1,
    'perspective': 1
};
const raf = window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : (f) => f(Date.now());
class Animator {
    constructor() {
        this._hasDur = false;
        this._hasTweenEffect = false;
        this._isAsync = false;
        this._isReverse = false;
        this._destroyed = false;
        this.hasChildren = false;
        this.isPlaying = false;
        this.hasCompleted = false;
    }
    addElement(el) {
        if (el != null) {
            if (el.length > 0) {
                for (let i = 0; i < el.length; i++) {
                    this._addEl(el[i]);
                }
            }
            else {
                this._addEl(el);
            }
        }
        return this;
    }
    _addEl(el) {
        if (el.nodeType === 1) {
            (this._elements = this._elements || []).push(el);
        }
    }
    add(childAnimation) {
        childAnimation.parent = this;
        this.hasChildren = true;
        (this._childAnimations = this._childAnimations || []).push(childAnimation);
        return this;
    }
    getDuration(opts) {
        if (Animator.animated) {
            if (opts && opts.duration !== undefined) {
                return opts.duration;
            }
            else if (this._duration !== undefined) {
                return this._duration;
            }
            else if (this.parent) {
                return this.parent.getDuration();
            }
        }
        return 0;
    }
    isRoot() {
        return !this.parent;
    }
    duration(milliseconds) {
        this._duration = milliseconds;
        return this;
    }
    getEasing() {
        if (this._isReverse && this._reversedEasingName !== undefined) {
            return this._reversedEasingName;
        }
        return this._easingName !== undefined ? this._easingName : (this.parent && this.parent.getEasing()) || null;
    }
    easing(name) {
        this._easingName = name;
        return this;
    }
    easingReverse(name) {
        this._reversedEasingName = name;
        return this;
    }
    from(prop, val) {
        this._addProp('from', prop, val);
        return this;
    }
    to(prop, val, clearProperyAfterTransition = false) {
        const fx = this._addProp('to', prop, val);
        if (clearProperyAfterTransition) {
            this.afterClearStyles([fx.trans ? 'transform' : prop]);
        }
        return this;
    }
    fromTo(prop, fromVal, toVal, clearProperyAfterTransition) {
        return this.from(prop, fromVal).to(prop, toVal, clearProperyAfterTransition);
    }
    _getProp(name) {
        if (this._fxProperties) {
            return this._fxProperties.find(prop => prop.effectName === name);
        }
        return undefined;
    }
    _addProp(state, prop, val) {
        let fxProp = this._getProp(prop);
        if (!fxProp) {
            const shouldTrans = (TRANSFORM_PROPS[prop] === 1);
            fxProp = {
                effectName: prop,
                trans: shouldTrans,
                wc: (shouldTrans ? 'transform' : prop)
            };
            (this._fxProperties = this._fxProperties || []).push(fxProp);
        }
        const fxState = {
            val,
            num: 0,
            effectUnit: '',
        };
        fxProp[state] = fxState;
        if (typeof val === 'string' && val.indexOf(' ') < 0) {
            const r = val.match(CSS_VALUE_REGEX);
            if (r) {
                const num = parseFloat(r[1]);
                if (!isNaN(num)) {
                    fxState.num = num;
                }
                fxState.effectUnit = (r[0] !== r[2] ? r[2] : '');
            }
        }
        else if (typeof val === 'number') {
            fxState.num = val;
        }
        return fxProp;
    }
    beforeAddClass(className) {
        (this._beforeAddClasses = this._beforeAddClasses || []).push(className);
        return this;
    }
    beforeRemoveClass(className) {
        (this._beforeRemoveClasses = this._beforeRemoveClasses || []).push(className);
        return this;
    }
    beforeStyles(styles) {
        this._beforeStyles = styles;
        return this;
    }
    beforeClearStyles(propertyNames) {
        this._beforeStyles = this._beforeStyles || {};
        for (const prop of propertyNames) {
            this._beforeStyles[prop] = '';
        }
        return this;
    }
    beforeAddRead(domReadFn) {
        (this._readCallbacks = this._readCallbacks || []).push(domReadFn);
        return this;
    }
    beforeAddWrite(domWriteFn) {
        (this._writeCallbacks = this._writeCallbacks || []).push(domWriteFn);
        return this;
    }
    afterAddClass(className) {
        (this._afterAddClasses = this._afterAddClasses || []).push(className);
        return this;
    }
    afterRemoveClass(className) {
        (this._afterRemoveClasses = this._afterRemoveClasses || []).push(className);
        return this;
    }
    afterStyles(styles) {
        this._afterStyles = styles;
        return this;
    }
    afterClearStyles(propertyNames) {
        this._afterStyles = this._afterStyles || {};
        for (const prop of propertyNames) {
            this._afterStyles[prop] = '';
        }
        return this;
    }
    play(opts) {
        if (this._destroyed) {
            return;
        }
        this._isAsync = this._hasDuration(opts);
        this._clearAsync();
        this._playInit(opts);
        raf(() => {
            raf(() => {
                this._playDomInspect(opts);
            });
        });
    }
    playAsync(opts) {
        return new Promise(resolve => {
            this.onFinish(resolve, { oneTimeCallback: true, clearExistingCallbacks: true });
            this.play(opts);
            return this;
        });
    }
    playSync() {
        if (!this._destroyed) {
            const opts = { duration: 0 };
            this._isAsync = false;
            this._clearAsync();
            this._playInit(opts);
            this._playDomInspect(opts);
        }
    }
    _playInit(opts) {
        this._hasTweenEffect = false;
        this.isPlaying = true;
        this.hasCompleted = false;
        this._hasDur = (this.getDuration(opts) > DURATION_MIN);
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._playInit(opts);
            }
        }
        if (this._hasDur) {
            this._progress(0);
            this._willChange(true);
        }
    }
    _playDomInspect(opts) {
        this._beforeAnimation();
        const dur = this.getDuration(opts);
        if (this._isAsync) {
            this._asyncEnd(dur, true);
        }
        this._playProgress(opts);
        if (this._isAsync && !this._destroyed) {
            raf(() => {
                this._playToStep(1);
            });
        }
    }
    _playProgress(opts) {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._playProgress(opts);
            }
        }
        if (this._hasDur) {
            this._setTrans(this.getDuration(opts), false);
        }
        else {
            this._progress(1);
            this._setAfterStyles();
            this._didFinish(true);
        }
    }
    _playToStep(stepValue) {
        if (!this._destroyed) {
            const children = this._childAnimations;
            if (children) {
                for (const child of children) {
                    child._playToStep(stepValue);
                }
            }
            if (this._hasDur) {
                this._progress(stepValue);
            }
        }
    }
    _asyncEnd(dur, shouldComplete) {
        const self = this;
        function onTransitionEnd() {
            self._clearAsync();
            self._playEnd();
            self._didFinishAll(shouldComplete, true, false);
        }
        function onTransitionFallback() {
            console.debug('Animation onTransitionFallback, CSS onTransitionEnd did not fire!');
            self._timerId = undefined;
            self._clearAsync();
            self._playEnd(shouldComplete ? 1 : 0);
            self._didFinishAll(shouldComplete, true, false);
        }
        self._unregisterTrnsEnd = transitionEnd(self._transEl(), onTransitionEnd);
        self._timerId = setTimeout(onTransitionFallback, (dur + TRANSITION_END_FALLBACK_PADDING_MS));
    }
    _playEnd(stepValue) {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._playEnd(stepValue);
            }
        }
        if (this._hasDur) {
            if (stepValue !== undefined) {
                this._setTrans(0, true);
                this._progress(stepValue);
            }
            this._setAfterStyles();
            this._willChange(false);
        }
    }
    _hasDuration(opts) {
        if (this.getDuration(opts) > DURATION_MIN) {
            return true;
        }
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                if (child._hasDuration(opts)) {
                    return true;
                }
            }
        }
        return false;
    }
    _hasDomReads() {
        if (this._readCallbacks && this._readCallbacks.length > 0) {
            return true;
        }
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                if (child._hasDomReads()) {
                    return true;
                }
            }
        }
        return false;
    }
    stop(stepValue = 1) {
        this._clearAsync();
        this._hasDur = true;
        this._playEnd(stepValue);
    }
    _clearAsync() {
        if (this._unregisterTrnsEnd) {
            this._unregisterTrnsEnd();
        }
        if (this._timerId) {
            clearTimeout(this._timerId);
        }
        this._timerId = this._unregisterTrnsEnd = undefined;
    }
    _progress(stepValue) {
        let val;
        const elements = this._elements;
        const effects = this._fxProperties;
        if (!elements || elements.length === 0 || !effects || this._destroyed) {
            return;
        }
        if (this._isReverse) {
            stepValue = 1 - stepValue;
        }
        let i = 0;
        let j = 0;
        let finalTransform = '';
        let fx;
        for (i = 0; i < effects.length; i++) {
            fx = effects[i];
            if (fx.from && fx.to) {
                const fromNum = fx.from.num;
                const toNum = fx.to.num;
                const tweenEffect = (fromNum !== toNum);
                if (tweenEffect) {
                    this._hasTweenEffect = true;
                }
                if (stepValue === 0) {
                    val = fx.from.val;
                }
                else if (stepValue === 1) {
                    val = fx.to.val;
                }
                else if (tweenEffect) {
                    const valNum = (((toNum - fromNum) * stepValue) + fromNum);
                    const unit = fx.to.effectUnit;
                    val = valNum + unit;
                }
                if (val !== null) {
                    const prop = fx.effectName;
                    if (fx.trans) {
                        finalTransform += prop + '(' + val + ') ';
                    }
                    else {
                        for (j = 0; j < elements.length; j++) {
                            elements[j].style.setProperty(prop, val);
                        }
                    }
                }
            }
        }
        if (finalTransform.length > 0) {
            if (!this._isReverse && stepValue !== 1 || this._isReverse && stepValue !== 0) {
                finalTransform += 'translateZ(0px)';
            }
            for (i = 0; i < elements.length; i++) {
                elements[i].style.setProperty('transform', finalTransform);
            }
        }
    }
    _setTrans(dur, forcedLinearEasing) {
        const elements = this._elements;
        if (!elements || elements.length === 0 || !this._fxProperties) {
            return;
        }
        const easing = (forcedLinearEasing ? 'linear' : this.getEasing());
        const durString = dur + 'ms';
        for (const { style } of elements) {
            if (dur > 0) {
                style.transitionDuration = durString;
                if (easing !== null) {
                    style.transitionTimingFunction = easing;
                }
            }
            else {
                style.transitionDuration = '0';
            }
        }
    }
    _beforeAnimation() {
        this._fireBeforeReadFunc();
        this._fireBeforeWriteFunc();
        this._setBeforeStyles();
    }
    _setBeforeStyles() {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._setBeforeStyles();
            }
        }
        const elements = this._elements;
        if (!elements || elements.length === 0 || this._isReverse) {
            return;
        }
        const addClasses = this._beforeAddClasses;
        const removeClasses = this._beforeRemoveClasses;
        for (const el of elements) {
            const elementClassList = el.classList;
            if (addClasses) {
                for (const c of addClasses) {
                    elementClassList.add(c);
                }
            }
            if (removeClasses) {
                for (const c of removeClasses) {
                    elementClassList.remove(c);
                }
            }
            if (this._beforeStyles) {
                for (const [key, value] of Object.entries(this._beforeStyles)) {
                    el.style.setProperty(key, value);
                }
            }
        }
    }
    _fireBeforeReadFunc() {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._fireBeforeReadFunc();
            }
        }
        const readFunctions = this._readCallbacks;
        if (readFunctions) {
            for (const callback of readFunctions) {
                callback();
            }
        }
    }
    _fireBeforeWriteFunc() {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._fireBeforeWriteFunc();
            }
        }
        const writeFunctions = this._writeCallbacks;
        if (writeFunctions) {
            for (const callback of writeFunctions) {
                callback();
            }
        }
    }
    _setAfterStyles() {
        const elements = this._elements;
        if (!elements) {
            return;
        }
        for (const el of elements) {
            const elementClassList = el.classList;
            el.style.transitionDuration = el.style.transitionTimingFunction = '';
            if (this._isReverse) {
                const beforeAddClasses = this._beforeAddClasses;
                if (beforeAddClasses) {
                    for (const c of beforeAddClasses) {
                        elementClassList.remove(c);
                    }
                }
                const beforeRemoveClasses = this._beforeRemoveClasses;
                if (beforeRemoveClasses) {
                    for (const c of beforeRemoveClasses) {
                        elementClassList.add(c);
                    }
                }
                const beforeStyles = this._beforeStyles;
                if (beforeStyles) {
                    for (const propName of Object.keys(beforeStyles)) {
                        el.style.removeProperty(propName);
                    }
                }
            }
            else {
                const afterAddClasses = this._afterAddClasses;
                if (afterAddClasses) {
                    for (const c of afterAddClasses) {
                        elementClassList.add(c);
                    }
                }
                const afterRemoveClasses = this._afterRemoveClasses;
                if (afterRemoveClasses) {
                    for (const c of afterRemoveClasses) {
                        elementClassList.remove(c);
                    }
                }
                const afterStyles = this._afterStyles;
                if (afterStyles) {
                    for (const [key, value] of Object.entries(afterStyles)) {
                        el.style.setProperty(key, value);
                    }
                }
            }
        }
    }
    _willChange(addWillChange) {
        let wc;
        const effects = this._fxProperties;
        let willChange;
        if (addWillChange && effects) {
            wc = [];
            for (const effect of effects) {
                const propWC = effect.wc;
                if (propWC === 'webkitTransform') {
                    wc.push('transform', '-webkit-transform');
                }
                else if (propWC !== undefined) {
                    wc.push(propWC);
                }
            }
            willChange = wc.join(',');
        }
        else {
            willChange = '';
        }
        const elements = this._elements;
        if (elements) {
            for (const el of elements) {
                el.style.setProperty('will-change', willChange);
            }
        }
    }
    progressStart() {
        this._clearAsync();
        this._beforeAnimation();
        this._progressStart();
    }
    _progressStart() {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._progressStart();
            }
        }
        this._setTrans(0, true);
        this._willChange(true);
    }
    progressStep(stepValue) {
        stepValue = Math.min(1, Math.max(0, stepValue));
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child.progressStep(stepValue);
            }
        }
        this._progress(stepValue);
    }
    progressEnd(shouldComplete, currentStepValue, dur = -1) {
        if (this._isReverse) {
            currentStepValue = 1 - currentStepValue;
        }
        const stepValue = shouldComplete ? 1 : 0;
        const diff = Math.abs(currentStepValue - stepValue);
        if (dur < 0) {
            dur = this._duration || 0;
        }
        else if (diff < 0.05) {
            dur = 0;
        }
        this._isAsync = (dur > 30);
        this._progressEnd(shouldComplete, stepValue, dur, this._isAsync);
        if (this._isAsync) {
            this._asyncEnd(dur, shouldComplete);
            if (!this._destroyed) {
                raf(() => {
                    this._playToStep(stepValue);
                });
            }
        }
    }
    _progressEnd(shouldComplete, stepValue, dur, isAsync) {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._progressEnd(shouldComplete, stepValue, dur, isAsync);
            }
        }
        if (!isAsync) {
            this._progress(stepValue);
            this._willChange(false);
            this._setAfterStyles();
            this._didFinish(shouldComplete);
        }
        else {
            this.isPlaying = true;
            this.hasCompleted = false;
            this._hasDur = true;
            this._willChange(true);
            this._setTrans(dur, false);
        }
    }
    onFinish(callback, opts) {
        if (opts && opts.clearExistingCallbacks) {
            this._onFinishCallbacks = this._onFinishOneTimeCallbacks = undefined;
        }
        if (opts && opts.oneTimeCallback) {
            this._onFinishOneTimeCallbacks = this._onFinishOneTimeCallbacks || [];
            this._onFinishOneTimeCallbacks.push(callback);
        }
        else {
            this._onFinishCallbacks = this._onFinishCallbacks || [];
            this._onFinishCallbacks.push(callback);
        }
        return this;
    }
    _didFinishAll(hasCompleted, finishAsyncAnimations, finishNoDurationAnimations) {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child._didFinishAll(hasCompleted, finishAsyncAnimations, finishNoDurationAnimations);
            }
        }
        if (finishAsyncAnimations && this._isAsync || finishNoDurationAnimations && !this._isAsync) {
            this._didFinish(hasCompleted);
        }
    }
    _didFinish(hasCompleted) {
        this.isPlaying = false;
        this.hasCompleted = hasCompleted;
        if (this._onFinishCallbacks) {
            for (const callback of this._onFinishCallbacks) {
                callback(this);
            }
        }
        if (this._onFinishOneTimeCallbacks) {
            for (const callback of this._onFinishOneTimeCallbacks) {
                callback(this);
            }
            this._onFinishOneTimeCallbacks.length = 0;
        }
    }
    reverse(shouldReverse = true) {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child.reverse(shouldReverse);
            }
        }
        this._isReverse = !!shouldReverse;
        return this;
    }
    destroy() {
        this._didFinish(false);
        this._destroyed = true;
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                child.destroy();
            }
        }
        this._clearAsync();
        if (this._elements) {
            this._elements.length = 0;
        }
        if (this._readCallbacks) {
            this._readCallbacks.length = 0;
        }
        if (this._writeCallbacks) {
            this._writeCallbacks.length = 0;
        }
        this.parent = undefined;
        if (this._childAnimations) {
            this._childAnimations.length = 0;
        }
        if (this._onFinishCallbacks) {
            this._onFinishCallbacks.length = 0;
        }
        if (this._onFinishOneTimeCallbacks) {
            this._onFinishOneTimeCallbacks.length = 0;
        }
    }
    _transEl() {
        const children = this._childAnimations;
        if (children) {
            for (const child of children) {
                const targetEl = child._transEl();
                if (targetEl) {
                    return targetEl;
                }
            }
        }
        return (this._hasTweenEffect &&
            this._hasDur &&
            this._elements !== undefined &&
            this._elements.length > 0 ?
            this._elements[0] : null);
    }
}
Animator.animated = true;

class AnimationControllerImpl {
    create(animationBuilder, baseEl, opts) {
        Animator.animated = this.config.getBoolean("animated", true);
        if (animationBuilder) {
            return animationBuilder(Animator, baseEl, opts);
        }
        return Promise.resolve(new Animator());
    }
    static get is() { return "ion-animation-controller"; }
    static get properties() {
        return {
            "config": {
                "context": "config"
            },
            "create": {
                "method": true
            }
        };
    }
}

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

class Menu {
    constructor() {
        this.lastOnEnd = 0;
        this.blocker = GESTURE_CONTROLLER.createBlocker({ disableScroll: true });
        this.isAnimating = false;
        this._isOpen = false;
        this.isPaneVisible = false;
        this.isEndSide = false;
        this.disabled = false;
        this.side = "start";
        this.swipeGesture = true;
        this.maxEdgeStart = 50;
    }
    typeChanged(type, oldType) {
        const contentEl = this.contentEl;
        if (contentEl) {
            if (oldType !== undefined) {
                contentEl.classList.remove(`menu-content-${oldType}`);
            }
            contentEl.classList.add(`menu-content-${type}`);
            contentEl.removeAttribute("style");
        }
        if (this.menuInnerEl) {
            this.menuInnerEl.removeAttribute("style");
        }
        this.animation = undefined;
    }
    disabledChanged() {
        this.updateState();
        this.ionMenuChange.emit({
            disabled: this.disabled,
            open: this._isOpen
        });
    }
    sideChanged() {
        this.isEndSide = isEndSide(this.win, this.side);
    }
    swipeGestureChanged() {
        this.updateState();
    }
    async componentWillLoad() {
        if (this.type === undefined) {
            this.type = this.config.get("menuType", this.mode === "ios" ? "reveal" : "overlay");
        }
        if (this.isServer) {
            this.disabled = true;
            return;
        }
        const menuCtrl = this.menuCtrl = await this.lazyMenuCtrl.componentOnReady().then(p => p._getInstance());
        const el = this.el;
        const parent = el.parentNode;
        const content = this.contentId !== undefined
            ? document.getElementById(this.contentId)
            : parent && parent.querySelector && parent.querySelector("[main]");
        if (!content || !content.tagName) {
            console.error("Menu: must have a \"content\" element to listen for drag events on.");
            return;
        }
        this.contentEl = content;
        content.classList.add("menu-content");
        this.typeChanged(this.type, undefined);
        this.sideChanged();
        menuCtrl._register(this);
        this.gesture = (await import("./gesture.js")).createGesture({
            el: this.doc,
            queue: this.queue,
            gestureName: "menu-swipe",
            gesturePriority: 40,
            threshold: 10,
            canStart: ev => this.canStart(ev),
            onWillStart: () => this.onWillStart(),
            onStart: () => this.onStart(),
            onMove: ev => this.onMove(ev),
            onEnd: ev => this.onEnd(ev),
        });
        this.updateState();
    }
    componentDidLoad() {
        this.ionMenuChange.emit({ disabled: this.disabled, open: this._isOpen });
    }
    componentDidUnload() {
        this.blocker.destroy();
        this.menuCtrl._unregister(this);
        if (this.animation) {
            this.animation.destroy();
        }
        if (this.gesture) {
            this.gesture.destroy();
        }
        this.animation = undefined;
        this.contentEl = this.backdropEl = this.menuInnerEl = undefined;
    }
    onSplitPaneChanged(ev) {
        this.isPaneVisible = ev.detail.isPane(this.el);
        this.updateState();
    }
    onBackdropClick(ev) {
        if (this.lastOnEnd < ev.timeStamp - 100) {
            const shouldClose = (ev.composedPath)
                ? !ev.composedPath().includes(this.menuInnerEl)
                : false;
            if (shouldClose) {
                ev.preventDefault();
                ev.stopPropagation();
                this.close();
            }
        }
    }
    isOpen() {
        return Promise.resolve(this._isOpen);
    }
    isActive() {
        return Promise.resolve(this._isActive());
    }
    open(animated = true) {
        return this.setOpen(true, animated);
    }
    close(animated = true) {
        return this.setOpen(false, animated);
    }
    toggle(animated = true) {
        return this.setOpen(!this._isOpen, animated);
    }
    setOpen(shouldOpen, animated = true) {
        return this.menuCtrl._setOpen(this, shouldOpen, animated);
    }
    async _setOpen(shouldOpen, animated = true) {
        if (!this._isActive() || this.isAnimating || shouldOpen === this._isOpen) {
            return false;
        }
        this.beforeAnimation(shouldOpen);
        await this.loadAnimation();
        await this.startAnimation(shouldOpen, animated);
        this.afterAnimation(shouldOpen);
        return true;
    }
    async loadAnimation() {
        const width = this.menuInnerEl.offsetWidth;
        if (width === this.width && this.animation !== undefined) {
            return;
        }
        this.width = width;
        if (this.animation) {
            this.animation.destroy();
            this.animation = undefined;
        }
        this.animation = await this.menuCtrl._createAnimation(this.type, this);
    }
    async startAnimation(shouldOpen, animated) {
        const ani = this.animation.reverse(!shouldOpen);
        if (animated) {
            await ani.playAsync();
        }
        else {
            ani.playSync();
        }
    }
    _isActive() {
        return !this.disabled && !this.isPaneVisible;
    }
    canSwipe() {
        return this.swipeGesture && !this.isAnimating && this._isActive();
    }
    canStart(detail) {
        if (!this.canSwipe()) {
            return false;
        }
        if (this._isOpen) {
            return true;
        }
        else if (this.menuCtrl.getOpenSync()) {
            return false;
        }
        return checkEdgeSide(this.win, detail.currentX, this.isEndSide, this.maxEdgeStart);
    }
    onWillStart() {
        this.beforeAnimation(!this._isOpen);
        return this.loadAnimation();
    }
    onStart() {
        if (!this.isAnimating || !this.animation) {
            assert(false, "isAnimating has to be true");
            return;
        }
        this.animation.reverse(this._isOpen).progressStart();
    }
    onMove(detail) {
        if (!this.isAnimating || !this.animation) {
            assert(false, "isAnimating has to be true");
            return;
        }
        const delta = computeDelta(detail.deltaX, this._isOpen, this.isEndSide);
        const stepValue = delta / this.width;
        this.animation.progressStep(stepValue);
    }
    onEnd(detail) {
        if (!this.isAnimating || !this.animation) {
            assert(false, "isAnimating has to be true");
            return;
        }
        const isOpen = this._isOpen;
        const isEndSide$$1 = this.isEndSide;
        const delta = computeDelta(detail.deltaX, isOpen, isEndSide$$1);
        const width = this.width;
        const stepValue = delta / width;
        const velocity = detail.velocityX;
        const z = width / 2;
        const shouldCompleteRight = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
        const shouldCompleteLeft = velocity <= 0 && (velocity < -0.2 || detail.deltaX < -z);
        const shouldComplete = isOpen
            ? isEndSide$$1 ? shouldCompleteRight : shouldCompleteLeft
            : isEndSide$$1 ? shouldCompleteLeft : shouldCompleteRight;
        let shouldOpen = !isOpen && shouldComplete;
        if (isOpen && !shouldComplete) {
            shouldOpen = true;
        }
        const missing = shouldComplete ? 1 - stepValue : stepValue;
        const missingDistance = missing * width;
        let realDur = 0;
        if (missingDistance > 5) {
            const dur = missingDistance / Math.abs(velocity);
            realDur = Math.min(dur, 300);
        }
        this.lastOnEnd = detail.timeStamp;
        this.animation
            .onFinish(() => this.afterAnimation(shouldOpen), {
            clearExistingCallbacks: true,
            oneTimeCallback: true
        })
            .progressEnd(shouldComplete, stepValue, realDur);
    }
    beforeAnimation(shouldOpen) {
        assert(!this.isAnimating, "_before() should not be called while animating");
        this.el.classList.add(SHOW_MENU);
        if (this.backdropEl) {
            this.backdropEl.classList.add(SHOW_BACKDROP);
        }
        this.blocker.block();
        this.isAnimating = true;
        if (shouldOpen) {
            this.ionWillOpen.emit();
        }
        else {
            this.ionWillClose.emit();
        }
    }
    afterAnimation(isOpen) {
        assert(this.isAnimating, "_before() should be called while animating");
        this._isOpen = isOpen;
        this.isAnimating = false;
        if (!this._isOpen) {
            this.blocker.unblock();
        }
        this.enableListener(this, "click", isOpen);
        if (isOpen) {
            if (this.contentEl) {
                this.contentEl.classList.add(MENU_CONTENT_OPEN);
            }
            this.ionDidOpen.emit();
        }
        else {
            this.el.classList.remove(SHOW_MENU);
            if (this.contentEl) {
                this.contentEl.classList.remove(MENU_CONTENT_OPEN);
            }
            if (this.backdropEl) {
                this.backdropEl.classList.remove(SHOW_BACKDROP);
            }
            this.ionDidClose.emit();
        }
    }
    updateState() {
        const isActive = this._isActive();
        if (this.gesture) {
            this.gesture.setDisabled(!isActive || !this.swipeGesture);
        }
        if (!isActive && this._isOpen) {
            this.forceClosing();
        }
        if (!this.disabled && this.menuCtrl) {
            this.menuCtrl._setActiveMenu(this);
        }
        assert(!this.isAnimating, "can not be animating");
    }
    forceClosing() {
        assert(this._isOpen, "menu cannot be closed");
        this.isAnimating = true;
        const ani = this.animation.reverse(true);
        ani.playSync();
        this.afterAnimation(false);
    }
    hostData() {
        const { isEndSide: isEndSide$$1, type, disabled, isPaneVisible } = this;
        return {
            role: "complementary",
            class: {
                [`menu-type-${type}`]: true,
                "menu-enabled": !disabled,
                "menu-side-end": isEndSide$$1,
                "menu-side-start": !isEndSide$$1,
                "menu-pane-visible": isPaneVisible
            }
        };
    }
    render() {
        return [
            h("div", { class: "menu-inner", ref: el => this.menuInnerEl = el }, h("slot", null)),
            h("ion-backdrop", { ref: el => this.backdropEl = el, class: "menu-backdrop", tappable: false, stopPropagation: false })
        ];
    }
    static get is() { return "ion-menu"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "close": {
                "method": true
            },
            "config": {
                "context": "config"
            },
            "contentId": {
                "type": String,
                "attr": "content-id"
            },
            "disabled": {
                "type": Boolean,
                "attr": "disabled",
                "mutable": true,
                "watchCallbacks": ["disabledChanged"]
            },
            "doc": {
                "context": "document"
            },
            "el": {
                "elementRef": true
            },
            "enableListener": {
                "context": "enableListener"
            },
            "isActive": {
                "method": true
            },
            "isEndSide": {
                "state": true
            },
            "isOpen": {
                "method": true
            },
            "isPaneVisible": {
                "state": true
            },
            "isServer": {
                "context": "isServer"
            },
            "lazyMenuCtrl": {
                "connect": "ion-menu-controller"
            },
            "maxEdgeStart": {
                "type": Number,
                "attr": "max-edge-start"
            },
            "menuId": {
                "type": String,
                "attr": "menu-id"
            },
            "open": {
                "method": true
            },
            "queue": {
                "context": "queue"
            },
            "setOpen": {
                "method": true
            },
            "side": {
                "type": String,
                "attr": "side",
                "reflectToAttr": true,
                "watchCallbacks": ["sideChanged"]
            },
            "swipeGesture": {
                "type": Boolean,
                "attr": "swipe-gesture",
                "watchCallbacks": ["swipeGestureChanged"]
            },
            "toggle": {
                "method": true
            },
            "type": {
                "type": String,
                "attr": "type",
                "mutable": true,
                "watchCallbacks": ["typeChanged"]
            },
            "win": {
                "context": "window"
            }
        };
    }
    static get events() {
        return [{
                "name": "ionWillOpen",
                "method": "ionWillOpen",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionWillClose",
                "method": "ionWillClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionDidOpen",
                "method": "ionDidOpen",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionDidClose",
                "method": "ionDidClose",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }, {
                "name": "ionMenuChange",
                "method": "ionMenuChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true
            }];
    }
    static get listeners() {
        return [{
                "name": "body:ionSplitPaneVisible",
                "method": "onSplitPaneChanged"
            }, {
                "name": "click",
                "method": "onBackdropClick",
                "capture": true,
                "disabled": true
            }];
    }
    static get style() { return ":host {\n  /**\n   * \@prop --background: Background of the menu\n   * \@prop --width: Width of the menu\n   * \@prop --width-small: Width of the small menu\n   */\n  --width: 304px;\n  --width-small: 264px;\n  --background: var(--ion-background-color, #fff);\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: none;\n  position: absolute;\n  contain: strict; }\n\n:host(.show-menu) {\n  display: block; }\n\n.menu-inner {\n  left: 0;\n  right: auto;\n  top: 0;\n  bottom: 0;\n  -webkit-transform: translate3d(-9999px,  0,  0);\n  transform: translate3d(-9999px,  0,  0);\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: var(--width);\n  height: 100%;\n  background: var(--background);\n  contain: strict; }\n\n:host(.menu-side-start) .menu-inner {\n  --ion-safe-area-right: 0px;\n  /* stylelint-disable property-blacklist */\n  right: auto;\n  left: 0; }\n\n:host(.menu-side-end) .menu-inner {\n  --ion-safe-area-left: 0px;\n  right: 0;\n  left: auto;\n  /* stylelint-enable property-blacklist */ }\n\nion-backdrop {\n  display: none;\n  opacity: .01;\n  z-index: -1; }\n\n\@media (max-width: 340px) {\n  .menu-inner {\n    width: var(--width-small); } }\n\n:host(.menu-type-reveal) {\n  z-index: 0; }\n\n:host(.menu-type-reveal.show-menu) .menu-inner {\n  -webkit-transform: translate3d(0,  0,  0);\n  transform: translate3d(0,  0,  0); }\n\n:host(.menu-type-overlay) {\n  z-index: 80; }\n\n:host(.menu-type-overlay) .show-backdrop {\n  display: block;\n  cursor: pointer; }\n\n:host(.menu-pane-visible) .menu-inner {\n  left: 0;\n  right: 0;\n  width: auto;\n  /* stylelint-disable declaration-no-important */\n  -webkit-transform: none !important;\n  transform: none !important;\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important; }\n\n:host(.menu-pane-visible) ion-backdrop {\n  display: hidden !important;\n  /* stylelint-enable declaration-no-important */ }\n\n:host(.menu-type-push) {\n  z-index: 80; }\n\n:host(.menu-type-push) .show-backdrop {\n  display: block; }"; }
    static get styleMode() { return "ios"; }
}
function computeDelta(deltaX, isOpen, isEndSide$$1) {
    return Math.max(0, isOpen !== isEndSide$$1 ? -deltaX : deltaX);
}
function checkEdgeSide(win, posX, isEndSide$$1, maxEdgeStart) {
    if (isEndSide$$1) {
        return posX >= win.innerWidth - maxEdgeStart;
    }
    else {
        return posX <= maxEdgeStart;
    }
}
const SHOW_MENU = "show-menu";
const SHOW_BACKDROP = "show-backdrop";
const MENU_CONTENT_OPEN = "menu-content-open";

function baseAnimation(AnimationC) {
    return Promise.resolve(new AnimationC()
        .easing('cubic-bezier(0.0, 0.0, 0.2, 1)')
        .easingReverse('cubic-bezier(0.4, 0.0, 0.6, 1)')
        .duration(300));
}

const BOX_SHADOW_WIDTH = 8;
function menuOverlayAnimation(AnimationC, _, menu) {
    let closedX;
    let openedX;
    const width = menu.width + BOX_SHADOW_WIDTH;
    if (menu.isEndSide) {
        closedX = width + 'px';
        openedX = '0px';
    }
    else {
        closedX = -width + 'px';
        openedX = '0px';
    }
    const menuAnimation = new AnimationC()
        .addElement(menu.menuInnerEl)
        .fromTo('translateX', closedX, openedX);
    const backdropAnimation = new AnimationC()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);
    return baseAnimation(AnimationC).then(animation => {
        return animation.add(menuAnimation)
            .add(backdropAnimation);
    });
}

function menuPushAnimation(AnimationC, _, menu) {
    let contentOpenedX;
    let menuClosedX;
    const width = menu.width;
    if (menu.isEndSide) {
        contentOpenedX = -width + 'px';
        menuClosedX = width + 'px';
    }
    else {
        contentOpenedX = width + 'px';
        menuClosedX = -width + 'px';
    }
    const menuAnimation = new AnimationC()
        .addElement(menu.menuInnerEl)
        .fromTo('translateX', menuClosedX, '0px');
    const contentAnimation = new AnimationC()
        .addElement(menu.contentEl)
        .fromTo('translateX', '0px', contentOpenedX);
    const backdropAnimation = new AnimationC()
        .addElement(menu.backdropEl)
        .fromTo('opacity', 0.01, 0.32);
    return baseAnimation(AnimationC).then(animation => {
        return animation.add(menuAnimation)
            .add(backdropAnimation)
            .add(contentAnimation);
    });
}

function menuRevealAnimation(AnimationC, _, menu) {
    const openedX = (menu.width * (menu.isEndSide ? -1 : 1)) + 'px';
    const contentOpen = new AnimationC()
        .addElement(menu.contentEl)
        .fromTo('translateX', '0px', openedX);
    return baseAnimation(AnimationC).then(animation => {
        return animation.add(contentOpen);
    });
}

class MenuController {
    constructor() {
        this.menus = [];
        this.menuAnimations = new Map();
        this.registerAnimation("reveal", menuRevealAnimation);
        this.registerAnimation("push", menuPushAnimation);
        this.registerAnimation("overlay", menuOverlayAnimation);
    }
    async open(menuId) {
        const menu = await this.get(menuId);
        if (menu) {
            return menu.open();
        }
        return false;
    }
    async close(menuId) {
        const menu = await (menuId !== undefined ? this.get(menuId) : this.getOpen());
        if (menu !== undefined) {
            return menu.close();
        }
        return false;
    }
    async toggle(menuId) {
        const menu = await this.get(menuId);
        if (menu) {
            return menu.toggle();
        }
        return false;
    }
    async enable(shouldEnable, menuId) {
        const menu = await this.get(menuId);
        if (menu) {
            menu.disabled = !shouldEnable;
        }
        return menu;
    }
    async swipeGesture(shouldEnable, menuId) {
        const menu = await this.get(menuId);
        if (menu) {
            menu.swipeGesture = shouldEnable;
        }
        return menu;
    }
    async isOpen(menuId) {
        if (menuId != null) {
            const menu = await this.get(menuId);
            return (menu !== undefined && menu.isOpen());
        }
        else {
            const menu = await this.getOpen();
            return menu !== undefined;
        }
    }
    async isEnabled(menuId) {
        const menu = await this.get(menuId);
        if (menu) {
            return !menu.disabled;
        }
        return false;
    }
    async get(menuId) {
        {
            if (menuId === "left") {
                console.error("menu.side=left is deprecated, use \"start\" instead");
                return undefined;
            }
            if (menuId === "right") {
                console.error("menu.side=right is deprecated, use \"end\" instead");
                return undefined;
            }
        }
        await this.waitUntilReady();
        if (menuId === "start" || menuId === "end") {
            const menuRef = this.find(m => m.side === menuId && !m.disabled);
            if (menuRef) {
                return menuRef;
            }
            return this.find(m => m.side === menuId);
        }
        else if (menuId != null) {
            return this.find(m => m.menuId === menuId);
        }
        const menu = this.find(m => !m.disabled);
        if (menu) {
            return menu;
        }
        return this.menus.length > 0 ? this.menus[0].el : undefined;
    }
    async getOpen() {
        await this.waitUntilReady();
        return this.getOpenSync();
    }
    async getMenus() {
        await this.waitUntilReady();
        return this.getMenusSync();
    }
    async isAnimating() {
        await this.waitUntilReady();
        return this.isAnimatingSync();
    }
    registerAnimation(name, animation) {
        this.menuAnimations.set(name, animation);
    }
    _getInstance() {
        return Promise.resolve(this);
    }
    _register(menu) {
        const menus = this.menus;
        if (menus.indexOf(menu) < 0) {
            if (!menu.disabled) {
                this._setActiveMenu(menu);
            }
            menus.push(menu);
        }
    }
    _unregister(menu) {
        const index = this.menus.indexOf(menu);
        if (index > -1) {
            this.menus.splice(index, 1);
        }
    }
    _setActiveMenu(menu) {
        const side = menu.side;
        this.menus
            .filter(m => m.side === side && m !== menu)
            .forEach(m => m.disabled = true);
    }
    async _setOpen(menu, shouldOpen, animated) {
        if (this.isAnimatingSync()) {
            return false;
        }
        if (shouldOpen) {
            const openedMenu = await this.getOpen();
            if (openedMenu && menu.el !== openedMenu) {
                await openedMenu.setOpen(false, false);
            }
        }
        return menu._setOpen(shouldOpen, animated);
    }
    _createAnimation(type, menuCmp) {
        const animationBuilder = this.menuAnimations.get(type);
        if (!animationBuilder) {
            return Promise.reject("animation not registered");
        }
        return this.animationCtrl.create(animationBuilder, null, menuCmp);
    }
    getOpenSync() {
        return this.find(m => m._isOpen);
    }
    getMenusSync() {
        return this.menus.map(menu => menu.el);
    }
    isAnimatingSync() {
        return this.menus.some(menu => menu.isAnimating);
    }
    find(predicate) {
        const instance = this.menus.find(predicate);
        if (instance !== undefined) {
            return instance.el;
        }
        return undefined;
    }
    waitUntilReady() {
        return Promise.all(Array.from(this.doc.querySelectorAll("ion-menu"))
            .map(menu => menu.componentOnReady()));
    }
    static get is() { return "ion-menu-controller"; }
    static get properties() {
        return {
            "_getInstance": {
                "method": true
            },
            "animationCtrl": {
                "connect": "ion-animation-controller"
            },
            "close": {
                "method": true
            },
            "doc": {
                "context": "document"
            },
            "enable": {
                "method": true
            },
            "get": {
                "method": true
            },
            "getMenus": {
                "method": true
            },
            "getOpen": {
                "method": true
            },
            "isAnimating": {
                "method": true
            },
            "isEnabled": {
                "method": true
            },
            "isOpen": {
                "method": true
            },
            "open": {
                "method": true
            },
            "registerAnimation": {
                "method": true
            },
            "swipeGesture": {
                "method": true
            },
            "toggle": {
                "method": true
            }
        };
    }
    static get style() { return ".menu-content {\n  -webkit-transform: translate3d(0,  0,  0);\n  transform: translate3d(0,  0,  0); }\n\n.menu-content-open {\n  cursor: pointer;\n  -ms-touch-action: manipulation;\n  touch-action: manipulation;\n  pointer-events: none; }\n\n.ios .menu-content-reveal {\n  -webkit-box-shadow: -8px 0 42px rgba(0, 0, 0, 0.08);\n  box-shadow: -8px 0 42px rgba(0, 0, 0, 0.08); }\n\n.md .menu-content-reveal {\n  -webkit-box-shadow: 0 2px 22px 0 rgba(0, 0, 0, 0.09), 4px 0 16px 0 rgba(0, 0, 0, 0.18);\n  box-shadow: 0 2px 22px 0 rgba(0, 0, 0, 0.09), 4px 0 16px 0 rgba(0, 0, 0, 0.18); }\n\n.md .menu-content-push {\n  -webkit-box-shadow: 0 2px 22px 0 rgba(0, 0, 0, 0.09), 4px 0 16px 0 rgba(0, 0, 0, 0.18);\n  box-shadow: 0 2px 22px 0 rgba(0, 0, 0, 0.09), 4px 0 16px 0 rgba(0, 0, 0, 0.18); }"; }
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

var DEFAULT_DELIMITER = '/';
var DEFAULT_DELIMITERS = './';
var PATH_REGEXP = new RegExp([
    '(\\\\.)',
    '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g');
function parse(str, options) {
    var tokens = [];
    var key = 0;
    var index = 0;
    var path = '';
    var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER;
    var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS;
    var pathEscaped = false;
    var res;
    while ((res = PATH_REGEXP.exec(str)) !== null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;
        if (escaped) {
            path += escaped[1];
            pathEscaped = true;
            continue;
        }
        var prev = '';
        var next = str[index];
        var name = res[2];
        var capture = res[3];
        var group = res[4];
        var modifier = res[5];
        if (!pathEscaped && path.length) {
            var k = path.length - 1;
            if (delimiters.indexOf(path[k]) > -1) {
                prev = path[k];
                path = path.slice(0, k);
            }
        }
        if (path) {
            tokens.push(path);
            path = '';
            pathEscaped = false;
        }
        var partial = prev !== '' && next !== undefined && next !== prev;
        var repeat = modifier === '+' || modifier === '*';
        var optional = modifier === '?' || modifier === '*';
        var delimiter = prev || defaultDelimiter;
        var pattern = capture || group;
        tokens.push({
            name: name || key++,
            prefix: prev,
            delimiter: delimiter,
            optional: optional,
            repeat: repeat,
            partial: partial,
            pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
        });
    }
    if (path || index < str.length) {
        tokens.push(path + str.substr(index));
    }
    return tokens;
}
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
}
function escapeGroup(group) {
    return group.replace(/([=!:$/()])/g, '\\$1');
}
function flags(options) {
    return options && options.sensitive ? '' : 'i';
}
function regexpToRegexp(path, keys) {
    if (!keys)
        return path;
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: null,
                delimiter: null,
                optional: false,
                repeat: false,
                partial: false,
                pattern: null
            });
        }
    }
    return path;
}
function arrayToRegexp(path, keys, options) {
    var parts = [];
    for (var i = 0; i < path.length; i++) {
        parts.push(pathToRegexp(path[i], keys, options).source);
    }
    return new RegExp('(?:' + parts.join('|') + ')', flags(options));
}
function stringToRegexp(path, keys, options) {
    return tokensToRegExp(parse(path, options), keys, options);
}
function tokensToRegExp(tokens, keys, options) {
    options = options || {};
    var strict = options.strict;
    var end = options.end !== false;
    var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
    var delimiters = options.delimiters || DEFAULT_DELIMITERS;
    var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
    var route = '';
    var isEndDelimited = false;
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (typeof token === 'string') {
            route += escapeString(token);
            isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
        }
        else {
            var prefix = escapeString(token.prefix || '');
            var capture = token.repeat
                ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
                : token.pattern;
            if (keys)
                keys.push(token);
            if (token.optional) {
                if (token.partial) {
                    route += prefix + '(' + capture + ')?';
                }
                else {
                    route += '(?:' + prefix + '(' + capture + '))?';
                }
            }
            else {
                route += prefix + '(' + capture + ')';
            }
        }
    }
    if (end) {
        if (!strict)
            route += '(?:' + delimiter + ')?';
        route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
    }
    else {
        if (!strict)
            route += '(?:' + delimiter + '(?=' + endsWith + '))?';
        if (!isEndDelimited)
            route += '(?=' + delimiter + '|' + endsWith + ')';
    }
    return new RegExp('^' + route, flags(options));
}
function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp) {
        return regexpToRegexp(path, keys);
    }
    if (Array.isArray(path)) {
        return arrayToRegexp(path, keys, options);
    }
    return stringToRegexp(path, keys, options);
}

const patternCache = {};
const cacheLimit = 10000;
let cacheCount = 0;
function compilePath(pattern, options) {
    const cacheKey = `${options.end}${options.strict}`;
    const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
    const cachePattern = JSON.stringify(pattern);
    if (cache[cachePattern]) {
        return cache[cachePattern];
    }
    const keys = [];
    const re = pathToRegexp(pattern, keys, options);
    const compiledPattern = { re, keys };
    if (cacheCount < cacheLimit) {
        cache[cachePattern] = compiledPattern;
        cacheCount += 1;
    }
    return compiledPattern;
}
function matchPath(pathname, options = {}) {
    if (typeof options === 'string') {
        options = { path: options };
    }
    const { path = '/', exact = false, strict = false } = options;
    const { re, keys } = compilePath(path, { end: exact, strict });
    const match = re.exec(pathname);
    if (!match) {
        return null;
    }
    const [url, ...values] = match;
    const isExact = pathname === url;
    if (exact && !isExact) {
        return null;
    }
    return {
        path,
        url: path === '/' && url === '' ? '/' : url,
        isExact,
        params: keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
        }, {})
    };
}

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
const isModifiedEvent = (event) => (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

/*!
 * StencilStateTunnel: Core, es5
 * Built with http://stenciljs.com
 */
function u(n,t){for(var e,r,i=null,o=!1,u=!1,f=arguments.length;f-- >2;)T.push(arguments[f]);for(;T.length>0;){var c=T.pop();if(c&&void 0!==c.pop)for(f=c.length;f--;)T.push(c[f]);else"boolean"==typeof c&&(c=null),(u="function"!=typeof n)&&(null==c?c="":"number"==typeof c?c=String(c):"string"!=typeof c&&(u=!1)),u&&o?i[i.length-1].vtext+=c:null===i?i=[u?{vtext:c}:c]:i.push(u?{vtext:c}:c),o=u;}if(null!=t){if(t.className&&(t.class=t.className),"object"==typeof t.class){for(f in t.class)t.class[f]&&T.push(f);t.class=T.join(" "),T.length=0;}null!=t.key&&(e=t.key),null!=t.name&&(r=t.name);}return "function"==typeof n?n(t,i||[],W):{vtag:n,vchildren:i,vtext:void 0,vattrs:t,vkey:e,vname:r,w:void 0,g:!1}}function f(n){return {vtag:n.vtag,vchildren:n.vchildren,vtext:n.vtext,vattrs:n.vattrs,vkey:n.vkey,vname:n.vname}}undefined&&undefined.Dn||(Object.setPrototypeOf||Array);var T=[],W={forEach:function(n,t){n.forEach(function(n,e,r){return t(f(n),e,r)});},map:function(n,t){return n.map(function(n,e,r){return function i(n){return {vtag:n.vtag,vchildren:n.vchildren,vtext:n.vtext,vattrs:n.vattrs,vkey:n.vkey,vname:n.vname}}(t(f(n),e,r))})}};

/*! Built with http://stenciljs.com */
var __rest = function (s, e) {
    var t = {};
    for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
            if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
    return t;
};
function defaultConsumerRender(subscribe, renderer) {
    return u("context-consumer", { subscribe: subscribe, renderer: renderer });
}
function createProviderConsumer(defaultState, consumerRender) {
    if (consumerRender === void 0) { consumerRender = defaultConsumerRender; }
    var listeners = new Map();
    var currentState = defaultState;
    function notifyConsumers() {
        listeners.forEach(updateListener);
    }
    function updateListener(fields, listener) {
        if (Array.isArray(fields)) {
            fields.slice().forEach(function (fieldName) {
                listener[fieldName] = currentState[fieldName];
            });
        }
        else {
            listener[fields] = Object.assign({}, currentState);
        }
        listener.forceUpdate();
    }
    function attachListener(propList) {
        return function (el) {
            if (listeners.has(el)) {
                return;
            }
            listeners.set(el, propList);
            updateListener(propList, el);
        };
    }
    function subscribe(el, propList) {
        attachListener(propList)(el);
        return function () {
            listeners.delete(el);
        };
    }
    var Provider = function (_b, children) {
        var state = _b.state;
        currentState = state;
        notifyConsumers();
        return children;
    };
    var Consumer = function (props, children) {
        return consumerRender(subscribe, children[0]);
    };
    function wrapConsumer(childComponent, fieldList) {
        var Child = childComponent.is;
        return function (_a) {
            var children = _a.children, props = __rest(_a, ["children"]);
            return (u(Child, Object.assign({ ref: attachListener(fieldList) }, props), children));
        };
    }
    function injectProps(childComponent, fieldList) {
        var unsubscribe = null;
        var elementRefName = Object.keys(childComponent.properties).find(function (propName) {
            return childComponent.properties[propName].elementRef == true;
        });
        if (elementRefName == undefined) {
            throw new Error("Please ensure that your Component " + childComponent.is + " has an attribute with an \"@Element\" decorator. " +
                "This is required to be able to inject properties.");
        }
        var prevComponentWillLoad = childComponent.prototype.componentWillLoad;
        childComponent.prototype.componentWillLoad = function () {
            unsubscribe = subscribe(this[elementRefName], fieldList);
            if (prevComponentWillLoad) {
                return prevComponentWillLoad.bind(this)();
            }
        };
        var prevComponentDidUnload = childComponent.prototype.componentDidUnload;
        childComponent.prototype.componentDidUnload = function () {
            unsubscribe();
            if (prevComponentDidUnload) {
                return prevComponentDidUnload.bind(this)();
            }
        };
    }
    return {
        Provider: Provider,
        Consumer: Consumer,
        wrapConsumer: wrapConsumer,
        injectProps: injectProps
    };
}

// StencilStateTunnel: ES Module

var ActiveRouter = createProviderConsumer({
    historyType: 'browser',
    location: {
        pathname: '',
        query: {},
        key: ''
    },
    titleSuffix: '',
    root: '/',
    routeViewsUpdated: () => { }
});

function getUrl(url, root) {
    if (url.charAt(0) == "/" && root.charAt(root.length - 1) == "/") {
        return root.slice(0, root.length - 1) + url;
    }
    return root + url;
}
class RouteLink {
    constructor() {
        this.unsubscribe = () => { return; };
        this.activeClass = "link-active";
        this.exact = false;
        this.strict = true;
        this.custom = "a";
        this.match = null;
    }
    componentWillLoad() {
        this.computeMatch();
    }
    computeMatch() {
        if (this.location) {
            this.match = matchPath(this.location.pathname, {
                path: this.urlMatch || this.url,
                exact: this.exact,
                strict: this.strict
            });
        }
    }
    handleClick(e) {
        if (isModifiedEvent(e) || !this.history || !this.url || !this.root) {
            return;
        }
        e.preventDefault();
        return this.history.push(getUrl(this.url, this.root));
    }
    render() {
        let anchorAttributes = {
            class: {
                [this.activeClass]: this.match !== null,
            },
            onClick: this.handleClick.bind(this)
        };
        if (this.anchorClass) {
            anchorAttributes.class[this.anchorClass] = true;
        }
        if (this.custom === "a") {
            anchorAttributes = Object.assign({}, anchorAttributes, { href: this.url, title: this.anchorTitle, role: this.anchorRole, tabindex: this.anchorTabIndex, "aria-haspopup": this.ariaHaspopup, id: this.anchorId, "aria-posinset": this.ariaPosinset, "aria-setsize": this.ariaSetsize, "aria-label": this.ariaLabel });
        }
        return (h(this.custom, Object.assign({}, anchorAttributes), h("slot", null)));
    }
    static get is() { return "stencil-route-link"; }
    static get properties() {
        return {
            "activeClass": {
                "type": String,
                "attr": "active-class"
            },
            "anchorClass": {
                "type": String,
                "attr": "anchor-class"
            },
            "anchorId": {
                "type": String,
                "attr": "anchor-id"
            },
            "anchorRole": {
                "type": String,
                "attr": "anchor-role"
            },
            "anchorTabIndex": {
                "type": String,
                "attr": "anchor-tab-index"
            },
            "anchorTitle": {
                "type": String,
                "attr": "anchor-title"
            },
            "ariaHaspopup": {
                "type": String,
                "attr": "aria-haspopup"
            },
            "ariaLabel": {
                "type": String,
                "attr": "aria-label"
            },
            "ariaPosinset": {
                "type": String,
                "attr": "aria-posinset"
            },
            "ariaSetsize": {
                "type": Number,
                "attr": "aria-setsize"
            },
            "custom": {
                "type": String,
                "attr": "custom"
            },
            "el": {
                "elementRef": true
            },
            "exact": {
                "type": Boolean,
                "attr": "exact"
            },
            "history": {
                "type": "Any",
                "attr": "history"
            },
            "location": {
                "type": "Any",
                "attr": "location",
                "watchCallbacks": ["computeMatch"]
            },
            "match": {
                "state": true
            },
            "root": {
                "type": String,
                "attr": "root"
            },
            "strict": {
                "type": Boolean,
                "attr": "strict"
            },
            "url": {
                "type": String,
                "attr": "url"
            },
            "urlMatch": {
                "type": String,
                "attr": "url-match"
            }
        };
    }
}
ActiveRouter.injectProps(RouteLink, [
    "history",
    "location",
    "root"
]);

export { AppMainMenu as AppMainmenu, AnimationControllerImpl as IonAnimationController, Backdrop as IonBackdrop, Button as IonButton, List as IonList, Menu as IonMenu, MenuController as IonMenuController, MenuToggle as IonMenuToggle, RouteLink as StencilRouteLink };
