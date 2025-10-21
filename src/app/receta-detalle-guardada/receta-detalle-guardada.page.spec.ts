import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecetaDetalleGuardadaPage } from './receta-detalle-guardada.page';

describe('RecetaDetalleGuardadaPage', () => {
  let component: RecetaDetalleGuardadaPage;
  let fixture: ComponentFixture<RecetaDetalleGuardadaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecetaDetalleGuardadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
