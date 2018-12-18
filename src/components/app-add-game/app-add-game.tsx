
import { Component, Event, EventEmitter, Listen } from '@stencil/core';
import { Subject } from "rxjs"

@Component({
    tag: 'app-add-game',
    styleUrl: 'app-add-game.css'
})

export class AppAddGame {

    @Event() addGameRequested: EventEmitter

    private newGame = {name: ''}

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
        () => {
            const nav = document.querySelector('ion-nav')
            if (nav && nav.canGoBack()) {
                return nav.pop({ skipIfBusy: true });
            }
        }
      )
      var request = { data: this.newGame, status: requestStatus}
      this.addGameRequested.emit(request)
    }

    render() {
        return [
          <ion-header>
            <app-subpage-header titleText="Add Game"></app-subpage-header>
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
