/**
 * Temporary, disposable and forwarding-alias email providers we don't accept.
 * A trial key sent to one of these is gone in minutes, and it is the easiest
 * way to farm trial keys.
 *
 * Subdomains are blocked too, so `x@mail.yopmail.com` is caught.
 */
const DISPOSABLE_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  'yopmail.com',
  'temp-mail.org',
  '10minutemail.com',
  'guerrillamail.com',
  'emailondeck.com',
  'tempail.com',
  'mailinator.com',
  'disposablemail.com',
  'emailfake.com',
  'getnada.com',
  'dropmail.me',
  'inboxes.com',
  'maildrop.cc',
  'mail.tm',
  'mailnesia.com',
  'mohmal.com',
  'generator.email',
  'tempmailo.com',
  'tmailor.com',
  'tempemail.cc',
  'minuteinbox.com',
  'internxt.com',
  'simplelogin.com',
  'addy.io',

  // Other domains the same services hand out.
  'yopmail.fr',
  'yopmail.net',
  'guerrillamail.net',
  'guerrillamail.org',
  'guerrillamail.biz',
  'guerrillamail.de',
  'guerrillamailblock.com',
  'sharklasers.com',
  'grr.la',
  'pokemail.net',
  'spam4.me',
  'simplelogin.co',
  'slmail.me',
  'aleeas.com',
  'anonaddy.com',
  'anonaddy.me',
]);

/** True when the address belongs to a blocked temporary-email provider. */
export function isDisposableEmail(email: string): boolean {
  const at = email.lastIndexOf('@');
  if (at === -1) return false;
  const domain = email.slice(at + 1).trim().toLowerCase().replace(/\.$/, '');
  if (!domain) return false;

  // Check the domain and every parent domain: a.b.yopmail.com -> b.yopmail.com -> yopmail.com
  const labels = domain.split('.');
  for (let i = 0; i < labels.length - 1; i++) {
    if (DISPOSABLE_EMAIL_DOMAINS.has(labels.slice(i).join('.'))) return true;
  }
  return false;
}
