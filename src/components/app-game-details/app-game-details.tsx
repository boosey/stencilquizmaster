
import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
    tag: 'app-game-details',
    styleUrl: 'app-game-details.css'
})

export class AppGameDetails {

    @Event() gameDetailsSubmitted: EventEmitter

    @Prop() titleText: string = 'Game Details'
    @Prop() buttonText: string = 'Submit'
    @Prop() game = {name: ''}

    changeValue(ev){
        let value = ev.target.value;
        switch(ev.target.name){

            case 'name': {
                this.game.name = value;
                break;
            }
        }
    }

    detailsSubmitted() {
      this.gameDetailsSubmitted.emit(this.game)
    }

    render() {
        return [
          <ion-header>
            <app-subpage-header ></app-subpage-header>
          </ion-header>,

          <ion-content padding>
          <ion-list>
              <ion-item>
                  <ion-label position="floating">Name</ion-label>
                  <ion-input name="name" onInput={(ev) => this.changeValue(ev)}
                    type="text"></ion-input>
              </ion-item>
          </ion-list>

          <ion-button onClick={() => this.detailsSubmitted()}>
            {this.buttonText}
            </ion-button>

          </ion-content>
        ]
    }
}
