import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CalendaryCardComponent } from '../calendary-card/calendary-card.component';

@Component({
  selector: 'app-activity-panel',
  imports: [MatButtonModule, MatIconModule, CalendaryCardComponent],
  templateUrl: './activity-panel.component.html',
  styleUrl: './activity-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityPanelComponent { }
