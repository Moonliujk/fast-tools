import { generateDomains } from '../utils/utils';
import { expect, it } from 'vitest';
import { describe } from 'vitest';

describe('get a list with unique domains', () => {
  const html =
    '<img src="https://festatic.A.com" /><img src="https://festatic.B.com" />';
  const ignoreDomains = ['https://festatic.B.com'];

  const TestAResult = ['https://festatic.A.com', 'https://festatic.B.com'];
  const TestBResult = ['https://festatic.A.com'];
  it('should return an array with unique domains', () => {
    expect(generateDomains(html, [], []).toString()).toBe(
      TestAResult.toString()
    );
  });

  it('ignore certain domains and return a list with domains', () => {
    expect(generateDomains(html, [], ignoreDomains).toString()).toBe(
      TestBResult.toString()
    );
  });
});
