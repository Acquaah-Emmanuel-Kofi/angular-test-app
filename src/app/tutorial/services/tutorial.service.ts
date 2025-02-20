import { ElementRef, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  private tutorialState = signal(false);
  private currentStep = signal(1);

  // Store tutorial steps centrally
  private steps = signal([
    {
      target: '#navbar',
      content: 'Navigation bar introduction',
      route: '/dashboard', // Which route this step belongs to
    },
    // ... more steps
  ]);

  // Methods to control tutorial flow from anywhere
  startTutorial() {
    this.tutorialState.set(true);
    this.currentStep.set(1);
  }

  skipTutorial() {
    this.tutorialState.set(false);
    localStorage.setItem('tutorialCompleted', 'true');
  }

  // Method to check if tutorial should show on specific routes
  shouldShowTutorialForRoute(route: string): boolean {
    return (
      !localStorage.getItem('tutorialCompleted') &&
      this.steps().some((step) => step.route === route)
    );
  }

  saveTutorialProgress() {
    localStorage.setItem('tutorialStep', this.currentStep().toString());
  }

  resumeTutorial() {
    const savedStep = localStorage.getItem('tutorialStep');
    if (savedStep) {
      this.currentStep.set(parseInt(savedStep));
      this.tutorialState.set(true);
    }
  }
}
