import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoModalPage } from './contacto-modal.page';

describe('ContactoModalPage', () => {
  let component: ContactoModalPage;
  let fixture: ComponentFixture<ContactoModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
