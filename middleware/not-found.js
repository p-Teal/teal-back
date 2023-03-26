export default (req, res) =>
  res.status(404).json({
    mensagem: "Nada Encontrado",
  });
