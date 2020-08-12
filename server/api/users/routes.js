import express from 'express';
import UsersController from './controller';
import auth from '../../middlewares/authentication'

const app = express();

app.get('/', auth.verifyToken, UsersController.Fetch);
app.get('/:id', auth.verifyToken, UsersController.FetchOne);
app.post('/', auth.verifyToken, UsersController.Create);
app.put('/:id', auth.verifyToken, UsersController.Update);
app.delete('/:id', auth.verifyToken, UsersController.Delete);

export default app;