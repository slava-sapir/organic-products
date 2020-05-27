import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersNoteComponent } from './my-orders-note.component';

describe('MyOrdersNoteComponent', () => {
  let component: MyOrdersNoteComponent;
  let fixture: ComponentFixture<MyOrdersNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOrdersNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrdersNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
