import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Rechnung } from '../../models/rechnung';

@Component({
  selector: 'app-leistungen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leistungen.component.html',
  styleUrls: ['./leistungen.component.sass'],
})
export class LeistungenComponent {
  @Input({ required: true }) rechnung!: Rechnung;
}
