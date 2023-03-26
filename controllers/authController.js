import { BadReqError, AuthError } from "../errors/index.js";
import Voluntario from "../models/Voluntario.js";
import attachCookie from "../utils/cookie.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const { nome, senha, cpf } = req.body;

  if (!nome || !senha || !cpf) {
    throw new BadReqError("Por favor, adicione todos os campos");
  }

  const voluntarioExistente = await Voluntario.findOne({ cpf });

  if (voluntarioExistente) {
    throw new BadReqError("CPF já cadastrado");
  }

  const totalVoluntarios = await Voluntario.countDocuments();

  if (totalVoluntarios === 0) {
    req.body.ativo = true;
    req.body.admin = true;
  }

  const voluntario = await Voluntario.create(req.body);

  const token = voluntario.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.CREATED).json({
    voluntario: {
      nome: voluntario.nome,
      cpf: voluntario.cpf,
    },
  });
};

const login = async (req, res) => {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    throw new BadReqError("Por favor, adicione todos os campos");
  }

  const voluntario = await Voluntario.findOne({
    cpf,
  }).select("+senha");

  if (!voluntario) {
    throw new AuthError("CPF ou senha incorretos");
  }

  const senhaCorreta = await voluntario.compararSenha(senha);
  if (!senhaCorreta) {
    throw new AuthError("CPF ou senha incorretos");
  }

  if (!voluntario.ativo) {
    throw new AuthError("Voluntário não está ativo");
  }

  const token = voluntario.createJWT();

  voluntario.senha = undefined;

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({
    voluntario,
  });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({
    mensagem: "Logout realizado com sucesso",
  });
};

const updateVoluntario = async (req, res) => {
  const {
    nome,
    email,
    telefone,
    endereco,
    dataNascimento,
    descricao,
    estado,
    cidade,
  } = req.body;

  const voluntario = await Voluntario.findOne({
    _id: req.voluntario.voluntarioId,
  });

  if (!voluntario) {
    throw new AuthError("Voluntário não encontrado");
  }

  if (nome) {
    voluntario.nome = nome;
  }

  if (email) {
    voluntario.email = email;
  }

  if (telefone) {
    voluntario.telefone = telefone;
  }

  if (endereco) {
    voluntario.endereco = endereco;
  }

  if (dataNascimento) {
    voluntario.dataNascimento = dataNascimento;
  }

  if (descricao) {
    voluntario.descricao = descricao;
  }

  if (estado) {
    voluntario.estado = estado;
  }

  if (cidade) {
    voluntario.cidade = cidade;
  }

  await voluntario.save();

  const token = voluntario.createJWT();

  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({
    voluntario,
  });
};

const getVoluntario = async (req, res) => {
  const voluntario = await Voluntario.findOne({
    _id: req.voluntario.voluntarioId,
  });

  if (!voluntario) {
    throw new AuthError("Voluntário não encontrado");
  }

  res.status(StatusCodes.OK).json({
    voluntario,
  });
};

const ativarVoluntario = async (req, res) => {
  const { cpf } = req.params;

  if (!cpf) {
    throw new BadReqError("CPF não informado");
  }

  const voluntario = await Voluntario.findOne({
    cpf,
  });

  if (!voluntario) {
    throw new AuthError("Voluntário não encontrado");
  }

  voluntario.ativo = true;

  await voluntario.save();

  res.status(StatusCodes.OK).json({
    mensagem: "Voluntário ativado com sucesso",
  });
};

const desativarVoluntario = async (req, res) => {
  const { cpf } = req.params;

  if (!cpf) {
    throw new BadReqError("CPF não informado");
  }

  const voluntario = await Voluntario.findOne({
    cpf,
  });

  if (!voluntario) {
    throw new AuthError("Voluntário não encontrado");
  }

  voluntario.ativo = false;

  await voluntario.save();

  res.status(StatusCodes.OK).json({
    mensagem: "Voluntário desativado com sucesso",
  });
};

const getVoluntarios = async (req, res) => {
  const voluntarios = await Voluntario.find();

  res.status(StatusCodes.OK).json({
    voluntarios,
  });
};

export {
  register,
  login,
  logout,
  updateVoluntario,
  getVoluntario,
  ativarVoluntario,
  desativarVoluntario,
  getVoluntarios,
};
