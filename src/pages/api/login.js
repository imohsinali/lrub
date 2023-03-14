// pages/api/login.js

export default async function handler(req, res) {
  const { role } = req.body;

  // Set the login state in the session
  req.session.login = {
    Inspector: role === "Inspector",
    Admin: role === "Admin",
    User: role === "User",
  };

  res.status(200).json({ success: true });
}
