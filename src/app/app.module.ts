import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdCardModule, MdGridListModule, MdListModule,
  MdInputModule, MatDatepickerModule, MdNativeDateModule, MatSlideToggleModule, MatListModule, MdToolbarModule, MdMenuModule , MdTabsModule} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';




import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginComponent} from './login/login.component';
import { HomeComponent} from './home/home.component';
import 'hammerjs';
import {HomeModule} from './home/home.module';
import { AdministrateurComponent } from './administrateur/administrateur.component';
import { ApercuComponent } from './apercu/apercu.component';
import { SvgTextComponent } from './apercu/svg-text/svg-text.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    AdministrateurComponent,
    ApercuComponent,
    SvgTextComponent,

  ],
  imports: [
    AppRoutingModule, LoginRoutingModule, HomeModule,
    BrowserModule, BrowserAnimationsModule, MdButtonModule, MdCheckboxModule, MdToolbarModule, MdTabsModule,
    MdCardModule, MdGridListModule, MdMenuModule, MdInputModule, MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
