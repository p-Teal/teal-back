import mongoose from "mongoose";

const DoacaoSchema = new mongoose.Schema({
  remetente: {
    type: String,
    required: [true, "Por favor, adicione o remetente"],
    trim: true,
    maxlength: [50, "O remetente não pode ter mais que 50 caracteres"],
    minlength: [5, "O remetente não pode ter menos que 5 caracteres"],
  },
  contato: {
    type: String,
    required: [true, "Por favor, adicione o contato"],
    trim: true,
    maxlength: [50, "O contato não pode ter mais que 50 caracteres"],
    minlength: [5, "O contato não pode ter menos que 5 caracteres"],
  },
  item: {
    type: String,
    required: [true, "Por favor, adicione o item"],
    trim: true,
    maxlength: [50, "O item não pode ter mais que 50 caracteres"],
    minlength: [3, "O item não pode ter menos que 3 caracteres"],
  },
  quantidade: {
    type: String,
    required: [true, "Por favor, adicione a quantidade"],
    trim: true,
    maxlength: [10, "A quantidade não pode ter mais que 10 caracteres"],
    minlength: [1, "A quantidade não pode ter menos que 1 caracteres"],
  },
  data: {
    type: String,
    required: [true, "Por favor, adicione a data"],
    trim: true,
    length: [10, "A data precisa ter 10 caracteres"],
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: [500, "A descrição não pode ter mais que 500 caracteres"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  disponivel: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Doacao", DoacaoSchema);
