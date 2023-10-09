import { ApiRechnung } from './api-rechnung';

export const rechnungen: Map<string, ApiRechnung> = new Map([
  [
    '1',
    {
      id: '1',
      nummer: 'P-20200101-1',
      kunde: {
        name: 'Musterkunde GmbH',
        nummer: 'K-001',
      },
      leistungen: [
        {
          bezeichnung: 'Einarbeitung',
          menge: 45,
          stundensatz: {
            name: 'Vor Ort',
            betrag: 75,
          },
        },
        {
          bezeichnung: 'Frontend-Entwicklung',
          menge: 85,
          stundensatz: {
            name: 'Remote',
            betrag: 95,
          },
        },
        {
          bezeichnung: 'Backend-Entwicklung',
          menge: 45,
          stundensatz: {
            name: 'Remote',
            betrag: 95,
          },
        },
      ],
      erstelltAm: '2023-10-01',
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
        nummer: 'K-002',
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
