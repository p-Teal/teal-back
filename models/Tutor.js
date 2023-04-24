import mongoose from "mongoose";
import validator from "validator";

const TutorSchema = new mongoose.Schema({
  cpf: {
    type: String,
    required: [true, "Por favor, adicione o CPF"],
    unique: true,
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
    required: [true, "Por favor, adicione o telefone"],
    maxlength: [11, "O telefone não pode ter mais que 11 caracteres"],
    minlength: [10, "O telefone não pode ter menos que 10 caracteres"],
  },
  endereco: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione o endereço"],
    maxlength: [100, "O endereço não pode ter mais que 100 caracteres"],
    minlength: [10, "O endereço não pode ter menos que 10 caracteres"],
  },
  dataNascimento: {
    type: String,
    trim: true,
    length: [10, "A data de nascimento não pode ter mais que 10 caracteres"],
  },
  cidade: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione a cidade"],
    maxlength: [50, "A cidade não pode ter mais que 50 caracteres"],
    minlength: [3, "A cidade não pode ter menos que 3 caracteres"],
  },
  estado: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione o estado"],
    length: [2, "O estado não pode ter mais que 2 caracteres"],
  },
  status: {
    type: String,
    trim: true,
    enum: ["aprovado", "reprovado", "em análise"],
    default: "em análise",
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [500, "A descrição não pode ter mais que 500 caracteres"],
  },
  tipoMoradia: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione o tipo de moradia"],
    enum: ["casa", "apartamento", "rural", "outro"],
  },
  tamanhoFamilia: {
    type: Number,
    required: [true, "Por favor, adicione o tamanho da família"],
    min: [1, "O tamanho da família não pode ser menor que 1"],
  },
  profissao: {
    type: String,
    trim: true,
    required: [true, "Por favor, adicione a profissão"],
    maxlength: [50, "A profissão não pode ter mais que 50 caracteres"],
    minlength: [3, "A profissão não pode ter menos que 3 caracteres"],
  },
  numCriancas: {
    type: Number,
    required: [true, "Por favor, adicione o número de crianças"],
  },
  numAnimais: {
    type: Number,
    required: [true, "Por favor, adicione o número de animais"],
  },
});

export default mongoose.model("Tutor", TutorSchema);

