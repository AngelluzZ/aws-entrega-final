import { Router } from "express";
const router = Router();

// routes
router.get('/', (req, res) =>{
    res.status(405).json({error:'Wrong Request: Method Not Allowed'});
})

router.post('/', (req, res) =>{
    res.status(405).json({error:'Wrong Request: Method Not Allowed'});
})

export default router;