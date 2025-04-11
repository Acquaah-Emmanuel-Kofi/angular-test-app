import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorComponent, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-tinymce-self-hosted',
  standalone: true,
  imports: [EditorComponent, FormsModule],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
  templateUrl: './tinymce-self-hosted.component.html',
  styleUrl: './tinymce-self-hosted.component.scss',
})
export class TinymceSelfHostedComponent {
  htmlContent = signal<string>('Hello World!');

  editorConfig: EditorComponent['init'] = {
    base_url: '/tinymce',
    suffix: '.min',
    branding: false,
    promotion: false,
    menubar: true,
    height: 500,
    license_key: 'gpl',
    plugins: 'lists link image paste table code help wordcount',
    toolbar:
      'undo redo | blocks | bold italic | alignleft aligncenter alignright | indent outdent | bullist numlist | code | help',
  };
}
