import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { BusquedaPage } from './busqueda.page';

describe('BusquedaPage', () => {
  let component: BusquedaPage;
  let fixture: ComponentFixture<BusquedaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusquedaPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
