import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnsNavComponent } from './btns-nav.component';

describe('BtnsNavComponent', () => {
  let component: BtnsNavComponent;
  let fixture: ComponentFixture<BtnsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
