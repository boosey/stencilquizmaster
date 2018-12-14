/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppAddGame {
    changeValue(ev) {
        let value = ev.target.value;
        switch (ev.target.name) {
            case 'name': {
                this.name = value;
                break;
            }
        }
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-button", { href: "/" },
                            h("ion-icon", { slot: "icon-only", name: "close" }))),
                    h("ion-title", null, "Add Game"))),
            h("ion-content", { padding: true })
        ];
    }
    static get is() { return "app-add-game"; }
    static get events() { return [{
            "name": "addGameRequested",
            "method": "addGameRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "addGameCompleted",
            "method": "addGameCompleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { AppAddGame };
