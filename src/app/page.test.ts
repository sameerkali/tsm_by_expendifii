import { describe, expect, it } from 'vitest';
import { jsonLd } from './page';

type JsonLdNode = Record<string, unknown> & { '@type': string };

function findNode(type: string): JsonLdNode {
  const node = (jsonLd['@graph'] as JsonLdNode[]).find((n) => n['@type'] === type);
  if (!node) throw new Error(`No @graph node of type "${type}" found`);
  return node;
}

describe('homepage Organization JSON-LD', () => {
  it('includes a complete PostalAddress', () => {
    const org = findNode('Organization');
    const address = org.address as Record<string, unknown>;

    expect(address).toBeDefined();
    expect(address['@type']).toBe('PostalAddress');
    expect(address.streetAddress).toBeTruthy();
    expect(address.addressLocality).toBeTruthy();
    expect(address.postalCode).toBe('110037');
    expect(address.addressCountry).toBe('IN');
  });

  it('keeps a contactPoint with email and contactType', () => {
    const org = findNode('Organization');
    const contactPoint = org.contactPoint as Record<string, unknown>;

    expect(contactPoint['@type']).toBe('ContactPoint');
    expect(contactPoint.contactType).toBeTruthy();
    expect(contactPoint.email).toBeTruthy();
  });
});
