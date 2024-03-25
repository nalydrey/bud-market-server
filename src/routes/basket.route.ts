import { Router } from 'express'
import { validateAndTransform } from '../middlewares/validator.js'
import { CreateOrderItemDto } from '../dto/order-item/create-order-item.dto.js'
import passport from 'passport'
import { basketController } from '../controllers/basket.controller.js'
import { ParamsDto } from '../dto/params/brand-params.dto.js'
import { alreadyExist } from '../middlewares/alreadyExist.js'
import { OrderItem } from '../entity/order-item.entity.js'

export const basketRouter = Router()

basketRouter.post('/',
    passport.authenticate('jwt', {session: false}),
    validateAndTransform(CreateOrderItemDto),
    basketController.alreadyExist.bind(basketController),
    basketController.addItem.bind(basketController)
)

basketRouter.get('/user',
    passport.authenticate('jwt', {session: false}),
    basketController.getBasket.bind(basketController)
)

basketRouter.put('/incr/:id',
    passport.authenticate('jwt', {session: false}),
    validateAndTransform(ParamsDto, 'params'),
    alreadyExist(OrderItem, 'id', {from: 'params', dir: true}),
    basketController.incrQty.bind(basketController)
)

basketRouter.put('/decr/:id',
    passport.authenticate('jwt', {session: false}),
    validateAndTransform(ParamsDto, 'params'),
    alreadyExist(OrderItem, 'id', {from: 'params', dir: true}),
    basketController.decrQty.bind(basketController)
)

basketRouter.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    validateAndTransform(ParamsDto, 'params'),
    alreadyExist(OrderItem, 'id', {from: 'params', dir: true}),
    basketController.deleteItem.bind(basketController)
)

