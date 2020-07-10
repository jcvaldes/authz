import express from 'express';
import RolesController from './controller';
import auth from '../../middlewares/authentication'

const app = express();

app.get('/', auth.verifyToken, RolesController.Fetch);
app.get('/:id', auth.verifyToken, RolesController.FetchOne);
app.post('/', auth.verifyToken, RolesController.Create);
app.put('/:id', auth.verifyToken, RolesController.Update);
app.delete('/:id', auth.verifyToken, RolesController.Delete);

export default app;