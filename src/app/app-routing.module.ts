import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RouterGuard } from './router.guard';
import { LoginComponent } from './Pages/login/login.component';
import { BaselayoutComponent } from './Layout/baselayout/baselayout.component';
import { PagelayoutComponent } from './Layout/pagelayout/pagelayout.component';
import { OrdersComponent } from './Pages/orders/orders.component';
import { FleetComponent } from './Pages/fleet/fleet.component';

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
    component: BaselayoutComponent,
    children: [

      // Dashboads
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      {path: 'dashboard', component: DashboardComponent,canActivate: [RouterGuard],},
      {path: 'orders', component: OrdersComponent,canActivate: [RouterGuard],},
      {path: 'fleetinfo', component: FleetComponent,canActivate: [RouterGuard],},
      // {path: 'orders', component: OrdersComponent, canActivate: [RouterguardGuard]},
      // {path: 'trackvehicle', component: TrackvehicleComponent, canActivate: [RouterguardGuard]},
      

      
    ]

  },
  {
    path: '',
    component: PagelayoutComponent,
    children: [

      // User Pages
      // {path:'',component:LoginComponent,data:{extraParameter:''}},
      {path: 'login', component: LoginComponent},
      {path:'',redirectTo:'login',pathMatch:'full'},

     
     
    ]
  },
  
      // User Pages
      // {path:'',component:LoginComponent,data:{extraParameter:''}},
      // {path: 'login', component: LoginComponent},
      // {path:'',redirectTo:'login',pathMatch:'full'},
      // {path: 'dashboard', component: DashboardComponent,canActivate: [RouterGuard],}
      // {path: 'orders', component: OrdersComponent, canActivate: [RouterGuard]},
      // {path: 'trackvehicle', component: TrackvehicleComponent, canActivate: [RouterGuard]},
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
