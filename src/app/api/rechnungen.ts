import { ApiRechnung } from './api-rechnung';

export const rechnungen: Map<string, ApiRechnung> = new Map([
  [
    '1',
    {
      id: '1',
      nummer: 'P-20200101-1',
      kunde: {
        name: 'Adidas',
      },
      leistungen: [
        {
          bezeichnung: 'Frontend-Entwicklung',
          menge: 158.25,
          stundensatz: {
            name: 'Remote',
            betrag: 100,
          },
        },
        {
          bezeichnung: 'Backend-Entwicklung',
          menge: 83.5,
          stundensatz: {
            name: 'Remote',
            betrag: 100,
          },
        },
      ],
      erstelltAm: '2020-01-01',
      zahlungsbedingungen: {
        zahlungsziel: 15,
        waehrung: 'EUR',
      },
    },
  ],
  [
    '2',
    {
      id: '2',
      nummer: 'P-20200202-01',
      kunde: {
        name: 'Puma',
      },
      leistungen: [
        {
          bezeichnung: 'UX-Design',
          menge: 160,
          stundensatz: {
            name: 'Remote',
            betrag: 100,
          },
        },
      ],
      erstelltAm: '2020-02-02',
      zahlungsbedingungen: {
        zahlungsziel: 30,
        waehrung: 'USD',
      },
    },
  ],
]);
