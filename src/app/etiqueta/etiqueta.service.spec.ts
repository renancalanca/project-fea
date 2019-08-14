import { TestBed } from '@angular/core/testing';

import { EtiquetaService } from './etiqueta.service';

describe('EtiquetaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EtiquetaService = TestBed.get(EtiquetaService);
    expect(service).toBeTruthy();
  });
});
