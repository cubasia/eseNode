import { Router } from "express";
import { nextTick } from "process";
import { passport } from "../middleware/authentication/passport";

const router = Router();

 router.get("/failure", (req, res, next) => {
  
   res.status(200).send("Tutto Nok")
 });


router.get("/login", (req, res, next) => {
  // if (typeof req.query.redirectTo !== "string" || !req.query.redirectTo) {
  //   res.status(400);
  //   return next("Missing redirectTo query string parameter");
  // }
  //console.log(req.query.redirectTo);
  
  //req.session.redirectTo = req.query.redirectTo;
  req.session.redirectTo = "http://localhost:8080/add";

  res.redirect("/github/login");
});

router.get(
  "/github/login",
  // (req,res,next) => {
  //    console.log("sonoqui")
  //    next()
  //  },
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/login/github/authorized",
  // (req,res,next) => {
  //   console.log("sonoqui")
  //   next()
  // },
  //@ts-ignore
  passport.authenticate("github", {
    failureRedirect: "/failure",
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
