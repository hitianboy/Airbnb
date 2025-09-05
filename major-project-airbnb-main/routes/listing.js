const express = require("express");
const router = express.Router(); 
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn} = require("../middleware.js");
const review = require("../models/review.js");
const listingController  = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudconfig.js");
const upload = multer({ storage });

// Middleware: Validate listing before save/update
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
}; 

//index and create route combined from router route 
router
 .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
     validateListing,
    wrapAsync(listingController.createListing)
  )
 
  // NEW Route - Show form to create new listing
router.get("/new", isLoggedIn, listingController.renderNewForm );

// show route , delete and update route combined
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete( 
  isLoggedIn,
  wrapAsync(listingController.deleteListing)
);

// EDIT Route - Show form to edit listing
router.get("/:id/edit", 
  isLoggedIn,
  wrapAsync(listingController.renderEditForm)
);




module.exports = router;
