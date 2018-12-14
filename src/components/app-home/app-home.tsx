<reference types="firebase" />

declare var firebase: firebase.app.App;

import { Component, State, Listen, Event, EventEmitter } from '@stencil/core';
import { authState } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';
import { filter } from 'rxjs/operators';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})
export class AppHome {

  @Event() userUpdated: EventEmitter

  @State() games = null;
  @State() user = null;

  private gamesRef = firebase.firestore().collection('games');
  private gamesSubscription = null;
  private menu = null;
  private loading = false;

  componentWillLoad() {
    // User logged out
    authState(firebase.auth())
      .pipe(filter(user => user === null))
      .subscribe(() => {
        this.user = null;
        this.games = [];
        this.userUpdated.emit(this.user)
        if (this.gamesSubscription) {
          this.gamesSubscription.unsubscribe();
          this.gamesSubscription = null;
        }
    })
    // User logged in
    authState(firebase.auth())
      .pipe(filter(user => user !== null))
      .subscribe((user) => {
        this.user = user;
        this.userUpdated.emit(this.user)
        const query = this.gamesRef.where('creator', "==", user.uid);
        this.gamesSubscription = collectionData(query, 'gameId')
          .subscribe(qs => this.games = qs)
        this.dismissLoading();
    })
  }

  @Listen('loginRequested')
  loginRequestedHandler() {
    this.menu.close();
    this.presentLoading();
    var provider = new (firebase.auth as any).GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  @Listen('logoutRequested')
  logoutRequestHandler() {
    firebase.auth().signOut();
    this.menu.close();
  }

  async presentLoading() {
    const loadingController = document.querySelector('ion-loading-controller');
    await loadingController.componentOnReady();

    const loading = await loadingController.create({
      message: 'Please wait...',
      spinner: "bubbles"
    });

    this.loading = true;
    return await loading.present();
  }

  async dismissLoading() {
    const loadingController = document.querySelector('ion-loading-controller');
    await loadingController.componentOnReady();
    if (this.loading) {
      loadingController.dismiss();
    }
    this.loading = false;
  }

  render() {
    return [

      <app-mainmenu user={this.user} ref={(el) => this.menu = el}></app-mainmenu>,

      <ion-header>
        <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-menu-toggle menu="start">
            <ion-button>
              <ion-icon slot="icon-only" name="menu"></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button href="/addgame">
            <ion-icon slot="icon-only" name="add"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-title>Quiz Master</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content padding>
          <ion-loading-controller></ion-loading-controller>
          <ion-list>
            {this.games ? this.games.map((g) => (
                <ion-card>
                  <ion-card-header>
                    <ion-card-title>{g.name}</ion-card-title>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-grid>
                      <ion-row>
                       <ion-col size="2" offset="0">
                        <ion-button href={("/editgame/" + g.gameId)} fill="outline" shape="round">
                        Edit
                        </ion-button>
                       </ion-col>
                       <ion-col size="2"/>
                       <ion-col size="2">
                        <ion-button href={"/playgame/" + g.gameId} fill="outline" shape="round">
                        Play
                        </ion-button>
                       </ion-col>
                      </ion-row>
                    </ion-grid>
                  </ion-card-content>
                </ion-card>
            )) : ''}
          </ion-list>
      </ion-content>
    ];
 }
}
