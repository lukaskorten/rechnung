import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Rechnung } from '../../dtos/rechnung';

@Component({
  selector: 'app-rechnung-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './rechnung-card.component.html',
  styleUrls: ['./rechnung-card.component.sass'],
})
export class RechnungCardComponent {
  @Input({ required: true }) rechnung!: Rechnung;
}
