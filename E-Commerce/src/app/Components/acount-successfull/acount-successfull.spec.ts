import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcountSuccessfull } from './acount-successfull';

describe('AcountSuccessfull', () => {
  let component: AcountSuccessfull;
  let fixture: ComponentFixture<AcountSuccessfull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcountSuccessfull],
    }).compileComponents();

    fixture = TestBed.createComponent(AcountSuccessfull);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
