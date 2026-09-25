const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];

const menuBtn = $('.menu-btn');
const nav = $('.nav-links');
menuBtn?.addEventListener('click', () => nav.classList.toggle('open'));
$$('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('visible');
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const sections = $$('main section[id]');
const links = $$('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, {rootMargin:'-35% 0px -55% 0px'});
sections.forEach(s => sectionObserver.observe(s));

const glow = $('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

$('#year').textContent = new Date().getFullYear();

$('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#name').value.trim();
  const email = $('#email').value.trim();
  const message = $('#message').value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:pavanraikar279@gmail.com?subject=${subject}&body=${body}`;
});

const terminalOutput = $('#terminalOutput');
const terminalForm = $('#terminalForm');
const terminalInput = $('#terminalInput');

const commands = {
  help: `<span class="accent">Available commands:</span><br>about &nbsp; skills &nbsp; projects &nbsp; certs &nbsp; contact &nbsp; clear`,
  about: `Pavan Sandeep Raikar — B.Tech Cyber Security undergraduate at Parul University.<br>Focus: networking, threat intelligence, Linux and practical security projects.`,
  skills: `Python • Networking • Wireshark • Linux • JavaScript • HTML/CSS • Cryptography • MS Office`,
  projects: `01 Realtime Malicious IP Intelligence System<br>02 Live Packet & IP Monitoring<br>03 Threat Intelligence Dashboard`,
  certs: `Python (IBM Developer Skills Network) • HTML/CSS • JavaScript • Cryptography & Network Security (NPTEL)`,
  contact: `Email: pavanraikar279@gmail.com<br>GitHub: github.com/pavan45-star<br>LinkedIn: linkedin.com/in/pavan-raikar-a07766328`,
};

terminalForm?.addEventListener('submit', e => {
  e.preventDefault();
  const cmd = terminalInput.value.trim().toLowerCase();
  if(!cmd) return;
  if(cmd === 'clear'){ terminalOutput.innerHTML = ''; terminalInput.value=''; return; }
  const result = commands[cmd] || `<span style="color:#ff3d6e">command not found:</span> ${cmd}. Type <b>help</b>.`;
  terminalOutput.insertAdjacentHTML('beforeend', `<p><span class="ok">visitor@pavan:~$</span> ${cmd}</p><p>${result}</p>`);
  terminalInput.value = '';
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
});
