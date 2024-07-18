// return domain array
export function generateDomains(
  html: string,
  customDomains: string[],
  ignoreDomains: string[]
): string[] {
  let result = getDomains(html);
  // normalize user inputs
  result = result.concat(getDomains(customDomains.join(' ')));
  ignoreDomains = getDomains(ignoreDomains.join(' '));
  customDomains = [];
  result.forEach((item: string) => {
    if (!ignoreDomains.includes(item)) {
      customDomains.push(item);
    }
  });
  return Array.from(new Set(customDomains));
}

// extract domain from a string
export function getDomains(str: string): string[] {
  const httpReg = /http(s)?:\/\/((\w|=|\.|-)+)/g;
  const result = str.match(httpReg) || [];
  return result;
}
