const permission = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.user.role;

    if (!role) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
};

export default permission;