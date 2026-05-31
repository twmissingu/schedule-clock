/**
 * icons.js — 动态加载 icons.svg 并插入 DOM
 */
(function () {
  fetch('icons.svg')
    .then(function (res) { return res.text(); })
    .then(function (svg) {
      var container = document.createElement('div');
      container.innerHTML = svg;
      document.body.insertBefore(container.firstChild, document.body.firstChild);
    })
    .catch(function (err) {
      console.error('Failed to load icons.svg:', err);
    });
})();
