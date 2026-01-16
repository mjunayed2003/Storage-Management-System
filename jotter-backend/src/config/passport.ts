import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { UserModel } from "../modules/user/user.model";
import FoldersModel from "../modules/folder/folder.model"; 
import { hashTextGeneration } from "../utils/hashGenerator"; 

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const photo = profile.photos?.[0].value;

        if (!email) {
          return done(new Error("No email found from Google"), undefined);
        }

        let user = await UserModel.findOne({ email });

        if (user) {

          return done(null, user);
        }


        const randomPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await hashTextGeneration(randomPassword);

        user = await UserModel.create({
          userName: profile.displayName,
          email: email,
          password: hashedPassword,
          profilePic: photo,
        });

        await FoldersModel.create({
          userEmail: email,
          folderName: "root",
        });

        return done(null, user);
      } catch (error) {
        return done(error, undefined);
      }
    }
  )
);


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => done(null, user!));
});