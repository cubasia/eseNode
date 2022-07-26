import { Router } from "express";
import { passport } from "../middleware/authentication/passport";

const router = Router();

// router.get("/", (req, res, next) => {
  
//   res.status(200).send("Tutto ok")
// });


router.get("/login", (req, res, next) => {
  if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
    res.status(400);
    return next("Missing redirectTo query string parameter");
  }

  req.session.redirectTo = req.query.redirectTo;

  res.redirect("/github/login");
});

router.get(
  "/github/login",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github/callback",
  //@ts-ignore
  passport.authenticate("github", {
    failureRedirect: "/login",
    keepSessionInfo: true,
  }),
  (req, res) => {
    if (typeof req.query.redirectTo !== "string") {
      return res.status(500).end();
    }

    res.redirect(req.session.redirectTo as string);
  }
);

router.get("/logout", (req, res, next) => {
  if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
    res.status(400);
    return next("Missing redirectTo query string parameter");
  }

  const redirectUrl = req.query.redirectTo;

  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect(redirectUrl);
  });
});

export default router;
