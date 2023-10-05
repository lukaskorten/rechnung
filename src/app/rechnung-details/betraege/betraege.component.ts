import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Rechnung } from '../../models/rechnung';

@Component({
  selector: 'app-betraege',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './betraege.component.html',
  styleUrls: ['./betraege.component.sass'],
})
export class BetraegeComponent {
  @Input({ required: true }) rechnung!: Rechnung;
}
