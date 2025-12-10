//controllers/vendorController.js
const { Vendor, VendorCategory } = require("../models");

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      include: [
        {
          model: VendorCategory,
          as: "category",
          attributes: ["name"],
        },
      ],
    });

    const result = vendors.map((v) => ({
      ...v.toJSON(),
      category_name: v.category?.name || null,
    }));

    res.json(result);
  } catch (err) {
    console.error("Error fetching vendors:", err);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
};

exports.createVendor = async (req, res) => {
  const { name, category_id, address, phone, email, status } = req.body;
  try {
    const newVendor = await Vendor.create({
      name,
      category_id,
      address,
      phone,
      email,
      status,
    });
    res.json(newVendor);
  } catch (err) {
    console.error("Error creating vendor:", err);
    res.status(500).json({ error: "Failed to create vendor" });
  }
};
