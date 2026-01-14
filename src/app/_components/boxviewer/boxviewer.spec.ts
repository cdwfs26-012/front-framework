import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Boxviewer } from './boxviewer';

describe('Boxviewer', () => {
  let component: Boxviewer;
  let fixture: ComponentFixture<Boxviewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Boxviewer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Boxviewer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
