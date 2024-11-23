const mongoose = require("mongoose");

const deliveryOptionEnum = ["Retirada", "Entrega"];
// const paymentMethodsEnum = ["Cartão", "Pix", "Dinheiro"];

const orderSchema = new mongoose.Schema({
  deliveryOption: {
    type: String,
    enum: deliveryOptionEnum,
    default: "Entrega",
    required: true,
  },
  customer_addressCEP: { type: String },
  customer_addressStreet: { type: String },
  customer_addressNumber: { type: String },
  customer_addressNeighborhood: { type: String },
  customer_name: { type: String, required: true },
  customer_phone: { type: String, required: true },
  itens: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  ],
  total: { type: String },
  quantity: { type: Number },
  formPayment: {
    method: {
      type: String,
      enum: ["Cartão", "Pix", "Dinheiro"], // Os valores esperados
      required: true,
    },
    details: { type: String, required: false },
  },
  status: {
    type: String,
    enum: [
      "Aguardando pagamento",
      "Em Andamento",
      "Pago",
      "Finalizado",
      "Cancelado",
    ],
    default: "Em Andamento",
  },
  createdIn: { type: Date, default: Date.now },
});

class OrderModel {
  constructor() {
    this.Order = mongoose.model("Order", orderSchema);
  }

  async getAll() {
    return await this.Order.find().populate("itens");
  }

  async getById(id) {
    return await this.Order.findOne(id).populate("itens");
  }

  async create(data) {
    const itens = data.products.map((product) => product._id);

    const orderData = {
      ...data,
      itens,
    };

    const order = new this.Order(orderData);
    return await order.save();
  }

  async update(id, data) {
    return await this.Order.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await this.Order.findByIdAndDelete(id);
  }
}

module.exports = new OrderModel();
