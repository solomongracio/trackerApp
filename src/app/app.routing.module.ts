import { NgModule } from '@angular/core';
import { RouterModule , Routes} from '@angular/router';
import { DashboardComponent} from '../../src/app/components/dashboard/dashboard.component';
import { AddSpendComponent } from '../../src/app/components/add-spend/add-spend.component';
import { SpentListComponent } from './components/spent-list/spent-list.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'dashboard', component: DashboardComponent },
    { path: 'spend/:action/:key', component: AddSpendComponent },
    { path: 'spent/list/:month', component: SpentListComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: DashboardComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
    exports: [RouterModule],
  })
  export class AppRoutingModule { }
  export const routingComponents = [DashboardComponent , AddSpendComponent, SpentListComponent, LoginComponent ];
