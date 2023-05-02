import mongoose from "mongoose";

const RegistroSchema = new mongoose.Schema({
  registroId: {
    type: String,
    required: [true, "Por favor, adicione o registroId"],
    trim: true,
    unique: true,
  },
  animalId: {
    type: String,
    required: [true, "Por favor, adicione o animalId"],
    trim: true,
  },
  titulo: {
    type: String,
    required: [true, "Por favor, adicione o título"],
    trim: true,
    maxlength: [50, "O título não pode ter mais que 50 caracteres"],
    minlength: [2, "O título não pode ter menos que 2 caracteres"],
  },
  data: {
    type: String,
    required: [true, "Por favor, adicione a data"],
    trim: true,
    length: [10, "A data precisa ter 10 caracteres"],
  },
  tipo: {
    type: String,
    required: [true, "Por favor, adicione o tipo"],
    trim: true,
    enum: ["veterinário", "vacina", "banho", "tosa", "outro"],
  },
  observacao: {
    type: String,
    required: [true, "Por favor, adicione a descrição"],
    trim: true,
    maxlength: [200, "A descrição não pode ter mais que 200 caracteres"],
    minlength: [2, "A descrição não pode ter menos que 2 caracteres"],
  },
  anexo: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  vencimento: {
    type: String,
    trim: true,
    length: [10, "A data de vencimento precisa ter 10 caracteres"],
  },
  valor: {
    type: Number,
    trim: true,
    min: [0, "O valor não pode ser menor que 0"],
  },
});

export default mongoose.model("Registro", RegistroSchema)