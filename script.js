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

const indyLinks = { secure: '#' };
document.querySelectorAll('[data-payment]').forEach(link => {
  const url = indyLinks[link.dataset.payment];
  if (url !== '#') link.href = url;
  else link.addEventListener('click', event => { event.preventDefault(); alert('Vous n\'avez aucun règlement en attente.'); });
});
