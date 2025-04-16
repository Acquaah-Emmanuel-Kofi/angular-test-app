import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private tutorialState = signal(false);
  private currentStep = signal(1);

  private steps = signal([
    {
      target: '#navbar',
      content: 'Navigation bar introduction',
      route: '/dashboard',
    },
  ]);

  startTutorial() {
    this.tutorialState.set(true);
    this.currentStep.set(1);
  }

  skipTutorial() {
    this.tutorialState.set(false);
    sessionStorage.setItem('tutorialCompleted', 'true');
  }

  // Method to check if tutorial should show on specific routes
  shouldShowTutorialForRoute(route: string): boolean {
    return (
      !sessionStorage.getItem('tutorialCompleted') &&
      this.steps().some((step) => step.route === route)
    );
  }

  saveTutorialProgress() {
    sessionStorage.setItem('tutorialStep', this.currentStep().toString());
  }

  resumeTutorial() {
    const savedStep = sessionStorage.getItem('tutorialStep');
    if (savedStep) {
      this.currentStep.set(parseInt(savedStep));
      this.tutorialState.set(true);
    }
  }
}
