
import { Component, Event, EventEmitter, Prop, State, Watch, Listen } from '@stencil/core';
import { Subject } from "rxjs";
import { first } from 'rxjs/operators';


@Component({
    tag: 'app-edit-question',
    styleUrl: 'app-edit-question.css'
})

export class AppEditQuestion {

    @Prop() questionId
    @Prop() gameId
    @State() selectedPaneName = '';


    @State() question = {
      gameId: this.gameId,
      prompt: 'Type a prompt',
      type: 'text',
      textType: 'singleLine',
      choices: ['New Choice 1', 'New Choice 2']
    }

    private questionTypeSegment = null
    private changingPane = false

    @Event() loadQuestionFromIdRequested: EventEmitter
    @Event() updateQuestionRequested: EventEmitter

    componentWillLoad() {
      if (this.questionId !== null) {
        var requestStatus = (new Subject())
        .pipe(first())
        .subscribe((loadedQuestion) =>
          this.question = {...this.question, ...loadedQuestion})

        var request = { data: this.questionId, status: requestStatus}
        this.loadQuestionFromIdRequested.emit(request)
      }
    }

    componentDidLoad() {

      this.questionTypeSegment.addEventListener('ionChange', (ev) => {
          this.question = {...this.question, type: ev.detail.value}
        })
    }

    changeValue(ev){
        let value = ev.target.value;
        switch(ev.target.name){

            case 'prompt': {
                break;
            }
        }
    }

    requestUpdateQuestion() {
      var requestStatus = new Subject()
      var requestSubscription = requestStatus.subscribe(
        (questionRef) => (null),
        () => console.log("Error updating question"),
        () => {
            const nav = document.querySelector('ion-nav')
            if (nav && nav.canGoBack()) {
                return nav.pop({ skipIfBusy: true });
            }
        }
      )
      var request = { data: this.question, status: requestStatus}
      this.updateQuestionRequested.emit(request)
    }

    showPane(paneName):string {
      return (this.question.type === paneName) ? 'show-pane' : 'hide-pane'
    }

    render() {
        return [
          <ion-header>
            <app-subpage-header titleText="Edit Question"></app-subpage-header>
          </ion-header>,

          <ion-content padding>
          <ion-list>
              <ion-item>
                  <ion-label position="floating">Prompt</ion-label>
                  <ion-input name="prompt" onInput={(ev) => this.changeValue(ev)}
                    type="text"></ion-input>
              </ion-item>
          </ion-list>

         <ion-item>
          <ion-segment value={this.question.type}
              ref={(el) => this.questionTypeSegment = el}>
            <ion-segment-button value="text">
              Text
            </ion-segment-button>
            <ion-segment-button value="singleChoice">
              Single<br/>
              Choice
            </ion-segment-button>
            <ion-segment-button value="multipleChoice">
              Multiple<br/>
              Choice
            </ion-segment-button>
          </ion-segment>
        </ion-item>

        <ion-item lines="none" class={this.showPane("text")}>
          <ion-list lines="none">
            <ion-radio-group>
            <ion-item lines="none">
              <ion-label>Single Line</ion-label>
              <ion-radio slot="start" value="singeLine"></ion-radio>
            </ion-item>
            <ion-item lines="none">
              <ion-radio slot="start" value="multipleLines"></ion-radio>
              <ion-label>Multiple Lines</ion-label>
            </ion-item>
            </ion-radio-group>
          </ion-list>
        </ion-item>

        <ion-item lines="none" class={this.showPane("singleChoice")}>
          <ion-list lines="none">
            <ion-radio-group>
            <ion-item lines="none">
              <ion-radio value="choice1"></ion-radio>
              <ion-label>Choice 1</ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-radio value="choice2"></ion-radio>
              <ion-label>Choice 2</ion-label>
            </ion-item>
            </ion-radio-group>
          </ion-list>
        </ion-item>

        <ion-item lines="none" >
        </ion-item>

          <ion-button onClick={() => this.requestUpdateQuestion()}>Update</ion-button>
          </ion-content>
        ]
    }
}
