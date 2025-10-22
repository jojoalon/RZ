import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de la ruta


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage {

  constructor(
    private firebaseSvc: FirebaseService
  ) {}
    async processLogout() {
    await this.firebaseSvc.processLogout();
  }

}
