import express, { Router } from "express";
import { usersRouter } from "./users.router";

const router: Router = express.Router();
router.use("/users", usersRouter);

/*
  Here we can add addition endpoints to our root application router.

  For example, if we wanted accounts endpoint, we would
  create an accounts.router.ts similar to how we created
  our users.router.ts and map it to '/accounts'.

  router.use('/accounts', accountsRouter);
*/

export const appRouter: Router = router;
