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

exports.getUnverifiedVendors = async (req, res) => {
  try {
    const vendors = await Vendor.findAll({
      where: { status: "Unverified" }
    });

    res.json(vendors);
  } catch (error) {
    console.error("Error fetching unverified vendors:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.approveVendor = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await Vendor.findByPk(id);
    if (!vendor) return res.status(404).json({ error: "Vendor not found" });

    vendor.status = "Verified";
    await vendor.save();

    res.json({ message: "Vendor approved", vendor });
  } catch (error) {
    console.error("Error approving vendor:", error);
    res.status(500).json({ error: "Server error" });
  }
};
