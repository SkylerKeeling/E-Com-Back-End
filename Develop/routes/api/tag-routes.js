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

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: req.params.id,
  })
})

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: req.params.id
      .then(data => res.status(200).json(data))
      .then(err => res.status(400).json(err)),
  })
})

module.exports = router
