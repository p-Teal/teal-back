import { StatusCodes } from "http-status-codes";
import Registro from "../models/Registro.js";
import Animal from "../models/Animal.js";

const createRegistro = async (req, res) => {
  const { registroId, animalId, titulo, data, tipo, observacao } = req.body;

  if (!registroId || !animalId || !titulo || !data || !tipo || !observacao) {
    throw new BadReqError("Por favor, adicione todos os campos obrigatórios");
  }

  const animal = Animal.findOne({
    animalId: animalId,
  });

  if (!animal || animal.status === "adotado") {
    throw new BadReqError("Animal não encontrado ou não disponível para editar");
  }

  const registro = await Registro.create(req.body);

  res.status(StatusCodes.CREATED).json({
    registro,
  });
};

const getRegistrosByAnimalId = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadReqError("Adicione um id válido");
  }

  const registros = await Registro.find({
    animalId: id,
  }).sort({ createdAt: -1 });

  const total = await Registro.countDocuments({
    animalId: id,
  });

  res.status(StatusCodes.OK).json({
    registros,
    totalRegistros: total,
  });
};

const deleteRegistro = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadReqError("Adicione um id válido");
  }

  const registro = await Registro.findById(id);

  if (!registro) {
    throw new BadReqError("Registro não encontrado");
  }

  await registro.deleteOne({
    _id: id,
  });

  res.status(StatusCodes.NO_CONTENT).send();
};

export { createRegistro, getRegistrosByAnimalId, deleteRegistro };
