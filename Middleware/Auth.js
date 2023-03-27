const IsLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies ) {
    } else {
      res.redirect("/");
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
};

const IsLoggedOut = async (req, res, next) => {
  try {
    if (req.user) {
      res.redirect("/home");
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  IsLoggedIn,
  IsLoggedOut,
};
