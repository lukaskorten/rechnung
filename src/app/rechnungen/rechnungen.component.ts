import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RechnungCardComponent } from './rechnung-card/rechnung-card.component';
import { RechnungService } from '../services/rechnung.service';

@Component({
  selector: 'app-rechnungen',
  standalone: true,
  imports: [CommonModule, RechnungCardComponent],
  templateUrl: './rechnungen.component.html',
  styleUrls: ['./rechnungen.component.sass'],
})
export class RechnungenComponent {
  constructor(readonly rechnungService: RechnungService) {}
}
