
import { Component, Event, EventEmitter, Listen, Prop, State } from '@stencil/core';
import { Subject } from "rxjs";
import { first } from 'rxjs/operators';

const nav = document.querySelector('ion-nav')

@Component({
    tag: 'app-edit-game',
    styleUrl: 'app-edit-game.css'
})

export class AppEditGame {

    @Prop() gameId: string
    @State() game = null;

    @Event() loadGameRequested: EventEmitter
    @Event() updateGameRequested: EventEmitter

      // game = {name: 'Default Game'}

    componentWillLoad() {
      // Load game from ID passed in in the URL path
      var requestStatus = (new Subject())
      .pipe(first())
      .subscribe((game) => this.game = game)

      var request = { data: this.gameId, status: requestStatus}
      this.loadGameRequested.emit(request)
    }

    // Listen for submission from Details pane then call command
    // @Listen('gameDetailsSubmitted')
    // requestUpdateGame(ev) {
    //   var requestStatus = new Subject()
    //   var requestSubscription = requestStatus.subscribe(
    //     (gameRef) => (null),
    //     () => console.log("Error updating game"),
    //     () => nav.pop()
    //   )
    //   var request = { data: ev.data, status: requestStatus}
    //   this.updateGameRequested.emit(request)
    // }

    // This is the local function for calling the command
    requestUpdateGame() {
      var requestStatus = (new Subject())
      .subscribe(
        () => (null),
        () => console.log("Error updating game"),
        () => nav.pop()
      )
      var request = {
        gameId: this.gameId,
        gameData: this.game,
        status: requestStatus
      }
      this.updateGameRequested.emit(request)
    }


    changeValue(ev){
        let value = ev.target.value;
        switch(ev.target.name){

            case 'name': {
                this.game.name = value;
                break;
            }
        }
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
              <ion-title>Edit Game</ion-title>
            </ion-toolbar>
          </ion-header>,

          <ion-content padding>
          <ion-list>
              <ion-item>
                  <ion-label position="floating">Name</ion-label>
                  <ion-input name="name" value={this.game ? this.game.name : ''}
                    onInput={(ev) => this.changeValue(ev)} type="text"></ion-input>
              </ion-item>
          </ion-list>

          <ion-button onClick={() => this.requestUpdateGame()}>Save Changes</ion-button>

          </ion-content>
        ]
    }
}
