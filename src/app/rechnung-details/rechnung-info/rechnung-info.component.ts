import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ApiRechnung } from '../../api';
import { skonto, zahlungsfristAm } from '../../utils';

@Component({
  selector: 'app-rechnung-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rechnung-info.component.html',
  styleUrls: ['./rechnung-info.component.sass'],
})
export class RechnungInfoComponent implements OnInit {
  @Input({ required: true }) rechnung!: ApiRechnung;

  skonto!: number;
  zahlungsfristAm!: Date;

  ngOnInit() {
    this.skonto = skonto(this.rechnung.zahlungsbedingungen);
    this.zahlungsfristAm = zahlungsfristAm(this.rechnung);
  }
}
