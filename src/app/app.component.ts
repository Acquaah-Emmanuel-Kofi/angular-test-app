import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { TutorialComponent } from './components/tutorial/tutorial.component';
import { TutorialService } from './components/tutorial/services/tutorial.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, TutorialComponent],
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
