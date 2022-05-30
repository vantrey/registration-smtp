import {Request, Response, Router} from 'express'

export const bloggersRouter = Router({})

bloggersRouter.get('/', (req: Request, res: Response) => {

    res.sendStatus(200)
})