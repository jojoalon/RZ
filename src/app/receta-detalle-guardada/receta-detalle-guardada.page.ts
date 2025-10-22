import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetasService } from 'src/app/services/recetas.service';


@Component({
  selector: 'app-receta-detalle-guardada',
  templateUrl: './receta-detalle-guardada.page.html',
  styleUrls: ['./receta-detalle-guardada.page.scss'],
  standalone: false,
})
export class RecetaDetalleGuardadaPage implements OnInit {

  receta: any = null;
recetaPdf: any;

  constructor(private router: Router, public recetasService: RecetasService) {
    const navigation = this.router.getCurrentNavigation();


    const recetaData = navigation?.extras.state?.['recetaData'];

    if (recetaData) {
      this.receta = recetaData;
      console.log('Receta cargada desde navigation state:', this.receta.title);
    } else {
      console.warn('Acceso sin datos de receta. Redirigiendo o mostrando mensaje.');
    }
  }

  ngOnInit() {
  }


  volver() {
    this.router.navigateByUrl('/tabs/favoritos');
  }

}
