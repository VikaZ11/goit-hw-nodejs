const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts");

const updateContact = async (req, res) => {
  const { name, email, phone } = req.body;

  const { id } = req.params;
  const result = await contactsOperations.updateContact(id, name, email, phone);
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = updateContact;
