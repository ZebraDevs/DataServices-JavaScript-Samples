import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavannaAPISComponent } from './savanna-apis.component';

describe('SavannaAPISComponent', () => {
  let component: SavannaAPISComponent;
  let fixture: ComponentFixture<SavannaAPISComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavannaAPISComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavannaAPISComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
