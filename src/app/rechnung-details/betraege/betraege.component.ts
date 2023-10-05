import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ApiRechnung } from 'src/app/api/api-rechnung';
import {
  brutto,
  preis,
  preisnachlass,
  skonto,
  umsatzsteuer,
} from '../../utils/rechnung.utils';

@Component({
  selector: 'app-betraege',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './betraege.component.html',
  styleUrls: ['./betraege.component.sass'],
})
export class BetraegeComponent implements OnInit {
  @Input({ required: true }) rechnung!: ApiRechnung;

  readonly umsatzsteuersatz = 19;

  netto!: number;
  preisnachlass!: number;
  umsatzsteuer!: number;
  brutto!: number;
  skonto!: number;

  ngOnInit() {
    this.netto = preis(this.rechnung.leistungen);
    this.preisnachlass = preisnachlass(this.rechnung);
    this.umsatzsteuer = umsatzsteuer(this.netto, this.umsatzsteuersatz);
    this.brutto = brutto(this.rechnung, this.umsatzsteuersatz);
    this.skonto = skonto(this.rechnung.zahlungsbedingungen);
  }
}
