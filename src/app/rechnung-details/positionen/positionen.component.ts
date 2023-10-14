import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiRechnung } from '../../api';
import { preisProEinheit } from '../../utils';

@Component({
  selector: 'app-positionen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './positionen.component.html',
  styleUrls: ['./positionen.component.sass'],
})
export class PositionenComponent {
  @Input({ required: true }) rechnung!: ApiRechnung;
  protected readonly preisProEinheit = preisProEinheit;
}
