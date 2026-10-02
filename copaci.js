(function () {
  // Validar que el usuario haya iniciado sesión como copaci
  const role = sessionStorage.getItem('copaci_role');

  if (role !== 'copaci') {
    // Si no es copaci, lo mandamos al login
    window.location.href = 'index.html';
    return;
  }

  const logoutBtn = document.getElementById('logoutBtn');

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('copaci_user');
    sessionStorage.removeItem('copaci_role');
    window.location.href = 'index.html';
  });

  // Interacción con tarjetas
  document.querySelectorAll('.copaci-action-card').forEach((card) => {
    card.addEventListener('click', () => {
      const action = card.getAttribute('data-action');
      console.log('[COPACI] Acción seleccionada:', action);
      // Aquí conectas cada acción con su pantalla o modal
    });
  });
})();