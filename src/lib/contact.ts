import { ADDRESS, CONTACT } from '@/config/site';

const digits = (v: string) => v.replace(/\D/g, '');

/** Phone in display form, or null while the config value is empty or incomplete. */
export function phoneNumber(): string | null {
  return digits(CONTACT.phone).length >= 10 ? CONTACT.phone : null;
}

/** tel: link, or null. */
export function phoneHref(): string | null {
  const p = phoneNumber();
  return p ? `tel:+${digits(p).replace(/^0+/, '')}` : null;
}

/** wa.me link, or null while the number is empty or incomplete (needs country code + 10 digits). */
export function whatsappHref(): string | null {
  const d = digits(CONTACT.whatsapp);
  return d.length >= 12 ? `https://wa.me/${d}` : null;
}

export function addressLines(): string[] {
  return [ADDRESS.streetAddress, `${ADDRESS.addressLocality}, ${ADDRESS.regionName} ${ADDRESS.postalCode}`, ADDRESS.countryName];
}
