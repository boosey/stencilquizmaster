
import { Component, Event, EventEmitter, Listen, State, Watch } from '@stencil/core';
import { collectionData, docData } from 'rxfire/firestore';
import {first} from 'rxjs/operators'
import { empty } from 'rxjs'


declare var firebase: firebase.app.App;

@Component({
    tag: 'app-commands',
    styleUrl: 'app-commands.css'
})

export class AppCommands {

    @State() user = null

    private gamesCollectionRef = firebase.firestore().collection('games')
    private questionsCollectionRef = firebase.firestore().collection('questions')

    @Listen('loadQuestionsRequested')
    loadQuestionsRequested(ev) {
      var gameId = ev.detail.data ? ev.detail.data.gameId : ''
      var status = ev.detail.status
      var uid = this.user ? this.user.uid : ''

      var questionsQuery = this.questionsCollectionRef
      .where('creator', "==", uid)
      .where('gameId', "==", gameId)

      collectionData(questionsQuery, "questionId").subscribe(
         (question) => status.next(question),
         () => console.log("Error getting questions"),
         () => status.complete()
      )
    }

    @Listen('loadQuestionFromIdRequested')
    loadQuestionFromIdRequestedHandler(ev){
      var questionId = ev.detail.data
      var status = ev.detail.status
      var questionRef = this.questionsCollectionRef.doc(questionId)

      docData(questionRef).pipe(first()).subscribe((doc) => status.next(doc))
    }

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
