import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountCreatedComponent} from '../acount-successfull/acount-successfull'

describe('AccountSuccessfullComponent', () => {
  let component: AccountCreatedComponent;
  let fixture: ComponentFixture<AccountCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountCreatedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
