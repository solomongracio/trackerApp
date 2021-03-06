import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {MatSnackBar} from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December'];
@Component({
  selector: 'app-add-spend',
  templateUrl: './add-spend.component.html',
  styleUrls: ['./add-spend.component.css']
})
export class AddSpendComponent implements OnInit {

  user: Observable<firebase.User>;
  items: FirebaseListObservable<any>;
  userList: FirebaseListObservable<any>;
  categories: FirebaseListObservable<any>;
  action:  string;
  key: string;
  appCategory: any;
  currentUser: any;
  obj: FirebaseObjectObservable<any>;
  addObj: any = {
    amount: '',
    category: '',
    desc: '',
    date: ''
  };

  constructor(private db: AngularFireDatabase,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute, private snackbar: MatSnackBar, public afAuth: AngularFireAuth) {
      this.items = db.list('/items');
      this.userList = db.list('/listUsers');
      this.categories = db.list('/categories');
      this.user = afAuth.authState;
      this.user.subscribe(user => {
        if (user) {
          this.currentUser = user;
        }
      });
      this.categories.subscribe(item => {
        this.appCategory = item;
      });
      this.userList.subscribe(users => {
        console.log('user list', users);
      });

      this.action = route.snapshot.params['action'];
      if (this.action === 'edit') {
        this.key = route.snapshot.params['key'];
        this.obj = db.object(`/items/${this.key}`);
        this.obj.subscribe(item => {
          this.addObj = {
            amount: item.amount,
            category: item.categoryID,
            desc: item.desc,
            date: item.date
          };
        });
      }
   }

  ngOnInit() {
  }

  addItem() {
    this.addObj.categoryID = this.addObj.category;
    if (this.currentUser.uid) {
      this.addObj.addedByName = this.currentUser.displayName;
      this.addObj.addedBy = this.currentUser.uid;
    }
    this.addObj.categoryID = this.addObj.category;
    this.addObj.date = new Date(this.addObj.date).toString();
    this.addObj.monthName = months[new Date(this.addObj.date).getMonth()];
    this.addObj.year = new Date(this.addObj.date).getFullYear();
    this.addObj.monthyear = months[new Date(this.addObj.date).getMonth()] + '~' + (new Date(this.addObj.date).getFullYear());
    // tslint:disable-next-line:radix
    this.addObj.amount = parseInt(this.addObj.amount);
    const id = this.addObj.categoryID;
    this.addObj.categoryName = this.appCategory.filter(i => i.id === id)[0].name;
    delete this.addObj['category'];
    if (this.action === 'add') {
      console.log(this.addObj);
      this.items.push(this.addObj);
      this.clearInputs();
      this.snackbar.open('Added Successfully', 'Add', {duration: 3000});
    } else if (this.action === 'edit') {
      this.obj.update(this.addObj).then(_ => console.log('updated'));
      this.snackbar.open('Updated Successfully', 'Edit', {duration: 3000});
      this.location.back();
    }
  }

  back() {
    this.location.back();
  }

  clearInputs() {
    this.addObj = {
      amount: '',
      category: '',
      desc: '',
      date: ''
    };
  }

}
