import { describe, test, expect } from 'vitest';
import { formatDate, formatDateOnly, formatDateWithYear } from './format';

describe('Format Utility Functions', () => {
  const dateIso = '2026-06-02T15:30:00.000Z';

  test('formatDate should return date with hour and minute', () => {
    const formatted = formatDate(dateIso);
    expect(formatted).toContain('Jun 2, 2026');
    // On ne teste pas l'heure exacte en chaîne brute à cause du décalage de timezone dans la machine de test CI.
    // Mais on peut vérifier que des chiffres décrivant l'heure sont présents.
    expect(formatted).toMatch(/\d{2}:\d{2}/);
  });

  test('formatDateOnly should format without full detail but with date parts', () => {
    const formatted = formatDateOnly(dateIso);
    expect(formatted).toContain('Jun 2, 2026');
  });

  test('formatDateWithYear should return clean calendar date', () => {
    const formatted = formatDateWithYear(dateIso);
    expect(formatted).toBe('Jun 2, 2026');
  });
});
