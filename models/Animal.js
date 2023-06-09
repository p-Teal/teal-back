import mongoose from "mongoose";

const AnimalSchema = new mongoose.Schema({
  animalId: {
    type: String,
    required: [true, "Por favor, adicione o animalId"],
    trim: true,
    unique: true,
  },
  apelido: {
    type: String,
    required: [true, "Por favor, adicione o apelido"],
    trim: true,
    maxlength: [20, "O apelido não pode ter mais que 20 caracteres"],
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
    default: false,
  },
  dataEntrada: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione a data de entrada"],
    length: [10, "A data de entrada precisa ter 10 caracteres"],
  },
  status: {
    type: String,
    trim: true,
    enum: ["adotado", "disponível", "em tratamento", "não disponível"],
    default: "disponível",
  },
  porte: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione o porte"],
    enum: ["pequeno", "médio", "grande"],
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [500, "A descrição não pode ter mais que 500 caracteres"],
  },
  urlFoto: {
    type: String,
    required: [true, "Por favor, adicione a url da foto"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Animal", AnimalSchema);
