import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  routerLink(path: string) {
    this.router.navigateByUrl(path);
  }

  async presentToast(options: {
    message: string;
    duration?: number;
    color?: string;
    position?: 'top' | 'middle' | 'bottom';
    icon?: string;
  }) {
    const toast = await this.toastCtrl.create({
      message: options.message,
      duration: options.duration ?? 2000,
      color: options.color ?? 'primary',
      position: options.position ?? 'bottom',
      icon: options.icon ?? 'information-circle-outline'
    });
    toast.present();
  }

  async loading(message: string = 'Cargando...') {
    return this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
  }

  saveInLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage<T>(key: string): T | null {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  }

  removeFromLocalStorage(key: string) {
    localStorage.removeItem(key);
  }
}
