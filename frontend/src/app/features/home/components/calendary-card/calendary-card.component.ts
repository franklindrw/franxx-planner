import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'calendary-card',
  imports: [],
  templateUrl: './calendary-card.component.html',
  styleUrl: './calendary-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendaryCardComponent {
  @Input() title: string = '';
  @Input() hour: string = '';
}
