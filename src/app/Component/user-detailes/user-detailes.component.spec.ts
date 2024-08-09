import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailesComponent } from './user-detailes.component';

describe('UserDetailesComponent', () => {
  let component: UserDetailesComponent;
  let fixture: ComponentFixture<UserDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
