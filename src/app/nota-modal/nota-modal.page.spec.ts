import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotaModalPage } from './nota-modal.page';

describe('NotaModalPage', () => {
  let component: NotaModalPage;
  let fixture: ComponentFixture<NotaModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
