
import { Component, Prop, Event, EventEmitter, Method } from '@stencil/core';

@Component({
    tag: 'app-mainmenu',
    styleUrl: 'app-mainmenu.css'
})
export class AppMainMenu {

    @Prop() user = null;
    menu = null;

    @Event() loginRequested: EventEmitter
    @Event() logoutRequested: EventEmitter

    @Method()
    close(){
      this.menu && this.menu.close()
    }

    render() {
        return [
          <ion-menu side="start" contentId="mainmenu" ref={(el) => this.menu = el}>
            <ion-header>
              <ion-toolbar>
                <ion-menu-toggle>
                <ion-button fill="clear">
                  <ion-icon slot="start" name="close"></ion-icon>
                </ion-button>
                </ion-menu-toggle>
              </ion-toolbar>
            </ion-header>

            <ion-content id="mainmenu">
              <ion-list>
                <ion-item>
                  <stencil-route-link url='/'>
                    <ion-button href="/" fill="clear">Games</ion-button>
                  </stencil-route-link>
                </ion-item>
                {(this.user === null) ?
                  <ion-item>
                    <ion-button fill="clear" onClick={() => this.loginRequested.emit()}>
                      Login
                    </ion-button>
                  </ion-item>
                :
                  <ion-item>
                    <ion-button fill="clear" onClick={() => this.logoutRequested.emit()}>
                      Logout
                    </ion-button>
                  </ion-item>

              }
              </ion-list>
            </ion-content>
          </ion-menu>
        ]
    }
}
