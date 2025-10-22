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
      return await this.auth.signOut();
  }


  async processLogout() {
      await this.signOut(); 
      localStorage.removeItem('user');
      this.utilsSvc.routerLink('/auth');

      this.utilsSvc.presentToast({
          message: 'Sesión cerrada exitosamente.',
          duration: 500,
          color: 'success',
          position: 'middle'
      });
  }
}
