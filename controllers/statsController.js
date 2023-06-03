import Adocao from "../models/Adocao.js";
import Animal from "../models/Animal.js";
import moment from "moment";

const getStats = async (req, res) => {
  let adocoesMensais = await Adocao.aggregate([
    {
      $addFields: {
        dataAdocao: {
          $dateFromString: {
            dateString: "$dataAdocao",
            format: "%d/%m/%Y",
          },
        },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$dataAdocao" },
          month: { $month: "$dataAdocao" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": -1, "_id.month": -1 },
    },
    {
      $limit: 6,
    },
  ]);

  adocoesMensais = adocoesMensais
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = moment()
        .month(month - 1)
        .year(year)
        .locale("pt")
        .format("MMMM Y");

      return { date, count };
    })
    .reverse();

  let statusCounts = await Animal.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  let animaisAdotados = 0;
  let animaisDisponiveis = 0;
  let animaisIndisponiveis = 0;
  let animaisEmTratamento = 0;

  statusCounts.forEach((statusCount) => {
    switch (statusCount._id) {
      case "adotado":
        animaisAdotados = statusCount.count;
        break;
      case "disponível":
        animaisDisponiveis = statusCount.count;
        break;
      case "não disponível":
        animaisIndisponiveis = statusCount.count;
        break;
      case "em tratamento":
        animaisEmTratamento = statusCount.count;
        break;
    }
  });

  let tiposCounts = await Animal.aggregate([
    {
      $group: {
        _id: "$tipo",
        count: { $sum: 1 },
      },
    },
  ]);

  let animaisCachorro = 0;
  let animaisGato = 0;
  let animaisOutros = 0;

  tiposCounts.forEach((tipoCount) => {
    switch (tipoCount._id) {
      case "cachorro":
        animaisCachorro = tipoCount.count;
        break;
      case "gato":
        animaisGato = tipoCount.count;
        break;
      case "outros":
        animaisOutros = tipoCount.count;
        break;
    }
  });

  res.status(200).json({
    adocoesMensais,
    animaisAdotados,
    animaisDisponiveis,
    animaisIndisponiveis,
    animaisEmTratamento,
    animaisCachorro,
    animaisGato,
    animaisOutros,
    totalAnimais: animaisCachorro + animaisGato + animaisOutros,
  });
};

export { getStats };
