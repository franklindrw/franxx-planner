import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewActivityModalComponent } from './new-activity-modal.component';

describe('NewActivityModalComponent', () => {
  let component: NewActivityModalComponent;
  let fixture: ComponentFixture<NewActivityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewActivityModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewActivityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
