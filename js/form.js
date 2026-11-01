/**
 * UrbanNest Interiors — Contact Form Validation & Submission Handler
 * CYVEXA Level 1 Internship Project
 * 
 * Strict Validation Rules from Business Brief:
 *  1. Full Name: Required, min 3 characters, letters and spaces only.
 *  2. Email: Required, valid email structure.
 *  3. Phone: Required, 10-digit Indian mobile number starting with 6, 7, 8, or 9.
 *  4. Service: Required dropdown, must match one of the 6 studio services.
 *  5. Budget Range: Optional radio buttons (Under ₹1 lakh, ₹1–5 lakh, Above ₹5 lakh).
 *  6. Message: Required, 20–500 characters with live character counter.
 *  7. Consent: Required agreement checkbox.
 * 
 * UX Requirements:
 *  - No popup alert() boxes — all errors displayed inline.
 *  - Submit button disabled with loading spinner while processing.
 *  - Friendly confirmation success banner with enquiry summary.
 *  - Safe DOM injection with zero unescaped input.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('consultationForm');
  if (!form) return;

  const fullNameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const serviceSelect = document.getElementById('serviceInterested');
  const messageTextarea = document.getElementById('message');
  const consentCheckbox = document.getElementById('consent');
  const submitBtn = document.getElementById('submitBtn');
  const charCounter = document.getElementById('charCounter');
  const successBanner = document.getElementById('formSuccessBanner');

  // Track whether a field has been touched to avoid premature error flashing
  const touched = {
    fullName: false,
    email: false,
    phone: false,
    serviceInterested: false,
    message: false,
    consent: false
  };

  /* --- Validation Evaluators --- */
  function validateFullName() {
    const val = fullNameInput.value.trim();
    if (!val) {
      return { isValid: false, message: 'Please enter your full name.' };
    }
    if (val.length < 3) {
      return { isValid: false, message: 'Name must be at least 3 characters long.' };
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(val)) {
      return { isValid: false, message: 'Name can only contain alphabetic letters and spaces.' };
    }
    return { isValid: true, message: '' };
  }

  function validateEmail() {
    const val = emailInput.value.trim();
    if (!val) {
      return { isValid: false, message: 'Please enter your email address.' };
    }
    // RFC 5322 compliant regex for practical email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!emailRegex.test(val)) {
      return { isValid: false, message: 'Please enter a valid email address (e.g., name@example.com).' };
    }
    return { isValid: true, message: '' };
  }

  function validatePhone() {
    const val = phoneInput.value.trim().replace(/[\s-]/g, '');
    if (!val) {
      return { isValid: false, message: 'Please enter your 10-digit mobile number.' };
    }
    // 10-digit Indian mobile starting with 6, 7, 8, or 9
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(val)) {
      return { isValid: false, message: 'Must be a valid 10-digit Indian mobile number starting with 6–9.' };
    }
    return { isValid: true, message: '' };
  }

  function validateService() {
    const val = serviceSelect.value;
    const allowed = [
      'full-home',
      'modular-kitchen',
      'living-bedroom',
      'office-interiors',
      '3d-design',
      'renovation-makeover'
    ];
    if (!val || !allowed.includes(val)) {
      return { isValid: false, message: 'Please select an interior design service from the list.' };
    }
    return { isValid: true, message: '' };
  }

  function validateMessage() {
    const val = messageTextarea.value.trim();
    const len = messageTextarea.value.length; // character count including spaces
    if (!val) {
      return { isValid: false, message: 'Please provide a brief description of your project or room requirement.' };
    }
    if (len < 20) {
      return { isValid: false, message: `Message is too brief (${len}/20 min characters).` };
    }
    if (len > 500) {
      return { isValid: false, message: `Message exceeds the 500 character limit (${len}/500).` };
    }
    return { isValid: true, message: '' };
  }

  function validateConsent() {
    if (!consentCheckbox.checked) {
      return { isValid: false, message: 'You must agree to be contacted regarding your design enquiry.' };
    }
    return { isValid: true, message: '' };
  }

  /* --- UI Feedback Helpers --- */
  function showFieldError(inputEl, errorId, errorMsg) {
    inputEl.classList.remove('is-valid');
    inputEl.classList.add('is-invalid');
    inputEl.setAttribute('aria-invalid', 'true');

    const errSpan = document.getElementById(errorId);
    if (errSpan) {
      errSpan.textContent = errorMsg;
      errSpan.classList.add('show');
    }
  }

  function clearFieldError(inputEl, errorId) {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    inputEl.setAttribute('aria-invalid', 'false');

    const errSpan = document.getElementById(errorId);
    if (errSpan) {
      errSpan.textContent = '';
      errSpan.classList.remove('show');
    }
  }

  /* --- Live Character Counter --- */
  function updateCharCounter() {
    const currentLength = messageTextarea.value.length;
    if (charCounter) {
      charCounter.textContent = `${currentLength} / 500 characters`;
      charCounter.classList.remove('limit-near', 'limit-reached');

      if (currentLength < 20) {
        charCounter.classList.add('limit-near');
      } else if (currentLength > 480) {
        charCounter.classList.add('limit-reached');
      }
    }
  }

  messageTextarea.addEventListener('input', () => {
    updateCharCounter();
    if (touched.message) {
      const result = validateMessage();
      if (!result.isValid) {
        showFieldError(messageTextarea, 'messageError', result.message);
      } else {
        clearFieldError(messageTextarea, 'messageError');
      }
    }
  });

  /* --- Event Listeners for Real-Time Validation --- */
  fullNameInput.addEventListener('blur', () => {
    touched.fullName = true;
    const res = validateFullName();
    if (!res.isValid) showFieldError(fullNameInput, 'fullNameError', res.message);
    else clearFieldError(fullNameInput, 'fullNameError');
  });

  fullNameInput.addEventListener('input', () => {
    if (touched.fullName) {
      const res = validateFullName();
      if (!res.isValid) showFieldError(fullNameInput, 'fullNameError', res.message);
      else clearFieldError(fullNameInput, 'fullNameError');
    }
  });

  emailInput.addEventListener('blur', () => {
    touched.email = true;
    const res = validateEmail();
    if (!res.isValid) showFieldError(emailInput, 'emailError', res.message);
    else clearFieldError(emailInput, 'emailError');
  });

  emailInput.addEventListener('input', () => {
    if (touched.email) {
      const res = validateEmail();
      if (!res.isValid) showFieldError(emailInput, 'emailError', res.message);
      else clearFieldError(emailInput, 'emailError');
    }
  });

  phoneInput.addEventListener('blur', () => {
    touched.phone = true;
    const res = validatePhone();
    if (!res.isValid) showFieldError(phoneInput, 'phoneError', res.message);
    else clearFieldError(phoneInput, 'phoneError');
  });

  phoneInput.addEventListener('input', () => {
    if (touched.phone) {
      const res = validatePhone();
      if (!res.isValid) showFieldError(phoneInput, 'phoneError', res.message);
      else clearFieldError(phoneInput, 'phoneError');
    }
  });

  serviceSelect.addEventListener('change', () => {
    touched.serviceInterested = true;
    const res = validateService();
    if (!res.isValid) showFieldError(serviceSelect, 'serviceError', res.message);
    else clearFieldError(serviceSelect, 'serviceError');
  });

  consentCheckbox.addEventListener('change', () => {
    touched.consent = true;
    const res = validateConsent();
    if (!res.isValid) showFieldError(consentCheckbox, 'consentError', res.message);
    else clearFieldError(consentCheckbox, 'consentError');
  });

  /* --- Form Submission Orchestrator --- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Mark all fields touched
    Object.keys(touched).forEach((k) => (touched[k] = true));

    const valName = validateFullName();
    const valEmail = validateEmail();
    const valPhone = validatePhone();
    const valService = validateService();
    const valMsg = validateMessage();
    const valConsent = validateConsent();

    if (!valName.isValid) showFieldError(fullNameInput, 'fullNameError', valName.message);
    else clearFieldError(fullNameInput, 'fullNameError');

    if (!valEmail.isValid) showFieldError(emailInput, 'emailError', valEmail.message);
    else clearFieldError(emailInput, 'emailError');

    if (!valPhone.isValid) showFieldError(phoneInput, 'phoneError', valPhone.message);
    else clearFieldError(phoneInput, 'phoneError');

    if (!valService.isValid) showFieldError(serviceSelect, 'serviceError', valService.message);
    else clearFieldError(serviceSelect, 'serviceError');

    if (!valMsg.isValid) showFieldError(messageTextarea, 'messageError', valMsg.message);
    else clearFieldError(messageTextarea, 'messageError');

    if (!valConsent.isValid) showFieldError(consentCheckbox, 'consentError', valConsent.message);
    else clearFieldError(consentCheckbox, 'consentError');

    const isAllValid = valName.isValid && valEmail.isValid && valPhone.isValid &&
                       valService.isValid && valMsg.isValid && valConsent.isValid;

    if (!isAllValid) {
      // Focus first failing field
      const firstInvalid = form.querySelector('.is-invalid, input[type="checkbox"]:not(:checked)');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Capture values securely
    const selectedBudget = form.querySelector('input[name="budgetRange"]:checked');
    const budgetVal = selectedBudget ? selectedBudget.value : 'Not specified';
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    const clientName = fullNameInput.value.trim();

    // 1. Put form into loading state
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `
      <span class="spinner" style="width: 20px; height: 20px; border-width: 2.5px; margin: 0; display: inline-block; vertical-align: middle;" aria-hidden="true"></span>
      <span>Scheduling Consultation...</span>
    `;

    // 2. Simulate realistic asynchronous dispatch
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // 3. Reset submit button state
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    // 4. Render friendly confirmation message
    if (successBanner) {
      successBanner.innerHTML = `
        <div class="success-icon" aria-hidden="true">✓</div>
        <h3 class="success-title">Thank You, ${escapeHTML(clientName)}!</h3>
        <p class="success-desc">
          Your consultation request for <strong>${escapeHTML(serviceName)}</strong> (${escapeHTML(budgetVal)}) has been received successfully.
        </p>
        <p class="success-desc" style="margin-top: 0.5rem; font-size: 0.885rem; color: #57707d;">
          Our lead designer Ananya Iyer or project manager Rohit Menon will contact you within 24 business hours at <strong>${escapeHTML(emailInput.value.trim())}</strong> or via phone/WhatsApp at <strong>+91 ${escapeHTML(phoneInput.value.trim())}</strong>.
        </p>
      `;
      successBanner.classList.add('show');
      successBanner.setAttribute('tabindex', '-1');
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      successBanner.focus();
    }

    // 5. Reset form inputs
    form.reset();
    updateCharCounter();
    ['fullName', 'email', 'phone', 'serviceInterested', 'message'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.remove('is-valid', 'is-invalid');
        el.removeAttribute('aria-invalid');
      }
    });
    Object.keys(touched).forEach((k) => (touched[k] = false));
  }
}

function escapeHTML(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
