import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { MdbModule } from 'mdb-angular-ui-kit';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdbFormsModule } from 'mdb-angular-ui-kit';
import { CalculatorComponent } from './calculator/calculator.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './user/login/login.component';
import { Calculator3delementsComponent } from './calculator3delements/calculator3delements.component';
import { AdminComponent } from './admin/admin.component';


import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    AuthComponent,
    LoginComponent,
    Calculator3delementsComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    MdbModule,
    BrowserAnimationsModule,
    MdbFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
