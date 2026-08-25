import { describe, expect, it } from 'vitest';
import { GET } from './route';

describe('GET /llms.txt', () => {
  it('serves plain text and lists the developer resources page', async () => {
    const response = GET();
    expect(response.headers.get('Content-Type')).toContain('text/plain');

    const body = await response.text();
    expect(body).toContain('https://biltypro.com/developers');
    expect(body).toContain('Developer resources');
  });
});
