import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpeoplepnumComponent } from './editpeoplepnum.component';

describe('EditpeoplepnumComponent', () => {
  let component: EditpeoplepnumComponent;
  let fixture: ComponentFixture<EditpeoplepnumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpeoplepnumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpeoplepnumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
