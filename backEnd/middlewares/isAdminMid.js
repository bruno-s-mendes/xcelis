const HTTP_UNATUTHORIZED_STATUS = 401;

module.exports = async (req, res, next) => {
  const user = req.user;

  if (user.role !== "admin") return res.status(HTTP_UNATUTHORIZED_STATUS).json({ message: 'user has to be admin for this operation' });

  next();
};