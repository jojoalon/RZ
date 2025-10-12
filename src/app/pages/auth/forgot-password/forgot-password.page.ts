import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: false
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value;

      if (typeof email === 'string' && email.trim()) {
        const loading = await this.utilsSvc.loading();
        await loading.present();

        this.firebaseSvc.sendRecoveryEmail(email).then(() => {
          this.utilsSvc.presentToast({
            message: 'Correo enviado con éxito',
            duration: 1500,
            color: 'primary',
            position: 'middle',
            icon: 'mail-outline'
          });

          this.utilsSvc.routerLink('/auth');
          this.form.reset();
        }).catch(error => {
          console.log(error);

          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'danger',
            position: 'middle',
            icon: 'alert-circle-outline'
          });
        }).finally(() => {
          loading.dismiss();
        });
      } else {
        this.utilsSvc.presentToast({
          message: 'Por favor ingresa un correo válido.',
          duration: 2500,
          color: 'warning',
          position: 'middle',
          icon: 'help-circle-outline'
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
