import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpendComponent } from './add-spend.component';

describe('AddSpendComponent', () => {
  let component: AddSpendComponent;
  let fixture: ComponentFixture<AddSpendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSpendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
