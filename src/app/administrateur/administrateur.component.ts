import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']
})
export class AdministrateurComponent implements OnInit {
 @ Input() editeurList: FirebaseListObservable<any>;
  item: FirebaseObjectObservable<any>;
  constructor(db: AngularFireDatabase) {
    this.item = db.object('/edition');
  }
  save(newName: string) {
    this.editeurList.push({ email: newName });
  }
  deleteItem(key: string) {
    this.editeurList.remove(key);
    console.log(key);
  }
  ngOnInit() {
  }
test() {
    console.log('test')
}
}

