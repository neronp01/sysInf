import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {
  state= 'inactive';
  user: any;
  editeurObj: FirebaseObjectObservable<any>;
  editeurList: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;
  constructor(private auth: AuthService, db: AngularFireDatabase) {
    this.editeurObj = db.object('/edition', { preserveSnapshot: true });
    this.editeurList = db.list('/edition', { preserveSnapshot: true });
    this.item = db.object('/administration', { preserveSnapshot: true });
    auth.user.subscribe(
      (x) => this.user = this.auth.currentUserDisplayName,
      (err) => console.log('err'),
      () => console.log('fini')
    )
  }
  ngOnInit() {
  }
logOut() {
    this.auth.logout();
}
  get estUnAdministrateur(): boolean {
    let acces = false;
    this.item.subscribe(snapshot => {
      snapshot.forEach (element => {
        if ( element.val().email === this.auth.currentUserEmail ) {
          acces = true;
        }
      })
    })
    return acces;
  }
  get estUnEditeur(): boolean {
    let acces = false;
    this.editeurObj.subscribe(snapshot => {
      snapshot.forEach (element => {
        if ( element.val().email === this.auth.currentUserEmail ) {
          acces = true;
        }
      })
    })
    return acces;
  }
  test(){
    console.log(this.estUnEditeur);
  }
}
