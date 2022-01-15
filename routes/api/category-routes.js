const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((dbCategoryData) => {
      res.json({ data: dbCategoryData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Product,
      },
    ],
  })
    .then((dbCategoryData) => {
      res.json({ data: dbCategoryData });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  /* req.body expects:
    {
      "category_name": "coffee cups"
    }
  */
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  // update category data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(() => res.json(`Category was successfully updated!`))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id },
  })
    .then(() => {
      console.log(
        `Category with ID: ${req.params.id} was successfully deleted!`
      );
      res.json(`Category with ID: ${req.params.id} was successfully deleted!`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
