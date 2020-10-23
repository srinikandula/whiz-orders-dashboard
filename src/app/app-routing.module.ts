import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {AppsLayoutComponent} from './Layout/apps-layout/apps-layout.component';
import { HomeComponent } from './Pages/home/home.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { LoginComponent } from './Pages/login/login.component';
import { RouterguardGuard } from './routerguard.guard';
import { BatchesComponent } from './Pages/batches/batches.component';
import { ShiftsComponent } from './Pages/batches/shifts/shifts.component';
import { SitesComponent } from './Pages/sites/sites.component';
import { CashmanagementComponent } from './Pages/cashmanagement/cashmanagement.component';
import { FleetComponent } from './Pages/fleet/fleet.component';
import { CustomerComponent } from './Pages/customer/customer.component';

// DEMO PAGES

// Dashboards



// Applications



// Pages


// Elements




// Components



// Tables



// Widgets



// Forms Elements



// Forms Components



// Charts



// Angular Material


const routes: Routes = [
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages
      // {path:'',component:LoginComponent,data:{extraParameter:''}},
      {path: 'login', component: LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},

     
     
    ]
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: [

      // Dashboads
      // {path: 'home', component: HomeComponent,data: {extraParameter: ''},canActivate: [RouterguardGuard]},
      // {path:'',redirectTo:'home',pathMatch:'full', canActivate: [RouterguardGuard]},
      {path: 'orders', component: OrdersComponent,data: {extraParameter: ''}, canActivate: [RouterguardGuard]},
      {path: 'fleet', component: FleetComponent,data: {extraParameter: ''}, canActivate: [RouterguardGuard]},
      {path: 'batches', component: BatchesComponent,data: {extraParameter: ''}, canActivate: [RouterguardGuard]},
      {path: 'batches/shifts', component: ShiftsComponent,data: {extraParameter: ''}, canActivate: [RouterguardGuard]},
      {path: 'customer', component: CustomerComponent,data: {extraParameter: ''}, canActivate: [RouterguardGuard]},
      // {path: 'trips', component: TripsComponent,data: {extraParameter: ''}, canActivate: [RouterguardGuard]},
      {path: 'sites', component: SitesComponent,data: {extraParameter: ''}, canActivate: [RouterguardGuard]},
      {path: 'cashm', component: CashmanagementComponent,data: {extraParameter: ''}, canActivate: [RouterguardGuard]},
      

      // Elements  data: {extraParameter: 'dashboardsMenu'}

      
      // Components

      

      // Tables

      

      // Widgets

     

      // Forms Elements

      

      // Forms Widgets

 

      // Charts

      

      // Angular Material

      // Form Controls

     

      // Buttons & Indicators

      
    ]

  },
  // {
  //   path: '',
  //   component: PagesLayoutComponent,
  //   children: [

  //     // User Pages

     
  //   ]
  // },
  {
    path: '',
    component: AppsLayoutComponent,
    children: [

      // Applications

 
    ]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
