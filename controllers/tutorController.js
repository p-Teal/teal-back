import Tutor from "../models/Tutor.js";
import { StatusCodes } from "http-status-codes";
import { BadReqError, AuthError } from "../errors/index.js";

const createTutor = async (req, res) => {
  const {
    cpf,
    nome,
    telefone,
    endereco,
    cidade,
    estado,
    tipoMoradia,
    tamanhoFamilia,
    profissao,
    numCriancas,
    numAnimais,
  } = req.body;

  if (
    !cpf ||
    !nome ||
    !telefone ||
    !endereco ||
    !cidade ||
    !estado ||
    !tipoMoradia ||
    !tamanhoFamilia ||
    !profissao ||
    (!numCriancas && numCriancas !== 0) ||
    (!numAnimais && numAnimais !== 0)
  ) {
    throw new BadReqError("Por favor, adicione todos os campos obrigatórios");
  }

  const tutor = await Tutor.create(req.body);

  res.status(StatusCodes.CREATED).json({
    tutor,
  });
};

const getTutores = async (req, res) => {
  const tutores = await Tutor.find().sort({ createdAt: -1 });

  const totalTutores = await Tutor.countDocuments();

  res.status(StatusCodes.OK).json({
    tutores,
    totalTutores,
  });
};

const deleteTutor = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadReqError("Adicione um id válido");
  }

  const tutor = await Tutor.findById(id);

  if (!tutor) {
    throw new BadReqError("Tutor não encontrado");
  }

  await tutor.deleteOne({
    _id: id,
  });

  res.status(StatusCodes.NO_CONTENT).send();
}

const getTutor = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadReqError("Adicione um id válido");
  }

  const tutor = await Tutor.findById(id);

  if (!tutor) {
    throw new BadReqError("Tutor não encontrado");
  }

  res.status(StatusCodes.OK).json({
    tutor,
  });
}

export { createTutor, getTutores, deleteTutor, getTutor };
