/* Fills in and reveals the parts of the site that depend on site-config.js. */
(function () {
  'use strict';
  var C = window.VC_SITE || {};
  var MAIN = '(513) 780-5880';

  function digits(p) { return String(p || '').replace(/\D/g, '').replace(/^1(?=\d{10}$)/, ''); }
  function tel(p) { var d = digits(p); return d.length === 10 ? 'tel:+1' + d : ''; }
  function all(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  // Text and links: data-vc-text="key", data-vc-tel="key", data-vc-mail="key", data-vc-href="key"
  function fill(key, value) {
    all('[data-vc-text="' + key + '"]').forEach(function (el) { el.textContent = value; });
    all('[data-vc-tel="' + key + '"]').forEach(function (el) { var h = tel(value); if (h) el.href = h; });
    all('[data-vc-mail="' + key + '"]').forEach(function (el) { el.href = 'mailto:' + value; });
    all('[data-vc-href="' + key + '"]').forEach(function (el) { el.href = value; });
  }

  // Blocks: data-vc-show="key" appears when the value is set; data-vc-hide="key" disappears when it is.
  function toggle(key, on) {
    all('[data-vc-show="' + key + '"]').forEach(function (el) { el.hidden = !on; });
    all('[data-vc-hide="' + key + '"]').forEach(function (el) { el.hidden = !!on; });
  }

  function apply() {
    var keys = ['afterHoursPhone', 'repName', 'repTitle', 'repPhone', 'repEmail', 'payOnlineUrl', 'googleProfileUrl'];
    keys.forEach(function (k) {
      var v = String(C[k] || '').trim();
      if (v) fill(k, v);
      toggle(k, !!v);
    });
    var billing = String(C.billingPhone || '').trim() || MAIN;
    fill('billingPhone', billing);
    toggle('rep', !!(String(C.repPhone || '').trim() || String(C.repEmail || '').trim()));
    toggle('serveNorthernKentucky', C.serveNorthernKentucky === true);
  }

  // Visit counts (GoatCounter: no cookies, no personal data).
  function analytics() {
    var code = String(C.goatcounterCode || '').trim().replace(/[^a-z0-9-]/gi, '');
    if (!code) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://gc.zgo.at/count.js';
    s.setAttribute('data-goatcounter', 'https://' + code + '.goatcounter.com/count');
    document.head.appendChild(s);
    // Count referral PDF downloads by form type. Nothing about the patient is sent.
    document.addEventListener('click', function (e) {
      var go = e.target.closest && e.target.closest('#go');
      var form = e.target.closest && e.target.closest('a[data-blank-form]');
      var name = '';
      if (go) {
        var sel = document.querySelector('#vcr .tcard.sel b');
        name = 'online-referral: ' + (sel ? sel.textContent : 'unknown');
      } else if (form) {
        name = 'blank-form: ' + form.getAttribute('data-blank-form');
      }
      if (name && window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: name, title: name, event: true });
      }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
  analytics();
})();
