import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema({
  registroAnimal: {
    type: String,
    required: [true, "Por favor, adicione o registro do animal"],
    trim: true,
    maxlength: [50, "O registro do animal não pode ter mais que 50 caracteres"],
    minlength: [2, "O registro do animal não pode ter menos que 2 caracteres"],
    unique: true,
  },
  apelido: {
    type: String,
    required: [true, "Por favor, adicione o apelido"],
    trim: true,
    maxlength: [50, "O apelido não pode ter mais que 50 caracteres"],
    minlength: [2, "O apelido não pode ter menos que 2 caracteres"],
  },
  nome: {
    type: String,
    required: [true, "Por favor, adicione o nome"],
    trim: true,
    maxlength: [50, "O nome não pode ter mais que 50 caracteres"],
    minlength: [2, "O nome não pode ter menos que 2 caracteres"],
  },
  tipo: {
    type: String,
    required: [true, "Por favor, adicione o tipo"],
    trim: true,
    enum: ["cachorro", "gato", "outro"],
  },
  raca: {
    type: String,
    required: [true, "Por favor, adicione a raça"],
    trim: true,
    maxlength: [50, "A raça não pode ter mais que 50 caracteres"],
    minlength: [3, "A raça não pode ter menos que 3 caracteres"],
  },
  sexo: {
    type: String,
    required: [true, "Por favor, adicione o sexo"],
    trim: true,
    enum: ["M", "F"],
  },
  dataNascimento: {
    type: String,
    trim: true,
    length: [10, "A data de nascimento não pode ter mais que 10 caracteres"],
  },
  castrado: {
    type: Boolean,
    required: [true, "Por favor, adicione se o animal está castrado"],
  },
  dataEntrada: {
    type: String,
    trim: true,
    length: [10, "A data de entrada não pode ter mais que 10 caracteres"],
  },
  status: {
    type: String,
    trim: true,
    enum: ["adotado", "disponível", "em tratamento", "nao disponível"],
    default: "disponível",
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [500, "A descrição não pode ter mais que 500 caracteres"],
  },
  urlFoto: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.model("Animal", AnimalSchema);