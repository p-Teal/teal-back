import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const VoluntarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Por favor, adicione o nome"],
    trim: true,
    maxlength: [50, "O nome não pode ter mais que 50 caracteres"],
    minlength: [10, "O nome não pode ter menos que 10 caracteres"],
  },
  cpf: {
    type: String,
    required: [true, "Por favor, adicione o CPF"],
    unique: true,
    trim: true,
    maxlength: [11, "O CPF não pode ter mais que 11 caracteres"],
    minlength: [11, "O CPF não pode ter menos que 11 caracteres"],
  },
  senha: {
    type: String,
    required: [true, "Por favor, adicione a senha"],
    trim: true,
    maxlength: [30, "A senha não pode ter mais que 30 caracteres"],
    minlength: [6, "A senha não pode ter menos que 6 caracteres"],
    select: false,
  },
  email: {
    type: String,
    trim: true,
    maxlength: [50, "O email não pode ter mais que 50 caracteres"],
    minlength: [10, "O email não pode ter menos que 10 caracteres"],
    validate: {
      validator: validator.isEmail,
      message: "Por favor, adicione um email válido",
    },
  },
  telefone: {
    type: String,
    trim: true,
    maxlength: [11, "O telefone não pode ter mais que 11 caracteres"],
    minlength: [10, "O telefone não pode ter menos que 10 caracteres"],
  },
  endereco: {
    type: String,
    trim: true,
    maxlength: [100, "O endereço não pode ter mais que 100 caracteres"],
    minlength: [10, "O endereço não pode ter menos que 10 caracteres"],
  },
  dataNascimento: {
    type: String,
    trim: true,
    maxlength: [10, "A data de nascimento não pode ter mais que 10 caracteres"],
    minlength: [
      10,
      "A data de nascimento não pode ter menos que 10 caracteres",
    ],
  },
  ativo: {
    type: Boolean,
    default: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cidade: {
    type: String,
    trim: true,
    maxlength: [50, "A cidade não pode ter mais que 50 caracteres"],
    minlength: [3, "A cidade não pode ter menos que 3 caracteres"],
  },
  estado: {
    type: String,
    trim: true,
    maxlength: [2, "O estado não pode ter mais que 2 caracteres"],
    minlength: [2, "O estado não pode ter menos que 2 caracteres"],
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [500, "A descrição não pode ter mais que 500 caracteres"],
  },
});

VoluntarioSchema.pre("save", async function () {
  if (!this.isModified("senha")) return;

  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

VoluntarioSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      voluntarioId: this._id,
      admin: this.admin,
      ativo: this.ativo,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

VoluntarioSchema.methods.compararSenha = async function (senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

export default mongoose.model("Voluntario", VoluntarioSchema);
