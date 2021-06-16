import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fade', [
    state('void', style({ display: 'none', opacity: 0 })),

    transition('void <=> *', [
        animate(250)
    ])
]);
