const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.innerHTML = isOpen ? 'Fermer <span>×</span>' : 'Menu <span>+</span>';
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => navigation.classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelector('footer .footer-logo')?.remove();
document.querySelector('footer > p')?.remove();
const legalPages = {
  'Mentions légales': 'mentions-legales.html',
  'Politique de confidentialité': 'politique-confidentialite.html',
  'Conditions générales de prestation': 'conditions-generales-prestation.html'
};
document.querySelectorAll('.footer-links a').forEach(link => { link.href = legalPages[link.textContent.trim()] || '#'; });

const contactForm = document.getElementById('contact-form');
// Le prestataire reçoit le formulaire et l'envoie à l'adresse Outlook, sans ouvrir la messagerie du visiteur.
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

// À compléter avec les URLs de paiement sécurisé Indy avant publication.
const indyLinks = {deposit: '#', invoice: '#', secure: '#'};
// Un seul lien suffit : l'acompte et la facture se règlent via le même espace Indy.
document.querySelectorAll('[data-payment]').forEach(link => {
  if (link.dataset.payment !== 'secure') link.remove();
});
const securePaymentLink = document.querySelector('[data-payment="secure"]');
securePaymentLink?.querySelector('span')?.remove();
if (securePaymentLink) securePaymentLink.style.gridTemplateColumns = '1fr auto';
document.querySelector('.pay-links small').textContent = 'Le lien Indy est à renseigner avant publication.';
document.querySelectorAll('[data-payment]').forEach(link => {
  const url = indyLinks[link.dataset.payment];
  if (url !== '#') link.href = url;
  else link.addEventListener('click', event => { event.preventDefault(); alert('Lien de paiement Indy à configurer avant publication.'); });
});
