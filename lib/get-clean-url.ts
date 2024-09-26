export function getCleanUrl(url: string) {
  const parsedUrl = new URL(url);

  let domain = parsedUrl.hostname;

  if (domain.startsWith("www.")) {
    domain = domain.substring(4);
  }

  return domain;
}
