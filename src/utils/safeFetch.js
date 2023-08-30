// If native fetch is not supported
if (!('fetch' in window)) {
    window.fetch = function(url, options) {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(options.method || 'GET', url);
        xhr.onload = function() {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(new Response(xhr.responseText, { status: xhr.status }));
          } else {
            reject(new Error(xhr.statusText));
          }
        };
        xhr.onerror = function() {
          reject(new Error('Network error'));
        };
        xhr.send(options.body);
      });
    };
  }