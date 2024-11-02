const orderModel = require("../models/orderModel");

class OrderController {
  async getOrders(req, res) {
    try {
      const orders = await orderModel.getAll();
      res.send(orders);
    } catch (error) {
      res.status(500).send("Erro ao buscar os itens.");
    }
  }

  async createOrder(req, res) {
    try {
      const Order = await orderModel.create(req.body);
      res.send(Order);
    } catch (error) {
      res.status(500).send("Erro ao criar o Pedido.");
    }
  }

  async getOrderById(req, res) {
    try {
      const order = await orderModel.getById(req.params.id);
      res.send(order);
    } catch (error) {
      res.status(500).send("Erro ao buscar Pedido.");
    }
  }

  async updateOrder(req, res) {
    try {
      const updatedOrder = await orderModel.update(req.params.id, req.body);
      res.send(`${updatedOrder.name} atualizado com sucesso.`);
    } catch (error) {
      res.status(500).send("Erro ao atualizar o Pedido.");
    }
  }

  async deleteOrder(req, res) {
    try {
      const deletedOrder = await orderModel.delete(req.params.id);
      res.send(`${deletedOrder.name} excluído com sucesso.`);
    } catch (error) {
      res.status(500).send("Erro ao excluir o usuário.");
    }
  }
}

module.exports = new OrderController();
