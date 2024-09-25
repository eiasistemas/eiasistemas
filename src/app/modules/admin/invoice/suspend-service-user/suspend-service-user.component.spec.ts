import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspendServiceUserComponent } from './suspend-service-user.component';

describe('SuspendServiceUserComponent', () => {
  let component: SuspendServiceUserComponent;
  let fixture: ComponentFixture<SuspendServiceUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuspendServiceUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuspendServiceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
