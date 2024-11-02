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

const orderSchema = new mongoose.Schema({
  customer_name: { type: String, required: true },
  customer_phone: { type: String, required: true },
  customer_address: { type: String, required: true },
  itens: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem", required: true },
  ],
  total: { type: String, required: true },
  formPayment: {
    method: { type: Number, enum: paymentMethodsEnum, required: true }, // Usando números agora
    details: { type: String, required: false }, // Detalhes adicionais, se necessário
  },
  status: { type: Number, enum: orderStatusEnum, default: 1, required: true },
  createdIn: { type: Date, default: Date.now() },
});

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
