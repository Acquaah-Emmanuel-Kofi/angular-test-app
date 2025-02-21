import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { TutorialService } from './components/tutorial/services/tutorial.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TutorialComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
}
