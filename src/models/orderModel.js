const mongoose = require("mongoose");

const orderStatusEnum = [
  0, // Aguardando pagamento
  1, // Em Andamento
  2, // Pago
  3, // Finalizado
  4, // Cancelado
];

const paymentMethodsEnum = [
  0, // Cartão
  1, // Pix
  2, // Dinheiro
];

const deliveryOptionEnum = [
  0, // Retirar no Local
  1, // Entrega
];

const orderSchema = new mongoose.Schema({
  deliveryOption: {
    method: {
      type: Number,
      enum: deliveryOptionEnum,
      default: 1,
      required: true,
    },
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
  total: { type: String, required: true },
  formPayment: {
    method: { type: Number, enum: paymentMethodsEnum, required: true },
    details: { type: String, required: false },
  },
  status: { type: Number, enum: orderStatusEnum, default: 1 },
  createdIn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);

class OrderModel {
  constructor() {
    this.Order = mongoose.model("Order", orderSchema);
  }

  async getAll() {
    return await this.Order.find();
  }

  async getById(id) {
    return await this.Order.findOne(id);
  }

  async create(data) {
    const order = new this.Order(data);
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
