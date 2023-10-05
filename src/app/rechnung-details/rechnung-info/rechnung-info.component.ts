import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Rechnung } from '../../models/rechnung';

@Component({
  selector: 'app-rechnung-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rechnung-info.component.html',
  styleUrls: ['./rechnung-info.component.sass'],
})
export class RechnungInfoComponent {
  @Input({ required: true }) rechnung!: Rechnung;
}
