import { validationResult } from "express-validator";

export const login = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  return res.json({ data: req.body });
};

export const register = (req, res) => {
  res.send("<h1>register</h1>");
};
