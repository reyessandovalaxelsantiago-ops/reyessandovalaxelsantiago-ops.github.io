(function () {
  'use strict';

  // ============================================================
  // REFERENCIAS AL DOM
  // ============================================================
  const loginBtn = document.getElementById('loginBtn');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  // ============================================================
  // CONFIGURACIÓN DE USUARIOS
  // ------------------------------------------------------------
  // - admin → contraseña: admin123 → admin.html
  // - copaci → contraseña: copaci123 → copaci.html
  // - cliente → SIN contraseña → cliente.html
  // ============================================================
  const USERS = {
    admin: {
      password: 'admin123',
      role: 'admin',
      redirect: 'admin.html',
      noPassword: false,
    },
    copaci: {
      password: 'copaci123',
      role: 'copaci',
      redirect: 'copaci.html',
      noPassword: false,
    },
    cliente: {
      password: '', // no se usa
      role: 'cliente',
      redirect: 'cliente.html',
      noPassword: true, // entra sin contraseña
    },
  };

  // ============================================================
  // UTILIDADES
  // ============================================================
  function limpiarSesion() {
    sessionStorage.removeItem('copaci_user');
    sessionStorage.removeItem('copaci_role');
  }

  function guardarSesion(usuario, rol) {
    sessionStorage.setItem('copaci_user', usuario);
    sessionStorage.setItem('copaci_role', rol);
  }

  function mostrarError(mensaje) {
    alert(mensaje);
  }

  function irAlPanel(redirect) {
    window.location.href = redirect;
  }

  // ============================================================
  // LÓGICA PRINCIPAL DEL LOGIN
  // ============================================================
  function handleLogin() {
    const user = usernameInput.value.trim().toLowerCase();
    const pass = passwordInput.value.trim();

    // 1) Validar que se haya escrito un usuario
    if (!user) {
      mostrarError('Por favor, ingrese su usuario.');
      usernameInput.focus();
      return;
    }

    // 2) Buscar el usuario en la lista
    const found = USERS[user];

    if (!found) {
      mostrarError(
        'Usuario no reconocido.\n\n' +
        'Usuarios válidos:\n' +
        '• admin\n' +
        '• copaci\n' +
        '• cliente'
      );
      usernameInput.focus();
      return;
    }

    // 3) Usuario SIN contraseña (cliente) → entra directo
    if (found.noPassword) {
      limpiarSesion();
      guardarSesion(user, found.role);
      irAlPanel(found.redirect);
      return;
    }

    // 4) Usuario CON contraseña → validar
    if (!pass) {
      mostrarError('Por favor, ingrese su contraseña.');
      passwordInput.focus();
      return;
    }

    if (found.password === pass) {
      limpiarSesion();
      guardarSesion(user, found.role);
      irAlPanel(found.redirect);
    } else {
      mostrarError(
        'Contraseña incorrecta.\n\n' +
        'Verifique sus credenciales e intente nuevamente.'
      );
      passwordInput.value = '';
      passwordInput.focus();
    }
  }

  // ============================================================
  // EVENTOS
  // ============================================================
  if (loginBtn) {
    loginBtn.addEventListener('click', handleLogin);
  }

  // Enter en cualquiera de los dos campos ejecuta el login
  [usernameInput, passwordInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleLogin();
      }
    });
  });

  // Al cargar la página, limpiamos cualquier sesión previa
  limpiarSesion();

  // Foco inicial en el campo de usuario
  if (usernameInput) {
    usernameInput.focus();
  }
})();