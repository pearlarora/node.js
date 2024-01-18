export const setLastVisit = (req, res, next) => {
  // 1. If the cookie is set, then add a local variable with last visit time data
  if (req.cookies.lastVisit) {
    // .lastVisit is the name of the cookie that you created
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    // The client and our view will be able to access this res.locals.lastVisit variable and render it on the view
  }

  // Creating the cookie if it doesn't exist (user is accessing the application for the first time)
  // With every visit on the application, this cookie will be updated (as else is not being used this code will run every time)
  res.cookie("lastVisit", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000,
    // After how much time will the cookie expire (in milliseconds)
  });

  next();
};
