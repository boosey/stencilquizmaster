/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppAddGame {
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-button", { href: "/" },
                            h("ion-icon", { slot: "icon-only", name: "close" }))),
                    h("ion-title", null, "Edit Game"))),
            h("ion-content", { padding: true })
        ];
    }
    static get is() { return "app-edit-game"; }
    static get events() { return [{
            "name": "editGameRequested",
            "method": "editGameRequested",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "editGameCompleted",
            "method": "editGameCompleted",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ""; }
}

export { AppAddGame as AppEditGame };
