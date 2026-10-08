import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMatchScoreBadge]',
  standalone: true,
})
export class MatchScoreBadgeDirective implements OnInit {
  @Input('appMatchScoreBadge') score: number = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.applyBadgeStyle();
  }

  private applyBadgeStyle() {
    const nativeElement = this.el.nativeElement;

    nativeElement.innerHTML = '';

    let text = '';
    let bgColor = '';
    let borderColor = '';
    let textColor = '';

    if (this.score >= 75) {
      text = 'High Alignment';
      bgColor = 'bg-emerald-50/80';
      borderColor = 'border border-emerald-400';
      textColor = 'text-emerald-700';
    } else if (this.score >= 40) {
      text = 'Moderate Alignment';
      bgColor = 'bg-amber-50/80';
      borderColor = 'border border-amber-400';
      textColor = 'text-amber-700';
    } else {
      text = 'Low Alignment';
      bgColor = 'bg-rose-50/80';
      borderColor = 'border border-rose-400';
      textColor = 'text-rose-700';
    }

    this.renderer.setProperty(nativeElement, 'textContent', text);

    const classes = [
      'px-4',
      'py-2',
      'rounded-md',
      'font-medium',
      'text-sm',
      'inline-flex',
      'items-center',
      'justify-center',
      ...bgColor.split(' '),
      ...borderColor.split(' '),
      ...textColor.split(' '),
    ];

    classes.forEach((cls) => {
      this.renderer.addClass(nativeElement, cls);
    });
  }
}
