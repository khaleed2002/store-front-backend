import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import userRoute from './handlers/user';
import productRoute,{categoryRoute} from './handlers/product';
const app:express.Application=express();
const port:number =3000;
app.use(bodyParser.json())

app.get('/',function(req:Request,res:Response){
    res.send('Hello World');
});
app.use('/products',categoryRoute);
userRoute(app);
productRoute(app);
app.listen(port,()=>{
    console.log(`server start on localhost:${port}`);
});
