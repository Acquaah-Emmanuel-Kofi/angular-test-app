import { Component, signal } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { TutorialService } from './components/tutorial/services/tutorial.service';
import { ButtonComponent } from './components/button/button.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TutorialComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading = signal<boolean>(false);

  constructor(
    private router: Router,
    private tutorialService: TutorialService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Check if tutorial should be shown for new route
        const shouldShow = this.tutorialService.shouldShowTutorialForRoute(
          this.router.url
        );

        if (shouldShow) {
          this.tutorialService.startTutorial();
        }
      });
  }

  handleClick(event: MouseEvent): void {
    console.log('Button clicked!', event);
    this.isLoading.set(true);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 3000);
  }
}
