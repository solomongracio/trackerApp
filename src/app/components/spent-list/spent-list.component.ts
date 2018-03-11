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
  public filteredList: any = [];
  public user = {
    'solomon': 'Wzf8AyxbgqcWdZgUCzDcpHQNp0C3',
    'preethi': '74l24VnxASWvS67f4OVx0JUm0iN2'
  };
  public category = '';
  public selectedFilter = '';
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
      this.filterData();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.monthName = params['month'];
      this.month.next(this.monthName);
    });
  }

  changeSelectedUser(uid) {
    this.selectedFilter = uid;
    this.filterData();
  }

  filterData() {
    if (this.selectedFilter === '') {
      this.filteredList = JSON.parse(JSON.stringify(this.spendLists));
      return;
    }
    this.filteredList =  this.spendLists.filter(item => item.addedBy === this.selectedFilter);
  }

  getTotal(uid?) {
    let total = 0;
    if (this.spendLists.length) {
        let filteredList = JSON.parse(JSON.stringify(this.spendLists));
        if (this.category !== '') {
          filteredList = filteredList.filter(item => item['categoryID'] === this.category);
        }
        filteredList.map(item => {
          if (!uid) {
            total += item.amount;
          } else if (item.addedBy === uid) {
            total += item.amount;
          }
        });
    }
    return total;
  }

  remove(key) {
    this.items.remove(key).then(_ => console.log('deleted'));
  }

  edit(key) {
    this.router.navigateByUrl(`/spend/edit/${key}`);
  }

}
