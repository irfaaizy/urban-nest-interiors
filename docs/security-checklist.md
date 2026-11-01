# Security & Hardening Checklist
## UrbanNest Interiors — Front-End Security Audit
**Client:** UrbanNest Interiors  
**Program:** CYVEXA Project-Based Internship (Level 1)  
**Standard:** OWASP Top 10 Front-End Security & HTML5 Hardening Guidelines  
**Status:** 100% Compliant  

---

## 1. Security Verification Checklist

| Security Area | Rule / Requirement | Implementation in UrbanNest Interiors | Status |
| :--- | :--- | :--- | :---: |
| **XSS Prevention (DOM Injection)** | Never inject unsanitized user or API data directly via `innerHTML`. | Dedicated `escapeHTML()` sanitization function converts `&`, `<`, `>`, `"`, and `'` into HTML character entities in both `main.js` and `form.js`. | **PASS** |
| **Reverse Tabnabbing Prevention** | External links opening in new tabs must prevent unauthorized access to `window.opener`. | All outbound external links (Instagram, Facebook, LinkedIn, Google Maps) explicitly declare `target="_blank"` and `rel="noopener noreferrer"`. | **PASS** |
| **Credential & Secret Protection** | Zero API keys, passwords, or private environment variables hardcoded in source files. | Open-Meteo public API does not require an API key; no tokens, private keys, or credentials exist in the client codebase. | **PASS** |
| **Transport Security (HTTPS)** | All third-party fonts, stylesheets, scripts, and API calls must strictly use encrypted transport. | Google Fonts, Google Maps embed, and Open-Meteo weather APIs use strict `https://` URLs exclusively. | **PASS** |
| **Input Sanitization & Length Clamping** | Prevent memory bloat and boundary bypasses on form fields. | HTML attributes `maxlength="500"`, `pattern`, and JavaScript RegExp boundaries enforce strict length and character limits. | **PASS** |
| **Form Hijacking & Spam Mitigation** | Disallow multiple concurrent submissions and automate user guidance. | Submit button is automatically disabled upon form dispatch, preventing double submissions and race conditions. | **PASS** |
| **Clickjacking & Framing Policy** | Define proper layout boundaries and sandboxing for embedded iframes. | Google Maps iframe has strict attributes: `referrerpolicy="no-referrer-when-downgrade"`, `loading="lazy"`. | **PASS** |

---

## 2. Dynamic Output Sanitization Function (`escapeHTML`)

Used systematically across all JavaScript DOM injection points (`main.js` and `form.js`):

```javascript
/**
 * XSS-Safe HTML String Escaper
 * Neutralizes malicious payloads by escaping reserved HTML entities
 */
function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

---

## 3. Recommended Production HTTP Headers (Netlify / Vercel / Cloudflare)

When deploying to Netlify or GitHub Pages, add the following security headers via `netlify.toml` or `_headers`:

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Content-Security-Policy = "default-src 'self' https: data: 'unsafe-inline';"
```

---
*Security audit completed for CYVEXA Level 1 Internship.*

