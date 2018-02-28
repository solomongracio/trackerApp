import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December'];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  monthName: string;
  items: FirebaseListObservable<any>;
  subject = new Subject();
  year = new Date().getFullYear();

  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  // tslint:disable-next-line:no-inferrable-types
  public pieChartType: string = 'pie';
  public showChart = false;

  constructor(db: AngularFireDatabase) {
    this.items = db.list('/items', {
      query: {
        orderByChild: 'monthyear',
        equalTo: this.subject
      }
    });

    this.items.subscribe(queriedItems => {
      console.log(queriedItems);
      this.drawChart(queriedItems);
    });
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
  }

  drawChart(items: any) {
    // tslint:disable-next-line:prefer-const
    let labels: string[] = [];
    // tslint:disable-next-line:prefer-const
    let data: number[] = [];
    for (let i = 0; i < items.length; i++) {
      const ind = labels.indexOf(items[i].categoryName);
      if (ind > -1) {
        data[ind] = data[ind] + items[i].amount;
      } else {
        labels.push(items[i].categoryName);
        data.push(items[i].amount);
      }
    }
    this.pieChartLabels = labels;
    this.pieChartData = data;
    this.resetChart();
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  resetChart() {
    this.showChart = false;
    const self = this;
    setTimeout(function() {
      self.showChart = true;
    }, 50);
  }

  getTotal(items: any) {
    let total = 0;
    if (items) {
        // tslint:disable-next-line:forin
        for (const i in items) {
          // tslint:disable-next-line:radix
          total = parseInt(items[i].amount) + total;
        }
        return 'Rs. ' + total;
      }
      return 'Loading...';
  }

  goPrev() {
    let index = months.indexOf(this.monthName);
    if (index === 0) {
        this.year = this.year - 1;
        index = 11;
      } else {
        index = index - 1;
      }
      this.monthName = months[index];
      this.subject.next(this.monthName + '~' + this.year);
  }

  goNext() {
    let index = months.indexOf(this.monthName);
    if (index === 11) {
        index = 0;
        this.year = this.year + 1;
      } else {
        index = index + 1;
      }
      this.monthName = months[index];
      this.subject.next(this.monthName + '~' + this.year);
  }

  ngOnInit() {
    this.monthName = months[(new Date().getMonth())];
    this.subject.next('dummay');
    // tslint:disable-next-line:prefer-const
    let self = this;
    setTimeout(() => {this.subject.next(this.monthName + '~' + this.year); }, 2000);
  }

}
