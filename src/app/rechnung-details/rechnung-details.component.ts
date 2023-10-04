import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ApiRechnung } from '../api/api-rechnung';
import { RechnungService } from '../services/rechnung.service';
import { preisnachlass } from '../utils/rechnung.utils';
import { BetraegeComponent } from './betraege/betraege.component';
import { LeistungenComponent } from './leistungen/leistungen.component';
import { RechnungInfoComponent } from './rechnung-info/rechnung-info.component';

@Component({
  selector: 'app-rechnung-details',
  standalone: true,
  imports: [
    CommonModule,
    LeistungenComponent,
    RechnungInfoComponent,
    BetraegeComponent,
  ],
  templateUrl: './rechnung-details.component.html',
  styleUrls: ['./rechnung-details.component.sass'],
})
export class RechnungDetailsComponent implements OnInit {
  @Input() id!: string;
  rechnung?: ApiRechnung;

  constructor(readonly rechnungService: RechnungService) {}

  ngOnInit() {
    this.rechnungService.getRechnung(this.id).subscribe((rechnung) => {
      this.rechnung = rechnung;
    });
  }
}
