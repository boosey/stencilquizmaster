
import { Component, Event, EventEmitter } from '@stencil/core';

@Component({
    tag: 'app-play-game',
    styleUrl: 'app-play-game.css'
})
export class AppAddGame {

    @Event() playGameRequested: EventEmitter
    @Event() playGameCompleted: EventEmitter     

    render() {
        return [
          <ion-header>
            <ion-toolbar color="primary">
              <ion-buttons slot="start">
                <ion-button href="/">
                  <ion-icon slot="icon-only" name="close"></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-title>Play Game</ion-title>
            </ion-toolbar>
          </ion-header>,

          <ion-content padding>
          </ion-content>
        ]
    }
}
