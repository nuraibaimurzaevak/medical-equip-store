module.exports = function (req, res, next) {
  const user = req.user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Доступ разрешен только администраторам.' });
  }

  next(); // если админ — пропускаем дальше
};
