import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetaPage } from './etiqueta.page';

describe('EtiquetaPage', () => {
  let component: EtiquetaPage;
  let fixture: ComponentFixture<EtiquetaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtiquetaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
