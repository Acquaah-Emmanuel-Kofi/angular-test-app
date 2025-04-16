import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinymceSelfHostedComponent } from './tinymce-self-hosted.component';

describe('TinymceSelfHostedComponent', () => {
  let component: TinymceSelfHostedComponent;
  let fixture: ComponentFixture<TinymceSelfHostedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TinymceSelfHostedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TinymceSelfHostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
