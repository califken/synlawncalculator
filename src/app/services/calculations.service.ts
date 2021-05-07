import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { User, Calculations } from '../interfaces';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {
  usercalculations$: Observable<any>;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public auth: AuthService
  ) {
    this.usercalculations$ = this.auth.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object(`usercalculations/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }



  async saveCalculations(data) {
    const user = await this.getUser();
    if (user) {
      return this.db.object(`usercalculations/${user.uid}`).update(data);
    }
  }


  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

}