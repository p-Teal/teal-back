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
      admin: voluntario.admin,
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
    throw new BadReqError("Credenciais inválidas");
  }

  const senhaCorreta = await voluntario.compararSenha(senha);
  if (!senhaCorreta) {
    throw new BadReqError("Credenciais inválidas");
  }

  if (!voluntario.ativo) {
    throw new BadReqError(
      "Voluntário não está ativo, entre em contato com o administrador."
    );
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
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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
    throw new BadReqError("Voluntário não encontrado");
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
    throw new BadReqError("Voluntário não encontrado");
  }

  res.status(StatusCodes.OK).json({
    voluntario,
  });
};

const getVoluntarioById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadReqError("ID não informado");
  }

  const voluntario = await Voluntario.findOne({
    _id: id,
  });

  if (!voluntario) {
    throw new BadReqError("Voluntário não encontrado");
  }

  const value = new Date(voluntario.createdAt).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  res.status(StatusCodes.OK).json({
    voluntario: {
      ...voluntario._doc,
      createdAt: value,
    },
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
    throw new BadReqError("Voluntário não encontrado");
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
    throw new BadReqError("Voluntário não encontrado");
  }

  voluntario.ativo = false;

  await voluntario.save();

  res.status(StatusCodes.OK).json({
    mensagem: "Voluntário desativado com sucesso",
  });
};

const getVoluntarios = async (req, res) => {
  //TODO ADMIN ONLY
  const voluntarios = await Voluntario.find({ admin: false })
    .sort({ createdAt: -1 });

  const totalVoluntarios = await Voluntario.countDocuments({ admin: false });

  res.status(StatusCodes.OK).json({
    voluntarios,
    totalVoluntarios,
  });
};

const deleteVoluntario = async (req, res) => {
  const { cpf } = req.params;

  if (!cpf) {
    throw new BadReqError("CPF não informado");
  }

  const voluntario = await Voluntario.findOne({
    cpf,
  });

  if (!voluntario) {
    throw new BadReqError("Voluntário não encontrado");
  }

  if (req.voluntario.voluntarioId === voluntario._id) {
    throw new BadReqError("Ação não permitida");
  }

  await voluntario.deleteOne({
    cpf,
  })

  res.status(StatusCodes.OK).json({
    mensagem: "Voluntário deletado com sucesso",
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
  getVoluntarioById,
  deleteVoluntario,
};
