if (window.location.protocol != 'https:' &&
  document.location.hostname != 'localhost') {
  window.location.href = 'https:' +
    window.location.href.substring(window.location.protocol.length);
}
