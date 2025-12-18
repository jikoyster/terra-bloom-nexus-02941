// controllers/purchaseOrderController.js

const { PurchaseOrder } = require('../models'); // make sure your model is exported in models/index.js

/**
 * Get all purchase orders
 */
const getAllPurchaseOrders = async (req, res) => {
  try {
    const orders = await PurchaseOrder.findAll();
    console.log("Orders found:", orders);
    res.json(orders);
  } catch (err) {
    console.error("PurchaseOrder fetch error:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};


/**
 * Get purchase orders by farm
 */
const getPurchaseOrdersByFarm = async (req, res) => {
  try {
    const { farmId } = req.params;
    const orders = await PurchaseOrder.findAll({
      where: { farm_id: farmId },
    });
    console.log(`Orders for farm ${farmId}:`, orders);
    res.json(orders);   
  } catch (err) {
    console.error('Error fetching farm purchase orders:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Create a new purchase order
 */
const createPurchaseOrder = async (req, res) => {
  try {
    const { po_id, farm_id, status, details } = req.body;
    const newOrder = await PurchaseOrder.create({
      po_id,
      farm_id,
      status,
      details,
    });
    console.log('Created purchase order:', newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating purchase order:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Update a purchase order
 */
const updatePurchaseOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { po_id, farm_id, status, details } = req.body;

    const order = await PurchaseOrder.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Purchase order not found' });

    await order.update({ po_id, farm_id, status, details });
    console.log('Updated purchase order:', order);
    res.json(order);
  } catch (err) {
    console.error('Error updating purchase order:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Delete a purchase order
 */
const deletePurchaseOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await PurchaseOrder.findByPk(id);
    if (!order) return res.status(404).json({ error: 'Purchase order not found' });

    await order.destroy();
    console.log('Deleted purchase order:', order);
    res.json({ message: 'Purchase order deleted' });
  } catch (err) {
    console.error('Error deleting purchase order:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllPurchaseOrders,
  getPurchaseOrdersByFarm,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
};
