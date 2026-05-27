/* ── Andrew P Jacobs Transport ── */

(function () {
  // Header scroll effect
  const header = document.getElementById('header');
  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        header.classList.toggle('scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile nav toggle
  const toggle = document.getElementById('mobileToggle');
  const nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close mobile nav on link click
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Scroll reveal
  var faders = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    faders.forEach(function (el) { observer.observe(el); });
  } else {
    faders.forEach(function (el) { el.classList.add('visible'); });
  }

  // Quote form — mailto fallback
  var form = document.getElementById('quoteForm');
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var company = document.getElementById('company').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;
    var freightType = document.getElementById('freightType').value;
    var details = document.getElementById('details').value;

    var subject = encodeURIComponent('Quote Request from ' + name + (company ? ' (' + company + ')' : ''));
    var body = encodeURIComponent(
      'Name: ' + name +
      '\nCompany: ' + (company || 'N/A') +
      '\nEmail: ' + email +
      '\nPhone: ' + (phone || 'N/A') +
      '\n\nOrigin: ' + (origin || 'N/A') +
      '\nDestination: ' + (destination || 'N/A') +
      '\nFreight Type: ' + (freightType || 'N/A') +
      '\n\nDetails:\n' + (details || 'N/A')
    );

    // Replace with real email when ready
    var recipient = 'quotes@apjtransport.com';
    window.location.href = 'mailto:' + recipient + '?subject=' + subject + '&body=' + body;
  });
})();
