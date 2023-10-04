import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RechnungDetailsComponent } from './rechnung-details/rechnung-details.component';
import { RechnungenComponent } from './rechnungen/rechnungen.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'rechnungen' },
  { path: 'rechnungen', component: RechnungenComponent },
  { path: 'rechnungen/:id', component: RechnungDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
