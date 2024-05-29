export function getCookie(cname: string) {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function getDomainName() {
  if ('location' in globalThis) {
    const { hostname } = globalThis.location;
    const arr = hostname.split('.');
    return `${arr[arr.length - 2]}.${arr[arr.length - 1]}`;
  }
  return '';
}
