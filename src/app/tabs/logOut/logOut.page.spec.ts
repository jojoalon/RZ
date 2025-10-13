import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { LogOutPage } from './logOut.page';

describe('LogOutPage', () => {
  let component: LogOutPage;
  let fixture: ComponentFixture<LogOutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogOutPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LogOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
