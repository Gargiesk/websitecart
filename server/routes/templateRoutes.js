import express from "express";
import Template from "../models/Template.js";
import upload from "../middleware/upload.js";


const router = express.Router();

// GET templates with search, filters & pagination
router.get("/", async (req, res) => {
  const {
    type,
    style,
    minPrice,
    maxPrice,
    search,
    page = 1,
    limit = 6
  } = req.query;

  let filter = {};

  if (type) filter.type = type;
  if (style) filter.style = style;

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const total = await Template.countDocuments(filter);
  const data = await Template.find(filter)
    .skip(skip)
    .limit(Number(limit));

  res.json({
    templates: data,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit)
  });
});



// GET single template
router.get("/:id", async (req, res) => {
  const data = await Template.findById(req.params.id);
  if (!data) {
    return res.status(404).json({ message: "Template not found" });
  }
  res.json({ template: data });
});

// ADD new template
router.post("/", upload.single("image"), async (req, res) => {
  const t = new Template({
    ...req.body,
    image: req.file ? req.file.filename : ""
  });
  await t.save();
  res.json({ message: "Template Added" });
});

// UPDATE template
router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = {
    ...req.body
  };

  if (req.file) {
    updateData.image = req.file.filename;
  }

  await Template.findByIdAndUpdate(req.params.id, updateData);
  res.json({ message: "Template Updated" });
});

// DELETE template
router.delete("/:id", async (req, res) => {
  await Template.findByIdAndDelete(req.params.id);
  res.json({ message: "Template Deleted" });
});

export default router;
