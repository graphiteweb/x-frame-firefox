// This content script will execute on all websites.

// Function to remove X-Frame headers
function removeXFrameHeaders() {
  // Remove X-Frame-Options header
  document.addEventListener('headersReceived', function (e) {
    e.responseHeaders = e.responseHeaders.filter(header => {
      return !header.name.toLowerCase().includes('x-frame-options');
    });
    return { responseHeaders: e.responseHeaders };
  }, { urls: ["<all_urls>"], types: ["main_frame"] });

  // Remove Content-Security-Policy frame-ancestors
  const metaTags = document.querySelectorAll('meta[http-equiv="Content-Security-Policy"]');
  metaTags.forEach(metaTag => {
    metaTag.content = metaTag.content.replace(/frame-ancestors [^;]+;/g, '');
  });
}

// Execute the function when the page loads
removeXFrameHeaders();
