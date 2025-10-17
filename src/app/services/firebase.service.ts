import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Usando la versión compat
import { User } from '../models/user.model';
import { UtilsService } from './utils.service';

// Nota: No necesitas esta importación si usas AngularFireAuth (la versión compat)
// import { Auth, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  // ATENCIÓN: Eliminamos la inyección circular de 'firebaseSvc'
  constructor(
    public auth: AngularFireAuth, // <--- Esta es tu herramienta de Firebase
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

  // >>> AÑADIMOS Y ACTIVAMOS EL MÉTODO SIGN-OUT CORRECTO USANDO 'this.auth'
  async signOut() {
      // Llama a la función de Firebase para cerrar la sesión
      return await this.auth.signOut();
  }

  // >>> ELIMINAMOS 'this.firebaseSvc.signOut()' y llamamos a 'this.signOut()' localmente.
  // Además, la lógica de navegación y toast debe ir en el componente (LogOutPage)
  // o debes pasar la llamada a 'this.signOut()' a otra función como 'processLogout'.
  async processLogout() {
      await this.signOut(); // <-- LLAMA AL MÉTODO DEFINIDO ARRIBA
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
