
import { Component, Event, EventEmitter, Listen } from '@stencil/core';

declare var firebase: firebase.app.App;

@Component({
    tag: 'app-commands',
    styleUrl: 'app-commands.css'
})
export class AppCommands {

    private user = null

    @Event() addGameCompleted: EventEmitter
    @Event() editGameCompleted: EventEmitter

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
