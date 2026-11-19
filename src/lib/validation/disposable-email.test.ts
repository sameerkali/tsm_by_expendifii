import { describe, expect, it } from 'vitest';
import { isDisposableEmail } from './disposable-email';

describe('isDisposableEmail', () => {
  it.each([
    'someone@yopmail.com',
    'someone@mailinator.com',
    'someone@mail.tm',
    'someone@addy.io',
    'someone@generator.email',
  ])('blocks %s', (email) => {
    expect(isDisposableEmail(email)).toBe(true);
  });

  it('ignores case and stray whitespace', () => {
    expect(isDisposableEmail('Someone@YOPMAIL.com ')).toBe(true);
  });

  it('blocks subdomains of a blocked provider', () => {
    expect(isDisposableEmail('someone@inbox.yopmail.com')).toBe(true);
  });

  it.each([
    'someone@gmail.com',
    'someone@company.co.in',
    'someone@outlook.com',
    // Only the exact provider or its subdomains, not look-alikes.
    'someone@notyopmail.com',
    'someone@mail.tm.example.com',
  ])('allows %s', (email) => {
    expect(isDisposableEmail(email)).toBe(false);
  });

  it('returns false for input without a domain', () => {
    expect(isDisposableEmail('someone')).toBe(false);
    expect(isDisposableEmail('someone@')).toBe(false);
  });
});
