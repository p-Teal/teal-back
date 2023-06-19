import { StatusCodes } from "http-status-codes";
import Adocao from "../models/Adocao.js";
import Animal from "../models/Animal.js";
import Tutor from "../models/Tutor.js";
import { BadReqError, AuthError } from "../errors/index.js";

const createAdocao = async (req, res) => {
  const { animalId, cpf, dataAdocao, observacao } = req.body;

  if (!animalId || !cpf || !dataAdocao) {
    throw new BadReqError("Por favor, adicione todos os campos obrigatórios");
  }

  const animal = await Animal.findOne({
    animalId: animalId,
  });

  if (!animal || animal.status !== "disponível") {
    throw new BadReqError(
      "Animal não encontrado ou não disponível para adoção"
    );
  }

  const tutor = await Tutor.findOne({
    cpf: cpf,
  });

  if (!tutor || tutor.status !== "aprovado") {
    throw new BadReqError("Tutor não encontrado ou não aprovado");
  }

  const adocaoObj = {
    animalId: animalId,
    apelido: animal.apelido,
    tipo: animal.tipo,
    cpf: cpf,
    nome: tutor.nome,
    dataAdocao: dataAdocao,
  };

  if (observacao) {
    adocaoObj.observacao = observacao;
  }

  const adocao = await Adocao.create(adocaoObj);

  animal.status = "adotado";
  await animal.save();

  res.status(StatusCodes.CREATED).json({
    adocao,
  });
};

const getAdocoes = async (req, res) => {
  const adocoes = await Adocao.find().sort({ createdAt: -1 });

  const totalAdocoes = await Adocao.countDocuments();

  res.status(StatusCodes.OK).json({
    adocoes,
    totalAdocoes,
  });
};

const cancelarAdocao = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadReqError("Adicione um id válido");
  }

  const adocao = await Adocao.findById(id);

  if (!adocao) {
    throw new BadReqError("Adoção não encontrada");
  }

  const animal = await Animal.findOne({
    animalId: adocao.animalId,
  });

  if (!animal) {
    throw new BadReqError("Animal não encontrado");
  }

  animal.status = "disponível";
  await animal.save();

  adocao.cancelada = true;
  adocao.dataCancelamento = new Date();
  await adocao.save();

  res.status(StatusCodes.NO_CONTENT).send();
};

const apagarAdocao = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadReqError("Adicione um id válido");
  }

  const adocao = await Adocao.findById(id);

  if (!adocao) {
    throw new BadReqError("Adoção não encontrada");
  }

  const animal = await Animal.findOne({
    animalId: adocao.animalId,
  });

  if (!animal) {
    throw new BadReqError("Animal não encontrado");
  }

  animal.status = "disponível";
  await animal.save();

  await Adocao.findByIdAndDelete(id);

  res.status(StatusCodes.NO_CONTENT).send();
};

const getAnimaisDisponiveis = async (req, res) => {
  const animais = await Animal.find({ status: "disponível" });

  res.status(StatusCodes.OK).json({
    animais,
  });
};

const getTutorAprovadoByCpf = async (req, res) => {
  const { cpf } = req.params;

  if (!cpf) {
    throw new BadReqError("Adicione um cpf válido");
  }

  const tutor = await Tutor.findOne({
    cpf: cpf,
    status: "aprovado",
  });

  if (!tutor) {
    throw new BadReqError("Tutor não encontrado ou não aprovado");
  }

  res.status(StatusCodes.OK).json({
    tutor,
  });
};

export {
  createAdocao,
  getAdocoes,
  cancelarAdocao,
  apagarAdocao,
  getAnimaisDisponiveis,
  getTutorAprovadoByCpf,
};
