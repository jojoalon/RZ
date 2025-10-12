import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    public auth: AngularFireAuth,
    private utilsSvc: UtilsService
  ) {}

  async signIn(user: User) {
    return await this.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  async signUp(user: User) {
    return await this.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  async sendRecoveryEmail(email: string) {
    return await this.auth.sendPasswordResetEmail(email);
  }

  async signOut() {
    await this.auth.signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }
}
