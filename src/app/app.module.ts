import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatButtonModule, MatListModule, MatInputModule, MatChipsModule,
  MatDatepickerModule, MatSelectModule, MatNativeDateModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { OnlyNumberDirective } from './directive/only-number';
import { OrderModule } from 'ngx-order-pipe';
import { AppComponent } from './app.component';
import { OrderByDatePipe } from './components/shared/sort-date-pipe';
import { ForFilterPipe } from './components/shared/filter-pipe';
import { AppRoutingModule, routingComponents } from './app.routing.module';


import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    ForFilterPipe,
    routingComponents, OnlyNumberDirective, OrderByDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    OrderModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireDatabaseModule, AngularFireAuthModule,
    AppRoutingModule, BrowserAnimationsModule,
    MatButtonModule, MatListModule, MatInputModule, MatMenuModule, MatChipsModule,
    MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatToolbarModule, MatIconModule, MatSnackBarModule,
    ChartsModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
