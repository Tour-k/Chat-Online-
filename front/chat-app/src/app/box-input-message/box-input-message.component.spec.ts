import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxInputMessageComponent } from './box-input-message.component';

describe('BoxInputMessageComponent', () => {
  let component: BoxInputMessageComponent;
  let fixture: ComponentFixture<BoxInputMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxInputMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxInputMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
