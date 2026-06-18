import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Whistlist } from './wishlist';

describe('Whistlist', () => {
  let component: Whistlist;
  let fixture: ComponentFixture<Whistlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Whistlist],
    }).compileComponents();

    fixture = TestBed.createComponent(Whistlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
