import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBox } from './my-box';

describe('MyBox', () => {
  let component: MyBox;
  let fixture: ComponentFixture<MyBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
