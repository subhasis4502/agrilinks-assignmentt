const Comodity = require("../models/Commodity");
const router = require("express").Router();

//get a comodity
router.get("/reports/:id", async (req, res) => {
  const comodityId = req.params.id;
  try {
    const comodity = await Comodity.find({ cmdtyID: comodityId });
    res.status(200).json(comodity);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Send a create report request
router.post("/reports", async (req, res) => {
  try {
    const comodity = await Comodity.findOne({
      cmdtyID: req.body.cmdtyID,
      marketID: req.body.marketID,
    });

    // If comodity present
    if (comodity) {
      // Calculating price per kg
      let priceMinKg = req.body.minPrice / req.body.convFctr;
      let priceMaxKg = req.body.maxPrice / req.body.convFctr;
      // Averaging the result
      await comodity.updateOne({
        minPrice: (comodity.minPrice + priceMinKg) / 2,
        maxPrice: (comodity.maxPrice + priceMaxKg) / 2,
      });
      // Adding the users
      if (!comodity.users.includes(req.body.userID)) {
        await comodity.updateOne({
          $push: { users: req.body.userID },
        });
      }
      res.status(200).json({
        status: "success",
        reportId: comodity._id,
      });
    } else {
      // For new comodity
      const newComodity = new Comodity({
        cmdtyID: req.body.cmdtyID,
        marketID: req.body.marketID,
        marketName: req.body.marketName,
        cmdtyName: req.body.cmdtyName,
        priceUni: "Kg",
        users: req.body.userID,
        minPrice: req.body.minPrice / req.body.convFctr,
        maxPrice: req.body.maxPrice / req.body.convFctr,
      });
      // Saving the comodity
      savedComodity = await newComodity.save();
      res.status(200).json({
        status: "success",
        reportId: savedComodity._id,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
