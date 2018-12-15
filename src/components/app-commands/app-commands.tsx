
import { Component, Event, EventEmitter, Listen } from '@stencil/core';
import { docData } from 'rxfire/firestore';
import {first} from 'rxjs/operators'


declare var firebase: firebase.app.App;

@Component({
    tag: 'app-commands',
    styleUrl: 'app-commands.css'
})
export class AppCommands {

    private user = null

    @Event() addGameCompleted: EventEmitter
    @Event() editGameCompleted: EventEmitter

    private gamesCollectionRef = firebase.firestore().collection('games')

    @Listen('loadGameRequested')
    loadGameRequestedHandler(ev){
      var gameId = ev.detail.data
      var status = ev.detail.status
      var gameRef = this.gamesCollectionRef.doc(gameId)

      docData(gameRef).pipe(first()).subscribe((doc) => status.next(doc))
    }

    @Listen('updateGameRequested')
    updateGameRequestHandler(ev) {
      var gameId = ev.detail.gameId
      this.gamesCollectionRef.doc(gameId)
        .update(ev.detail.gameData)
        .then(ev.detail.status.complete())
    }

    @Listen('addGameRequested')
    addGameRequestedHandler(ev) {

      var status = ev.detail.status
      var newGame = ev.detail.data
      newGame.creator = this.user.uid

      firebase.firestore().collection('games').add(newGame)
        .then((newDocRef)=> {
          status.next(newDocRef)
          status.complete()
        })
    }

    @Listen('userUpdated')
    userUpdatedHandler(ev) {
      this.user = ev.detail
    }

    render() {
        return [
        ]
    }
}
