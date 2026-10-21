// Unealta pentru a gasi coordonatele unui obiect nou.
// Deschide index.html?debug, trage un dreptunghi peste obiect,
// apoi copiaza linia generata in index.html.
if (new URLSearchParams(location.search).has('debug')) {
  document.body.classList.add('debug');

  const scena = document.querySelector('.scena');
  const rezultat = document.createElement('div');
  rezultat.className = 'rezultat';
  rezultat.textContent = 'Mod debug: trage un dreptunghi peste un obiect.';
  document.body.appendChild(rezultat);

  let start = null, chenar = null;
  const procente = e => {
    const r = scena.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * 100, y: (e.clientY - r.top) / r.height * 100 };
  };

  scena.addEventListener('mousedown', e => {
    e.preventDefault();
    start = procente(e);
    chenar = document.createElement('div');
    chenar.className = 'chenar-nou';
    scena.appendChild(chenar);
  });

  window.addEventListener('mousemove', e => {
    if (!start) return;
    const p = procente(e);
    Object.assign(chenar.style, {
      left: Math.min(start.x, p.x) + '%', top: Math.min(start.y, p.y) + '%',
      width: Math.abs(p.x - start.x) + '%', height: Math.abs(p.y - start.y) + '%'
    });
  });

  window.addEventListener('mouseup', e => {
    if (!start) return;
    const p = procente(e);
    const f = n => n.toFixed(1);
    rezultat.textContent =
      `style="left:${f(Math.min(start.x, p.x))}%; top:${f(Math.min(start.y, p.y))}%; ` +
      `width:${f(Math.abs(p.x - start.x))}%; height:${f(Math.abs(p.y - start.y))}%;"`;
    start = null;
  });
}
