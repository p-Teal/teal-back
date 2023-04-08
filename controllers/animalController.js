import { BadReqError, AuthError } from "../errors/index.js";
import Animal from "../models/Animal.js";
import { StatusCodes } from "http-status-codes";


const createAnimal = async (req, res) => {
  const { nome, tipo, apelido, raca, sexo, dataNascimento, dataEntrada, descricao, urlFoto, animalId } = req.body;

  if (!nome || !tipo || !apelido || !raca || !sexo || !urlFoto) {
    throw new BadReqError("Por favor, adicione todos os campos");
  }

  if (!animalId) {
    throw new BadReqError("Adicione o um uuid válido")
  }

  const animal = await Animal.create(req.body);

  res.status(StatusCodes.CREATED).json({
    animal
  });
}


const getAnimais = async (req, res) => {
  const animais = await Animal.find();

  const totalAnimais = await Animal.countDocuments();

  res.status(StatusCodes.OK).json({
    animais,
    totalAnimais
  });
}





export { createAnimal, getAnimais };