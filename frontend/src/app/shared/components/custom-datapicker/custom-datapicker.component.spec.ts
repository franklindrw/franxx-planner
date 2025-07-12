import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatapickerComponent } from './custom-datapicker.component';

describe('CustomDatapickerComponent', () => {
  let component: CustomDatapickerComponent;
  let fixture: ComponentFixture<CustomDatapickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDatapickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDatapickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
