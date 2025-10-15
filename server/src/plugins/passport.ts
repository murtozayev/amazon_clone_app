import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import AUTH from "../models/user.model.ts";
import dotenv from "dotenv"

dotenv.config()

passport.use(new GoogleStrategy({
    clientID: process.env.GCID as string,
    clientSecret: process.env.CS as string,
    callbackURL: process.env.GCBC as string
}, async (_, __, profile, done) => {
    const email = profile.emails?.[0]?.value
    if (!email) {
        return done(new Error("No email"))
    }

    let user = await AUTH.findOne({ email })

    if (!user) {
        user = await AUTH.create({ username: profile.displayName, email, password: "" })
    }

    done(null, user)
}))