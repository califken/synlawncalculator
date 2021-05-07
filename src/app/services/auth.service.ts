import { Injectable } from '@angular/core';

import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireDatabase } from '@angular/fire/database';

import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<any>;

  email: string;
  emailvalid = false;

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.object(`users/${user.uid}`).valueChanges();
          // return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }


  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log(credential, this.afAuth.authState);
    return this.updateUserData(credential.user);
  }

  async fbSignin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    console.log(credential, this.afAuth.authState);
    let userinfo = {
      uid: credential.additionalUserInfo.profile['id'],
      email: credential.additionalUserInfo.profile['email'],
      displayName: credential.additionalUserInfo.profile['first_name'],
      photoURL: credential.additionalUserInfo.profile['picture'].data['url']
    };
    return this.updateUserData(userinfo);
  }
  async ghSignin() {
    const provider = new firebase.auth.GithubAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }



  async signOut() {
    await this.afAuth.signOut();
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    // const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userRef = this.db.object(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.update(data);

  }

  async setUserData(data) {

    const user = await this.getUser();
    if (user) {
      return this.db.object(`users/${user.uid}`).update(data);
    }
  }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  async removeUserData(datakey) {

    const user = await this.getUser();
    console.log(user);
    if (user) {
      
      return this.db.object(`users/${user.uid}/${datakey}`).remove();
    }
  }

  validateEmail(email) 
  {
   if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
    {
      //this.emailvalid = true;
      return (true)
    }
      //this.emailvalid = false;
      return (false)
  }

}