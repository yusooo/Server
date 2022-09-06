// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth2');

// const User = require('../models/user');

// module.exports = () => {
//     passport.use(new googleStrategy({
//         clientID : process.env.GOOGLE_ID,
//         clientSecret : process.env.GOOGLE_SECRET,
//         callbackURL: '/auth/google/callback',
//     }, async (accessToken, refreshToken, profile, done => {
//         console.log('google profile', profile);
//         try{
//             const exUser = await User.findOne({
//                 where: { snsId : profile.id, provider: 'google'},
//             });
//             if(exUser) {
//                 done(null, exUser);
//             } else {
//                 const newUser = await User.create({
//                     email: profile._json && profile._json.google_account_email,
//                     nick: profile.displayName,
//                     snsId: profile.id,
//                     provider: 'google',
//                 });
//                 done(null, newUser);
//             }
//         } catch(error){
//             console.error(error);
//             done(error);
//         }
//     })));
// };