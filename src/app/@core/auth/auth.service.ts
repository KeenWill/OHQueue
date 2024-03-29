import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NotifyService } from '../notify/notify.service';

import { Observable, of } from 'rxjs';
import { startWith, switchMap, tap } from 'rxjs/operators';

export interface User {
  uid: string;
  email?: string | null;
  displayName?: string;
  isTA?: boolean;
}

@Injectable()
export class AuthService {

  user: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private notify: NotifyService,
  ) {
    let initUser: User = null;
    const localStorageUser = localStorage.getItem('user');
    if (localStorageUser) {
      initUser = JSON.parse(localStorageUser);
    }
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }),
      tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      }),
      startWith(initUser),
    );
  }

  getTAs(): Observable<User[]> {
    return this.afs.collection<User>(`users/`, (ref) => ref.where('isTA', '==', true)).valueChanges();
  }

  getStudents(): Observable<User[]> {
    return this.afs.collection<User>(`/users/`, (ref) => ref.where('isTA', '==', false)).valueChanges();
  }

  promoteToTA(uid: string): Promise<void> {
    return this.afs.doc<User>(`/users/${uid}`).update({ isTA: true });
  }

  demoteFromTA(uid: string): Promise<void> {
    return this.afs.doc<User>(`/users/${uid}`).update({ isTA: false });
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        this.notify.update('Welcome to Firestarter!!!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome new user!', 'success');
        return this.updateUserData(credential.user); // if using firestore
      })
      .catch(error => this.handleError(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.notify.update('Welcome back!', 'success');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth();

    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch(error => this.handleError(error));
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      localStorage.setItem('user', null);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  // Sets user data to firestore after succesful login
  private updateUserData({ uid, email, displayName }) {
    return this.afs.doc(
      `users/${uid}`,
    )
    .update({ uid, email, displayName })
    .catch(() => this.afs.doc(
      `users/${uid}`,
    )
    .set({ uid, email, displayName, isTA: false }));
  }
}
