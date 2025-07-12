import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { CalendaryCardComponent } from '../calendary-card/calendary-card.component';
import { NewActivityModalComponent } from '@features/activitys/components/new-activity-modal/new-activity-modal.component';

@Component({
  selector: 'app-activity-panel',
  imports: [MatButtonModule, MatIconModule, CalendaryCardComponent],
  templateUrl: './activity-panel.component.html',
  styleUrl: './activity-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityPanelComponent {
  private readonly dialog = inject(MatDialog);

  openCreateActivity(): void {
    this.dialog.open(NewActivityModalComponent, {
      width: '90%',
      maxWidth: '43ww0px',
      minHeight: '400px',
      disableClose: true,
    });
  }
}
