const bcrypt = require("bcrypt");
const mongoose = require("mongoose"),
  { Schema } = mongoose;

// Modelo barato
const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  tokenConfirm: {
    type: String,
    default: null,
  },
  confirmatedAccount: {
    type: Boolean,
    default: false,
  },
  imagen: {
    type: String,
    default: null,
  },
});

// Subproceso de mongoose (antes de guardar ejecuta esta encriptacion (datos sencibles put9))
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  try {
    // Pasos y encriptacion junto al paquete de npm xd
    const salt = await bcrypt.genSalt(10),
      hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    next();
  } catch (err) {
    // Validacion si es que existe un error en la Encriptacion
    console.log(err);
    next();
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
