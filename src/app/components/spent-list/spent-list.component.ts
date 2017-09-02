import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-spent-list',
  templateUrl: './spent-list.component.html',
  styleUrls: ['./spent-list.component.css']
})
export class SpentListComponent implements OnInit {

  public monthName: string;
  public categories: FirebaseListObservable<any>;
  public spendLists: any = [];
  public appCategory: any = [];
  public category = '';
  items: FirebaseListObservable<any>;
  month = new Subject();
  constructor(db: AngularFireDatabase, public location: Location, private router: Router, private route: ActivatedRoute) {
    this.items = db.list('/items', {
      query: {
        orderByChild: 'monthName',
        equalTo: this.month
      }
    });

    this.categories = db.list('/categories');
    this.categories.subscribe(item => {
      this.appCategory = item;
    });

    this.items.subscribe(queriedItems => {
      this.spendLists = queriedItems;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.monthName = params['month'];
      this.month.next(this.monthName);
    });
  }

  remove(key) {
    this.items.remove(key).then(_ => console.log('deleted'));
  }

  edit(key) {
    this.router.navigateByUrl(`/spend/edit/${key}`);
  }

}
