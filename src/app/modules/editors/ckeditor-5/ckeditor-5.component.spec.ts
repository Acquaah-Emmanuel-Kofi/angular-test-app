import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ckeditor5Component } from './ckeditor-5.component';

describe('Ckeditor5Component', () => {
  let component: Ckeditor5Component;
  let fixture: ComponentFixture<Ckeditor5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ckeditor5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ckeditor5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
