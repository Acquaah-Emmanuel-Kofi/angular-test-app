import { Component, OnInit, signal } from '@angular/core';
import { TutorialStep } from './tutorial.interface';
import { TooltipComponent } from './components/tooltip/tooltip.component';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [TooltipComponent],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.scss',
})
export class TutorialComponent implements OnInit {
  showTutorial = signal<boolean>(false);
  currentStep = signal<number>(1);
  tutorialSteps: TutorialStep[] = [
    {
      target: '#navbar',
      content:
        "This is your navigation bar. You'll find all the main sections of the app here.",
    },
    {
      target: '#profile-button',
      content:
        'Click here to access your profile settings and account preferences.',
    },
    {
      target: '#dashboard-main',
      content:
        'This is your dashboard where you can see all your important information and recent activities.',
    },
    {
      target: '#quick-actions',
      content:
        'Use these quick action buttons to perform common tasks with just one click.',
    },
  ];


  ngOnInit(): void {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      this.showTutorial.set(true);
    }
  }

  handleNext(): void {
    if (this.currentStep() < this.tutorialSteps.length) {
      this.currentStep.update((step) => step + 1);
      this.highlightElement();
    } else {
      this.completeTutorial();
    }
  }

  handlePrev(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
      this.highlightElement();
    }
  }

  private highlightElement(): void {
    this.tutorialSteps.forEach((step) => {
      const element = document.querySelector(step.target);
      if (element) {
        element.classList.remove('tutorial-highlight');
      }
    });

    const currentElement = document.querySelector(
      this.tutorialSteps[this.currentStep() - 1].target
    );
    if (currentElement) {
      currentElement.classList.add('tutorial-highlight');
    }
  }

  completeTutorial(): void {
    this.showTutorial.set(false);
    localStorage.setItem('hasSeenTutorial', 'true');
    this.tutorialSteps.forEach((step) => {
      const element = document.querySelector(step.target);
      if (element) {
        element.classList.remove('tutorial-highlight');
      }
    });
  }
}
