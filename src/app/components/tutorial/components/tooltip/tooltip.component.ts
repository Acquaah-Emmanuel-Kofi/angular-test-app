import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
} from '@angular/core';

interface Position {
  top: number;
  left: number;
}

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent implements AfterViewInit, OnDestroy {
  target = input.required<string>();
  content = input.required<string>();
  step = input.required<number>();
  totalSteps = input.required<number>();
  next = output<void>();
  prev = output<void>();

  private position = signal<Position>({ top: 0, left: 0 });
  private placement = signal<'top' | 'bottom'>('bottom');

  tooltipPlacement = computed(() => this.placement());
  tooltipTransform = computed(
    () => `translate(${this.position().left}px, ${this.position().top}px)`
  );

  private resizeObserver!: ResizeObserver;
  private mutationObserver!: MutationObserver;
  private scrollHandler: () => void;

  constructor(private elementRef: ElementRef) {
    this.scrollHandler = () => this.updatePosition();

    // Set up effect for position updates
    effect(() => {
      // This will re-run whenever position() or placement() changes
      const pos = this.position();
      const place = this.placement();
      // Any additional side effects that need to happen on position change
    });
  }

  ngAfterViewInit(): void {
    this.initializeObservers();
    this.initializeEventListeners();
    requestAnimationFrame(() => this.updatePosition());
  }

  ngOnDestroy(): void {
    this.cleanupObservers();
    this.cleanupEventListeners();
  }

  private initializeObservers(): void {
    // Create ResizeObserver
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => this.updatePosition());
    });

    // Create MutationObserver
    this.mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(() => this.updatePosition());
    });

    // Observe both target element and tooltip
    const targetElement = document.querySelector(this.target());
    if (targetElement) {
      this.resizeObserver.observe(targetElement);
      this.mutationObserver.observe(targetElement, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }
    this.resizeObserver.observe(this.elementRef.nativeElement);
  }

  private initializeEventListeners(): void {
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    window.addEventListener('resize', this.scrollHandler, { passive: true });
  }

  private cleanupObservers(): void {
    this.resizeObserver?.disconnect();
    this.mutationObserver?.disconnect();
  }

  private cleanupEventListeners(): void {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.scrollHandler);
  }

  private updatePosition(): void {
    const targetElement = document.querySelector(this.target());
    const tooltipElement =
      this.elementRef.nativeElement.querySelector('.tooltip');

    if (!targetElement || !tooltipElement) return;

    const targetRect = targetElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate available space
    const spaceAbove = targetRect.top;
    const spaceBelow = viewportHeight - targetRect.bottom;

    // Determine vertical position and placement
    let top: number;
    if (spaceBelow >= tooltipRect.height + 10) {
      top = targetRect.bottom + 10;
      this.placement.set('bottom');
    } else if (spaceAbove >= tooltipRect.height + 10) {
      top = targetRect.top - tooltipRect.height - 10;
      this.placement.set('top');
    } else {
      top = Math.max(10, (viewportHeight - tooltipRect.height) / 2);
      this.placement.set('bottom');
    }

    // Calculate horizontal position
    let left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;

    // Adjust for viewport boundaries
    left = Math.max(10, Math.min(left, viewportWidth - tooltipRect.width - 10));

    // Update position signal
    this.position.set({ top, left });
  }
}
