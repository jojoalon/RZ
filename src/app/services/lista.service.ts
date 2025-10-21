import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaService {

  public listas: any[] = [];
  
  constructor() { }

}
