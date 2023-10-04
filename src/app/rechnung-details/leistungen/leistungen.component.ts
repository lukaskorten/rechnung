import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiLeistung, ApiRechnung } from '../../api/api-rechnung';
import { leistungspreis } from '../../utils/rechnung.utils';

@Component({
  selector: 'app-leistungen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leistungen.component.html',
  styleUrls: ['./leistungen.component.sass'],
})
export class LeistungenComponent {
  @Input({ required: true }) rechnung!: ApiRechnung;
  protected readonly leistungspreis = leistungspreis;
}
