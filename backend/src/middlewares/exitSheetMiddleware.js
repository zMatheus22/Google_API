const validadeField = (req, res, next) => {
  const { body } = req;

  // Validar "Data"
  if (body.data === undefined) {
    return res.status(400).json({ message: "The field 'data' is required" });
  }
  if (body.data === "" || body.data === " ") {
    return res
      .status(400)
      .json({ message: "The field 'data' cannot be empty" });
  }

  // Validar "Modelo"
  if (body.model === undefined) {
    return res.status(400).json({ message: "The field 'model' is required" });
  }
  if (body.model === "" || body.model === " ") {
    return res
      .status(400)
      .json({ message: "The field 'model' cannot be empty" });
  }

  //Validar "Quantidade"
  if (body.quantity === undefined) {
    return res
      .status(400)
      .json({ message: "The field 'quantity' is required" });
  }
  if (body.quantity === "" || body.quantity === " ") {
    return res
      .status(400)
      .json({ message: "The field 'quantity' cannot be empty" });
  }

  next();
};

module.exports = { validadeField };
