import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheFactoryFormComponent } from './the-factory-form.component';

describe('TheFactoryFormComponent', () => {
  let component: TheFactoryFormComponent;
  let fixture: ComponentFixture<TheFactoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TheFactoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TheFactoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
