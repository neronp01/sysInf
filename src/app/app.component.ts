import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import * as firebase from 'firebase/app';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        transform: 'translateX(0)',
      })),
      state('active', style({
        transform: 'translateX(1000)',
      })),
      transition('inactive => active',  animate('6000s')),
      transition('active => inactive', animate('6000s'))
    ])
  ]
})
export class AppComponent {
  state= 'inactive';
  authState: any = null;
  user: Observable<firebase.User>;
  logged: boolean;
  userName: string;
  editeurList: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;
  constructor(public afAuth: AngularFireAuth, db: AngularFireDatabase) {
    this.editeurList = db.list('/edition', { preserveSnapshot: true });
    this.item = db.object('/administration', { preserveSnapshot: true });
    this.item.subscribe(snapshot => {
      snapshot.forEach (element => {
        console.log(element.key)
        console.log(element.val().nom)
      })
    });
    this.user = afAuth.authState;
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.displayName : '';
  }
  logOut() {
    this.afAuth.auth.signOut();
    this.logged = false;
  }
  _isloggedIn(e: boolean) {
    if (e === true) {this.userName = this.currentUserId
    }else { this.userName = ''}
    this.logged = e;
    console.log(this.userName);
  }
  get estUnAdministrateur(): boolean {
    let acces = false;
    this.item.subscribe(snapshot => {
      snapshot.forEach (element => {
        if ( element.val().nom === this.currentUserId ) {
          acces = true;
        }
      })
    })
    return acces;
  }
  get estUnEditeur(): boolean {
    let acces = false;
    this.editeurList.subscribe(snapshot => {
      snapshot.forEach (element => {
        if ( element.val().nom === this.currentUserId ) {
          acces = true;
        }
      })
    })
    return acces;
  }
  changeState(e) {
    if (e.index === 1) {
      this.state = 'inactive';
    }else if (e.index === 0) {
      this.state = 'active';
    }
  }
  test(e) {
    console.log(this.estUnEditeur);
  }
}
