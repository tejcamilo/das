export const login = async(req, res) => {
  res.render('login', { error: null });
}

export const loginPost = async (req, res) => {
  const { usuario, password } = req.body;
  // Ejemplo simple: usuario=admin, password=admin123
  if (usuario === 'fisiocare' && password === 'fisiocare') {
    req.session.usuario = usuario;
    return res.redirect('/citas');
  } else {
    res.render('login', { error: 'Usuario o contraseña incorrectos' });
  }
}

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
}