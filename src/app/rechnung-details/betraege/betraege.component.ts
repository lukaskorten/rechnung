import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ApiRechnung } from '../../api';
import {
  brutto,
  netto,
  preisnachlass,
  skonto,
  umsatzsteuer,
  UMSATZSTEUERSATZ,
} from '../../utils';

@Component({
  selector: 'app-betraege',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './betraege.component.html',
  styleUrls: ['./betraege.component.sass'],
})
export class BetraegeComponent implements OnInit {
  @Input({ required: true }) rechnung!: ApiRechnung;
  readonly umsatzsteuersatz = UMSATZSTEUERSATZ;

  netto!: number;
  preisnachlass!: number;
  umsatzsteuer!: number;
  brutto!: number;
  skonto!: number;

  ngOnInit() {
    this.netto = netto(this.rechnung.leistungen);
    this.preisnachlass = preisnachlass(this.rechnung);
    this.umsatzsteuer = umsatzsteuer(this.netto);
    this.brutto = brutto(this.rechnung);
    this.skonto = skonto(this.rechnung.zahlungsbedingungen);
  }
}
