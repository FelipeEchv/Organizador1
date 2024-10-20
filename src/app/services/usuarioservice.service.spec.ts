import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuarioservice.service';

describe('UsuarioserviceService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
