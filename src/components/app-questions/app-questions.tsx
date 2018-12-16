
import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import { Subject } from "rxjs";
import { first } from 'rxjs/operators';


@Component({
    tag: 'app-questions',
    styleUrl: 'app-questions.css'
})

export class AppQuestions {

    @Prop() gameId: string = null
    @State() questions

    @Event() loadQuestionsRequested: EventEmitter

    componentWillLoad() {
      // Load game from ID passed in in the URL path
      if (this.gameId !== null) {
        var requestStatus = (new Subject())
          .subscribe((questions) => this.questions = questions)

        var request = { data: {'gameId' : this.gameId}, status: requestStatus}
        this.loadQuestionsRequested.emit(request)
      }
    }

    @Watch('gameId')
    gameIdChangedHandler(newGameId, oldGameId) {
        // Load game from ID passed in in the URL path
      if (newGameId !== null) {
        var requestStatus = (new Subject())
          .subscribe((questions) => this.questions = questions)

        var request = { data: {'gameId' : this.gameId}, status: requestStatus}
        this.loadQuestionsRequested.emit(request)
      }
    }

    render() {
        return [
          <ion-header>
            <app-subpage-header titleText="Questions" button="add"></app-subpage-header>
          </ion-header>,

          <ion-content padding>
            <ion-list>
              {this.questions ? this.questions.map((q) => (
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>{q.prompt}</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                    </ion-card-content>
                  </ion-card>
                ))
                : ''
              }
            </ion-list>
          </ion-content>
        ]
    }
}
