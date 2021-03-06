
import { Component, Event, EventEmitter, Listen } from '@stencil/core';
import { Subject } from "rxjs"

const nav = document.querySelector('ion-nav')

@Component({
    tag: 'app-add-game',
    styleUrl: 'app-add-game.css'
})

export class AppAddGame {

    @Event() addGameRequested: EventEmitter

    private newGame = {name: ''}

    @Listen('addGameCompleted')
    addGameCompletedHandler(newDocRef) {
      nav.pop()
    }

    changeValue(ev){
        let value = ev.target.value;
        switch(ev.target.name){

            case 'name': {
                this.newGame.name = value;
                break;
            }
        }
    }

    requestAddGame() {
      var requestStatus = new Subject()
      var requestSubscription = requestStatus.subscribe(
        (newGameRef) => (null),
        () => console.log("Error adding game"),
        () => nav.pop()
      )
      var request = { data: this.newGame, status: requestStatus}
      this.addGameRequested.emit(request)
    }

    render() {
        return [
          <ion-header>
            <ion-toolbar color="primary">
              <ion-buttons slot="start">
                <ion-button href="/">
                  <ion-icon slot="icon-only" name="close"></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-title>Add Game</ion-title>
            </ion-toolbar>
          </ion-header>,

          <ion-content padding>
          <ion-list>
              <ion-item>
                  <ion-label position="floating">Name</ion-label>
                  <ion-input name="name" onInput={(ev) => this.changeValue(ev)}
                    type="text"></ion-input>
              </ion-item>
          </ion-list>

          <ion-button onClick={() => this.requestAddGame()}>Add Game</ion-button>

          </ion-content>
        ]
    }
}
