import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aifeature } from './aifeature';

describe('Aifeature', () => {
  let component: Aifeature;
  let fixture: ComponentFixture<Aifeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aifeature],
    }).compileComponents();

    fixture = TestBed.createComponent(Aifeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
