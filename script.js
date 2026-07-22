const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.innerHTML = isOpen ? 'Fermer <span>×</span>' : 'Menu <span>+</span>';
});

document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => navigation.classList.remove('open')));

const contactForm = document.getElementById('contact-form');
contactForm.action = 'https://formsubmit.co/meteofinance@outlook.com';
contactForm.method = 'POST';
contactForm.insertAdjacentHTML('afterbegin', `
  <input type="hidden" name="_subject" value="Nouvelle demande — Site Météo Finance" />
  <input type="hidden" name="_template" value="table" />
  <input type="hidden" name="_captcha" value="true" />
  <input type="hidden" name="_replyto" value="" />
  <input type="text" name="_honey" value="" tabindex="-1" autocomplete="off" class="honeypot" aria-hidden="true" />
`);
document.querySelector('.contact-email')?.remove();
contactForm.addEventListener('submit', () => {
  contactForm.querySelector('[name="_replyto"]').value = contactForm.elements.email.value;
});





// Paiement Indy : modifier uniquement ces trois lignes lorsqu'une facture doit être réglée.
const paiementActif = false;
const factureActive = 'FAC-2026-001';
const lienPaiementIndy = '#';

const paymentModal = document.createElement('div');
paymentModal.className = 'payment-modal';
paymentModal.hidden = true;
paymentModal.innerHTML = `
  <div class="payment-modal__backdrop" data-payment-close></div>
  <section class="payment-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
    <button class="payment-modal__close" type="button" aria-label="Fermer" data-payment-close>×</button>
    <p class="kicker">Paiement sécurisé</p>
    <h2 id="payment-modal-title">Renseignez votre référence de facture.</h2>
    <p>Merci d’indiquer votre numéro de facture afin de procéder au paiement sécurisé.</p>
    <form class="payment-modal__form">
      <label for="payment-invoice">Numéro de facture</label>
      <input id="payment-invoice" name="invoice" type="text" autocomplete="off" placeholder="Ex. FAC-2026-001" required />
      <p class="payment-modal__status" aria-live="polite"></p>
      <button class="btn btn-gold" type="submit">Continuer vers le paiement <b>→</b></button>
    </form>
  </section>
`;
document.body.appendChild(paymentModal);

const paymentInput = paymentModal.querySelector('#payment-invoice');
const paymentStatus = paymentModal.querySelector('.payment-modal__status');

function closePaymentModal() {
  paymentModal.hidden = true;
  paymentStatus.textContent = '';
}

function openPaymentModal() {
  paymentModal.hidden = false;
  paymentInput.value = '';
  window.setTimeout(() => paymentInput.focus(), 0);
}

document.querySelectorAll('[data-payment]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    openPaymentModal();
  });
});

paymentModal.querySelectorAll('[data-payment-close]').forEach(button => {
  button.addEventListener('click', closePaymentModal);
});

paymentModal.querySelector('.payment-modal__form').addEventListener('submit', event => {
  event.preventDefault();
  const reference = paymentInput.value.trim().toUpperCase();

  if (!reference) {
    paymentStatus.textContent = 'Veuillez renseigner votre numéro de facture.';
    return;
  }

  if (!paiementActif || lienPaiementIndy === '#') {
    paymentStatus.textContent = 'Aucun règlement n’est actuellement actif pour cette référence.';
    return;
  }

  if (reference !== factureActive.toUpperCase()) {
    paymentStatus.textContent = 'Cette référence de facture n’est pas active.';
    return;
  }

  window.location.assign(lienPaiementIndy);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !paymentModal.hidden) closePaymentModal();
});
