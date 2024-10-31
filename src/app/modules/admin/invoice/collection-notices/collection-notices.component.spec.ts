import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionNoticesComponent } from './collection-notices.component';

describe('CollectionNoticesComponent', () => {
  let component: CollectionNoticesComponent;
  let fixture: ComponentFixture<CollectionNoticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionNoticesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollectionNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
