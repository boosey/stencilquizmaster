
import { Component, Event, EventEmitter, Prop, State, Watch } from '@stencil/core';
import { Subject } from "rxjs";
import { first } from 'rxjs/operators';


@Component({
    tag: 'app-edit-question',
    styleUrl: 'app-edit-question.css'
})

export class AppEditQuestion {

    @Prop() question

    componentWillLoad() {
    }

    render() {
        return [
          <ion-header>
            <app-subpage-header titleText="Edit Question"></app-subpage-header>
          </ion-header>,

          <ion-content padding>
          </ion-content>
        ]
    }
}
