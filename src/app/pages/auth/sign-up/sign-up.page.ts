import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage {

  form: FormGroup;

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  get nameControl(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  async submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      const userData = this.form.value as User;
      const res = await this.firebaseSvc.signUp(userData);
      const user = res.user;

      if (!user) {
        throw new Error('No se pudo registrar el usuario.');
      }

      this.utilsSvc.saveInLocalStorage('user', {
        uid: user.uid,
        email: user.email,
        name: userData.name
      });

      this.utilsSvc.routerLink('/main/home');

      this.utilsSvc.presentToast({
        message: `Bienvenido ${userData.name}`,
        duration: 2000,
        color: 'primary',
        position: 'middle',
        icon: 'person-circle-outline'
      });

      this.form.reset();
    } catch (error: any) {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    } finally {
      loading.dismiss();
    }
  }
}
