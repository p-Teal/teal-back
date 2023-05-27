import mongoose from "mongoose";

const AdocaoSchema = new mongoose.Schema({
  animalId: {
    type: String,
    required: [true, "Por favor, adicione o animalId"],
    trim: true,
  },
  apelido: {
    type: String,
    required: [true, "Por favor, adicione o apelido"],
    trim: true,
    maxlength: [20, "O apelido não pode ter mais que 20 caracteres"],
    minlength: [2, "O apelido não pode ter menos que 2 caracteres"],
  },
  tipo: {
    type: String,
    required: [true, "Por favor, adicione o tipo"],
    trim: true,
    enum: ["cachorro", "gato", "outro"],
  },
  cpf: {
    type: String,
    required: [true, "Por favor, adicione o CPF"],
    trim: true,
    length: [11, "O CPF não pode ter mais que 11 caracteres"],
  },
  nome: {
    type: String,
    required: [true, "Por favor, adicione o nome"],
    trim: true,
    maxlength: [50, "O nome não pode ter mais que 50 caracteres"],
    minlength: [10, "O nome não pode ter menos que 10 caracteres"],
  },
  cancelada: {
    type: Boolean,
    required: [true, "Por favor, adicione se a adoção foi cancelada"],
    default: false,
  },
  dataAdocao: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione a data de adoção"],
    length: [10, "A data de adoção precisa ter 10 caracteres"],
  },
  dataCancelamento: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Adocao", AdocaoSchema, "adocoes");
