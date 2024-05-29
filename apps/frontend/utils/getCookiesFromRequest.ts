const getCookiesFromRequest = (request) => {
    const cookies = {};
    if(request?.headers && request?.headers?.get('set-cookie')) {
      const setCookies = request.headers?.get('set-cookie')
      setCookies.split(';').forEach((cookie) => {
        const parts = cookie?.split('=');
        if(parts?.length) {
          cookies[ parts[0].trim() ] = (parts[1] || '').trim();
        }
      });
    } else if(request?.headers && request?.headers?.cookie) {
      request.headers.cookie.split(';').forEach((cookie) => {
        const parts = cookie.match(/(.*?)=(.*)$/)
        cookies[ parts[1].trim() ] = (parts[2] || '').trim();
      });  
    }
    return cookies;
};

export default  getCookiesFromRequest