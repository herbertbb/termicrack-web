
/*  Consumo = 2 kg × (D / 40)² × L
    Se calcula el número mínimo de cajas de 20 kg y bolsas de 5 kg
    Precios: S/. 160/bolsa, S/. 550/caja
*/
function calcular () {
  const L = parseFloat(document.getElementById('length').value);
  const D = parseFloat(document.getElementById('diameter').value);
  if (isNaN(L) || isNaN(D) || L <= 0 || D < 32 || D > 51) return;

  const kg = 2 * Math.pow(D / 40, 2) * L;

  let cajasA  = Math.floor(kg / 20);
  let remA    = kg - cajasA * 20;
  let bolsasA = remA > 0 ? Math.ceil(remA / 5) : 0;
  if (bolsasA === 4) { cajasA += 1; bolsasA = 0; }

  const costoA = cajasA * 550 + bolsasA * 160;

  // Option B: all cajas (only if bolsasA >= 2)
  let cajasB = 0, bolsasB = 0, costoB = 0, showB = false;
  if (bolsasA >= 2) {
    cajasB = cajasA + 1;
    bolsasB = 0;
    costoB  = cajasB * 550;
    showB   = true;
  }

  // Consumo total
  document.getElementById('kg_out').textContent = kg.toFixed(2) + ' kg';

  // Render Option A
  document.getElementById('combo-a').innerHTML = buildChips(cajasA, bolsasA);
  document.getElementById('cost-a').textContent = 'S/. ' + costoA.toLocaleString('es-PE');

  // Render Option B
  if (showB) {
    const diff = costoB - costoA;
    document.getElementById('quote-b').style.display = '';
    document.getElementById('combo-b').innerHTML = buildChips(cajasB, bolsasB);
    document.getElementById('cost-b').textContent = 'S/. ' + costoB.toLocaleString('es-PE');
    document.getElementById('note-b').textContent = 'Menos unidades que cargar · +S/. ' + diff;
  } else {
    document.getElementById('quote-b').style.display = 'none';
  }

  // State
  window._calc = { kg, a: { cajas: cajasA, bolsas: bolsasA }, b: showB ? { cajas: cajasB, bolsas: bolsasB } : null };

  // Ocultos (calc-form) — Option A by default
  updateHidden(cajasA, bolsasA, kg);

  document.getElementById('calc-results').style.display = 'block';

  // Select A by default
  requestAnimationFrame(() => seleccionarOpcion('A'));
}

function buildChips (cajas, bolsas) {
  const parts = [];
  if (cajas > 0)  parts.push('<span class="result-chip"><span class="chip-icon">📦</span>' + cajas + ' caja' + (cajas > 1 ? 's' : '') + '</span>');
  if (bolsas > 0) parts.push('<span class="result-chip"><span class="chip-icon">🧱</span>' + bolsas + ' bolsa' + (bolsas > 1 ? 's' : '') + '</span>');
  if (parts.length === 2) return parts.join('<span class="result-plus">+</span>');
  return parts[0] || '<span class="result-chip chip-none">—</span>';
}

function updateHidden (cajas, bolsas, kg) {
  document.getElementById('kg_hidden').value    = kg.toFixed(2);
  document.getElementById('boxes_hidden').value = cajas;
  document.getElementById('bags_hidden').value  = bolsas;
}

function seleccionarOpcion (opt) {
  const c = window._calc;
  if (!c) return;
  const data = opt === 'A' ? c.a : (c.b || c.a);

  document.querySelectorAll('input[name="opcion"]').forEach(r => r.checked = r.value === opt);

  document.querySelectorAll('.quote-card').forEach(card => {
    card.classList.remove('selected');
    const svg = card.querySelector('.card-crack');
    if (svg) {
      svg.style.opacity = '0';
      svg.querySelectorAll('path').forEach(p => {
        p.style.strokeDashoffset = '400';
        p.style.animation = 'none';
      });
    }
  });

  const target = document.getElementById('quote-' + opt.toLowerCase());
  target.classList.add('selected');

  const targetSvg = target.querySelector('.card-crack');
  if (targetSvg) {
    requestAnimationFrame(() => {
      targetSvg.style.opacity = '1';
      targetSvg.querySelectorAll('path').forEach(p => {
        p.style.animation = '';
      });
    });
  }

  updateHidden(data.cajas, data.bolsas, c.kg);
  actualizarWhatsApp(data.cajas, data.bolsas, c.kg);
}

function actualizarWhatsApp (cajas, bolsas, kg) {
  if (kg == null) kg = 0;
  let msg = 'Hola, me interesa TermiCrack';
  if (kg > 0) {
    msg += ' (consumo estimado: ' + kg.toFixed(2) + ' kg)';
    if (cajas > 0 || bolsas > 0) {
      msg += '. Necesito ';
      if (cajas > 0)  msg += cajas  + ' caja(s)';
      if (bolsas > 0) msg += (cajas ? ' y ' : '') + bolsas + ' bolsa(s)';
    }
    msg += '. ¿Tienen disponibilidad para envío?';
    document.getElementById('wa-label').textContent = 'Pedir cotización por WhatsApp';
  }
  msg += '.';
  const url = 'https://wa.me/51930646411?text=' + encodeURIComponent(msg);
  document.getElementById('whatsapp-link').href = url;
}

// Valores por defecto para el link placeholder
document.addEventListener('DOMContentLoaded', function () {
  actualizarWhatsApp(0, 0, 0);
});

/* ---- GALLERY MODAL ---- */
let galleryIndex = 0;

function getGalleryItems () {
  return Array.from(document.querySelectorAll('.gallery-item img'));
}

function openGallery (index) {
  const items = getGalleryItems();
  galleryIndex = index;
  const modal = document.getElementById('gallery-modal');
  const img = document.getElementById('modal-img');
  img.src = items[index].dataset.full;
  document.getElementById('modal-counter').textContent = (index + 1) + ' / ' + items.length;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGallery () {
  const modal = document.getElementById('gallery-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function navGallery (dir) {
  const items = getGalleryItems();
  galleryIndex = (galleryIndex + dir + items.length) % items.length;
  const img = document.getElementById('modal-img');
  img.style.opacity = '0';
  img.style.transform = 'scale(.95)';
  setTimeout(() => {
    img.src = items[galleryIndex].dataset.full;
    document.getElementById('modal-counter').textContent = (galleryIndex + 1) + ' / ' + items.length;
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  }, 180);
}

// Keyboard support
document.addEventListener('keydown', function (e) {
  const modal = document.getElementById('gallery-modal');
  if (!modal.classList.contains('active')) return;
  if (e.key === 'Escape') closeGallery();
  if (e.key === 'ArrowLeft') navGallery(-1);
  if (e.key === 'ArrowRight') navGallery(1);
});

// Keyboard Enter on gallery items
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGallery(i);
    }
  });
});

function toggleNav() {
  document.body.classList.toggle('nav-open');
  if (document.body.classList.contains('nav-open')) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = '';
  }
}

function closeNav() {
  document.body.classList.remove('nav-open');
  document.documentElement.style.overflow = '';
}
