// src/app/tabs/logOut/logOut.page.ts

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de la ruta

@Component({
  selector: 'app-log-out',
   templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  standalone: false,
})
export class LogoutPage implements OnInit {

  constructor(
    private firebaseSvc: FirebaseService // Inyectamos el servicio
  ) {
    // Llamar al logout inmediatamente al crear el componente
    this.processLogout();
  }

  ngOnInit() {} // No necesitas nada aquí si usas el constructor

  async processLogout() {
    // ESTA FUNCIÓN ESTÁ EN EL SERVICIO DE FIREBASE, PERO AQUÍ LA EJECUTAMOS
    // Esta función debe contener: await this.firebaseSvc.signOut(); this.utilsSvc.routerLink('/auth');
    await this.firebaseSvc.processLogout();
  }
}

