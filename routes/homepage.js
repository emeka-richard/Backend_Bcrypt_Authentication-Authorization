const express =  require('express');
const homePageRouter = express.Router();

homePageRouter.get('/', (req, res)=>{
    res.status(200).json({
        name: 'Ebuka'
    })
})

module.exports = homePageRouter;