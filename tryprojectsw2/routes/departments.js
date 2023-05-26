import { Router } from "express";
import department from '../models/department.js'
import { index, create, store, show, editDept, update, deleteOne } from "../controllers/department.js";

import { edit } from "../controllers/subject.js";

const router = new Router();

router.get('/', index);

router.get('/create', create);

router.post('/', store);

router.get('/:_id', show);

router.get('/:id/edit',editDept);

router.get('/createDept', async(req, res) => {
    await department.create({
        name: 'Information System',
        code: 'IS'
    });
    res.send('All is Done');
});
router.put('/:id',update);
router.delete('/:id',deleteOne)
export default router;