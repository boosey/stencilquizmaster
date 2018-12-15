
import { Component, Event, EventEmitter, Prop } from '@stencil/core';

@Component({
    tag: 'app-subpage-header',
    styleUrl: 'app-subpage-header.css'
})

export class AppSubpageHeader {

    @Prop() titleText: string = 'Set a Page Title'

    render() {
        return [
            <ion-toolbar color="primary">
              <ion-buttons slot="start">
                <ion-button href="/">
                  <ion-icon slot="icon-only" name="close"></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-title>{this.titleText}</ion-title>
            </ion-toolbar>
        ]
    }
}
