import { BadReqError, AuthError } from "../errors/index.js";
import Animal from "../models/Animal.js";
import { StatusCodes } from "http-status-codes";

const createAnimal = async (req, res) => {
  const {
    nome,
    tipo,
    apelido,
    raca,
    sexo,
    dataEntrada,
    urlFoto,
    animalId,
    porte,
  } = req.body;

  if (
    !nome ||
    !tipo ||
    !apelido ||
    !raca ||
    !sexo ||
    !urlFoto ||
    !dataEntrada ||
    !porte
  ) {
    throw new BadReqError("Por favor, adicione todos os campos obrigatórios");
  }

  if (!animalId) {
    throw new BadReqError("Adicione o um uuid válido");
  }

  const animal = await Animal.create(req.body);

  res.status(StatusCodes.CREATED).json({
    animal,
  });
};

const getAnimais = async (req, res) => {
  const animais = await Animal.find().sort({ createdAt: -1 });

  const totalAnimais = await Animal.countDocuments();

  res.status(StatusCodes.OK).json({
    animais,
    totalAnimais,
  });
};

const getAnimal = async (req, res) => {
  const { id } = req.params;

  const animal = await Animal.findOne(
    { animalId: id },
  );

  if (!animal) {
    throw new BadReqError("Animal não encontrado");
  }

  res.status(StatusCodes.OK).json({
    animal,
  });
};

const updateFoto = async (req, res) => {
  const { id } = req.params;

  const animal = await Animal.findOne(
    { animalId: id },
  );

  if (!animal) {
    throw new BadReqError("Animal não encontrado");
  }

  const { urlFoto } = req.body;

  if (!urlFoto) {
    throw new BadReqError("Adicione uma url válida");
  }

  animal.urlFoto = urlFoto;

  await animal.save();

  res.status(StatusCodes.NO_CONTENT).send();
};

export { createAnimal, getAnimais, getAnimal, updateFoto };
