import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCardNoteComponent } from './shopping-card-note.component';

describe('ShoppingCardNoteComponent', () => {
  let component: ShoppingCardNoteComponent;
  let fixture: ComponentFixture<ShoppingCardNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCardNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCardNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
