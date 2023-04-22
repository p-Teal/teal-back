import Doacao from "../models/Doacao.js";
import { StatusCodes } from "http-status-codes";
import { BadReqError, AuthError } from "../errors/index.js";

const createDoacao = async (req, res) => {
  const { remetente, item, quantidade, data } = req.body;

  if (!remetente || !item || !quantidade || !data) {
    throw new BadReqError("Por favor, adicione todos os campos obrigatórios");
  }

  const doacao = await Doacao.create(req.body);

  res.status(StatusCodes.CREATED).json({
    doacao,
  });
};

const getDoacoes = async (req, res) => { 
  const doacoes = await Doacao.find().sort({ disponivel: -1, createdAt: -1 });

  const totalDoacoes = await Doacao.countDocuments();

  res.status(StatusCodes.OK).json({
    doacoes,
    totalDoacoes,
  });
};

const desativarDoacao = async (req, res) => {
  const { id } = req.params;

  const doacao = await Doacao.findById(id);

  if (!doacao) {
    throw new BadReqError("Doação não encontrada");
  }

  doacao.disponivel = false;

  await doacao.save();

  res.status(StatusCodes.NO_CONTENT).send();
};

const deleteDoacao = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadReqError("Adicione um id válido");
  }

  const doacao = await Doacao.findById(id);

  if (!doacao) {
    throw new BadReqError("Doação não encontrada");
  }

  await doacao.deleteOne({
    _id: id,
  });

  res.status(StatusCodes.NO_CONTENT).send();

}

export { createDoacao, getDoacoes, desativarDoacao, deleteDoacao };
