import { TestBed } from '@angular/core/testing';

import { ContactoService } from './contactos.service';

describe('ContactosService', () => {
  let service: ContactoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
