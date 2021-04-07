import * as dotenv from 'dotenv';
import * as express from 'express';
import { Request, Response } from 'express';
import { createConnection } from 'typeorm';
import { Car } from './entity/Car';
import { Gender, User } from './entity/User';

//Load env vars
dotenv.config();

// constants
const PORT = process.env.PORT || 3000;

//create typeorm connection
createConnection().then((connection) => {
    //connection.runMigrations(); //Uncomment to run migrations every time server starts up
    const userRepo = connection.getRepository(User);
    const carRepo = connection.getRepository(Car);

    // create and setup express app
    const app = express();
    app.use(express.json());

    // register routes

    // GET: All users
    app.get('/users', async function (req: Request, res: Response) {
        const users = await userRepo.find();

        res.json(users);
    });

    // GET: Single user by ID
    app.get('/users/:id', async function (req: Request, res: Response) {
        const results = await userRepo.findOne(req.params.id, {
            loadEagerRelations: true
        });

        return res.send(results);
    });

    // POST: Create new user (TODO: validation of input/request.body)
    app.post('/users', async function (req: Request, res: Response) {
        const user = await userRepo.create(req.body);

        const results = await userRepo.save(user);

        return res.send(results);
    });

    // PUT: Update user by ID
    app.put('/users/:id', async function (req: Request, res: Response) {
        const user = await userRepo.findOne(req.params.id);

        userRepo.merge(user, req.body);
        const results = await userRepo.save(user);

        return res.send(results);
    });

    //POST: Add car to user
    app.post(
        '/users/:id/add_car',
        async function (req: Request, res: Response) {
            const user = await userRepo.findOne(req.params.id);

            const car = req.body as Car;
            car.user = user; //Set appropriate user to link to

            const results = await carRepo.save(car);

            return res.send(results);
        }
    );

    app.delete('/users/:id', async function (req: Request, res: Response) {
        const results = await userRepo.delete(req.params.id);
        return res.send(results);
    });

    // start express server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
