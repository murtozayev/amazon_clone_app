import e, { response } from "express";
import { checkAuth, continueWithGoogle, signIn, signOut, signUp, verifyCode } from "../controller/auth.controller.ts";
const auth = e.Router()
import passport from "passport"
import "../../../plugins/passport.ts"

auth.use(passport.initialize())

auth.post("/sign-up", signUp)
auth.post("/sign-in", signIn)
auth.post("/verify", verifyCode)
auth.post("/sign-out", signOut)
auth.get("/check", checkAuth)
auth.get("/google", passport.authenticate("google", { scope: ["profile", 'email'], session: false }))
auth.get("/google/callback",
    passport.authenticate("google", { failureRedirect: "sign-in", session: false }), continueWithGoogle
)

export default auth