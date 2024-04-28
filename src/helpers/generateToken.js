import jwt from "jsonwebtoken";
const secret = "12345678987654dfghjhgfdsdfghuytrertyu**//--";
export const generateToken = (req, res) => {
  try {
    const { user } = req.body;
    const { nombre, rol_id } = user;
    const payload = { nombre, rol_id };
    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    res.status(200).json({ httpStatus: 200, content: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
