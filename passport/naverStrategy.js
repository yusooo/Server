// const passport = require('passport');
// const { Strategy: naverStrategy, Profile: NaverProfile } = require('passport-naver-v2');

// const User = require('../models/user');

// module.exports = () => {
//     passport.use(new naverStrategy({
//         clientID : process.env.NAVER_ID,
//         clientSecret: process.env.NAVER_SECRET,
//         callbackURL: '/auth/naver/callback',
//     }, async (accessToken, refreshToken, profile, done => {
//         console.log('naver profile', profile);
//         try{
//             const exUser = await User.findOne({
//                 where: { snsId : profile.id, provider: 'naver'},
//             });
//             if(exUser) {
//                 done(null, exUser);
//             } else {
//                 const newUser = await User.create({
//                     email: profile.email,
//                     nick: profile.name,
//                     snsId: profile.id,
//                     provider: 'naver',
//                 });
//                 done(null, newUser);
//             }
//         } catch(error){
//             console.error(error);
//             done(error);
//         }
//     })));
// };