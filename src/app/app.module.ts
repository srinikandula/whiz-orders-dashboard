import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgReduxModule} from '@angular-redux/store';
import {NgRedux, DevToolsExtension} from '@angular-redux/store';
import {rootReducer, ArchitectUIState} from './ThemeOptions/store';
import {ConfigActions} from './ThemeOptions/store/config.actions';
import {AppRoutingModule} from './app-routing.module';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

import {CommonModule} from '@angular/common';
import {HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {AppComponent} from './app.component';

// BOOTSTRAP COMPONENTS

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {LaddaModule} from 'angular2-ladda';
import {NgxLoadingModule} from 'ngx-loading';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {ToastrModule} from 'ngx-toastr';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CountUpModule} from 'countup.js-angular2';
import {AgmCoreModule} from '@agm/core';
import {ImageCropperModule} from 'ngx-image-cropper';
import {NgBootstrapFormValidationModule} from 'ng-bootstrap-form-validation';
import {AngularStickyThingsModule} from '@w11k/angular-sticky-things';
import {NouisliderModule} from 'ng2-nouislider';
import {NgSelectModule} from '@ng-select/ng-select';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {TextMaskModule} from 'angular2-text-mask';
import {ClipboardModule} from 'ngx-clipboard';
import {TextareaAutosizeModule} from 'ngx-textarea-autosize';
import {ColorPickerModule} from 'ngx-color-picker';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {DROPZONE_CONFIG} from 'ngx-dropzone-wrapper';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {ChartsModule} from 'ng2-charts';

// import {TimeAgoPipe} from 'time-ago-pipe';
// import {CountUpModule} from 'countup.js-angular2';


// ANGULAR MATERIAL COMPONENTS

import {MatCheckboxModule, MatRippleModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTreeModule} from '@angular/material/tree';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


// LAYOUT

import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {AppsLayoutComponent} from './Layout/apps-layout/apps-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';
import {ThemeOptions} from './theme-options';
import {OptionsDrawerComponent} from './ThemeOptions/options-drawer/options-drawer.component';
import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import {HeaderComponent} from './Layout/Components/header/header.component';
import {DotsComponent} from './Layout/Components/header/elements/dots/dots.component';
import {SearchBoxComponent} from './Layout/Components/header/elements/search-box/search-box.component';
import {MegamenuComponent} from './Layout/Components/header/elements/mega-menu/mega-menu.component';
import {MegapopoverComponent} from './Layout/Components/header/elements/mega-menu/elements/megapopover/megapopover.component';
import {UserBoxComponent} from './Layout/Components/header/elements/user-box/user-box.component';
import {DrawerComponent} from './Layout/Components/header/elements/drawer/drawer.component';

// SIDEBAR

import {SidebarComponent} from './Layout/Components/sidebar/sidebar.component';
import {LogoComponent} from './Layout/Components/sidebar/elements/logo/logo.component';


// FOOTER

import {FooterComponent} from './Layout/Components/footer/footer.component';
import {FooterDotsComponent} from './Layout/Components/footer/elements/footer-dots/footer-dots.component';
import {FooterMenuComponent} from './Layout/Components/footer/elements/footer-menu/footer-menu.component';

// DEMO PAGES

// Dashboards

import {HomeComponent} from './Pages/home/home.component';
import {LoginComponent} from './Pages/login/login.component';
import { FilterPipe } from './filterpipe.pipe';
import { AuthInterceptor } from './authconfig.interceptor';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
// Applications



// Pages



// Elements



// Components



// Tables


// Forms Components



// Chart.js Examples


// Apex Charts

import {NgApexchartsModule} from 'ng-apexcharts';


// Gauges Charts

import {GaugeModule} from 'angular-gauge';
import {TrendModule} from 'ngx-trend';
import { OrdersComponent } from './Pages/orders/orders.component';
import { RouterguardGuard } from './routerguard.guard';
import { BatchesComponent } from './Pages/batches/batches.component';
import { ShiftsComponent } from './Pages/batches/shifts/shifts.component';
import { SitesComponent } from './Pages/sites/sites.component';
import { CashmanagementComponent } from './Pages/cashmanagement/cashmanagement.component';
import { MyLoaderComponent } from './my-loader/my-loader.component';
import { LoaderService } from './loader.service';
import { LoaderInterceptorService } from './loader-interceptor.service';
import { FleetComponent } from './Pages/fleet/fleet.component';
import { CustomerComponent } from './Pages/customer/customer.component';
import { environment } from 'src/environments/environment';

// Angular Material



const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

const config: SocketIoConfig = { url: environment.SOCKET_ENDPOINT, options: {} };

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    AppsLayoutComponent,
    PagesLayoutComponent,
    OptionsDrawerComponent,
    PageTitleComponent,
    FilterPipe,
    // TimeAgoPipe,

    // HEADER

    HeaderComponent,
    DotsComponent,
    SearchBoxComponent,
    MegamenuComponent,
    MegapopoverComponent,
    UserBoxComponent,
    DrawerComponent,

    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,
    FooterDotsComponent,
    FooterMenuComponent,

    // DEMO PAGES

    // Dashboards
    HomeComponent,
    LoginComponent,

    OrdersComponent,

    BatchesComponent,

    ShiftsComponent,

    SitesComponent,

    CashmanagementComponent,

    MyLoaderComponent,

    FleetComponent,

    CustomerComponent,
    

    // Applications

    

    // User Pages

  

    // Elements

   

    // Components

   

    // Tables


    // Dashboard Boxes


    // Form Elements


    // Form Widgets

    

    // CHARTS


    // Apex Charts


    // Chart.js Examples

  

    // ANGULAR MATERIAL

    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    Ng2SearchPipeModule,
    SocketIoModule.forRoot(config),

    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    AngularFontAwesomeModule,
    LaddaModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RoundProgressModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    ToastrModule.forRoot(),
    SlickCarouselModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountUpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: ''
    }),
    ImageCropperModule,
    AngularStickyThingsModule,
    NouisliderModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    AngularEditorModule,
    HttpClientModule,
    TextMaskModule,
    ClipboardModule,
    TextareaAutosizeModule,
    ColorPickerModule,
    DropzoneModule,

    // Charts

    ChartsModule,
    NgApexchartsModule,
    GaugeModule.forRoot(),
    TrendModule,

    // Angular Material Components

    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTreeModule,
    MatRippleModule,
    
  ],
  providers: [
    {
      provide:
      PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
      DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    {provide : LocationStrategy , useClass: HashLocationStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true },
    ConfigActions,
    ThemeOptions,
    RouterguardGuard
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
              private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [devTool.isEnabled() ? devTool.enhancer() : f => f]
    );

  }
}
