import passport from 'passport'
import { Strategy, ExtractJwt, StrategyOptionsWithoutRequest } from 'passport-jwt'
import { JWT_SECRET } from '../constants/jwt_secret.js'
import { UserService, userService } from '../services/user.service.js'






export class PassportService {
    private options: StrategyOptionsWithoutRequest = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || JWT_SECRET,
    }

    constructor(private userService: UserService){}


    init() {
        passport.use(new Strategy(this.options, async (jwt_payload, done) => {
            try{
                const user = await this.userService.getOne(jwt_payload.id)
                if(user) return done(null, user)
                return done(null, false)
            }
            catch(err){
                done(err, false)
            }
        }))
    }
}

export const passportService = new PassportService(userService)


