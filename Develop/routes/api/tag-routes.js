const router = require("express").Router()
const {Tag, Product, ProductTag} = require("../../models")

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{model: Product, through: ProductTag}],
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
})

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {id: req.params.id},
    include: [ProductTag],
  })
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
})

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).json(err))
})

router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    if (!tagData[0]) {
      res.status(400).json({message: "Tag not found"})
      return
    }
    res.status(200).json(tagData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!tagData) {
      res.status(400).json({message: "No tag"})
      return
    }
    res.status(200).json(tagData)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router
