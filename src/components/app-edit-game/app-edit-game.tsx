
import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'app-edit-game',
    styleUrl: 'app-edit-game.css'
})
export class AppAddGame {

    @Event() editGameRequested: EventEmitter
    @Event() editGameCompleted: EventEmitter

    render() {
        return [
          <ion-header>
            <ion-toolbar color="primary">
              <ion-buttons slot="start">
                <ion-button href="/">
                  <ion-icon slot="icon-only" name="close"></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-title>Edit Game</ion-title>
            </ion-toolbar>
          </ion-header>,

          <ion-content padding>
          </ion-content>
        ]
    }
}
