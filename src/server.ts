import express , {Request , Response, ErrorRequestHandler ,NextFunction} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import apiRoutes from './routes/api'
import cors from 'cors';
import { MulterError } from 'multer';

dotenv.config();

const server = express();

server.use(cors({origin:true,credentials: true}));

server.use(function (req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  if (req.method === "OPTIONS") {
      return res.status(200).end();
  } else {
      next();
  }
});

server.use('/public', express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended : true}));
server.use(express.json());

server.use(apiRoutes);

server.use((req: Request , res: Response) => {
  res.status(404);
  res.json({error: 'endpoint nao encontrado!'});
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400); // Bad Request

  if(err instanceof MulterError){
    res.json({error: err.code})
  } else{
    console.log(err);
    res.json({ error: 'Ocorreu Algum Erro.'});
  }
}
server.use(errorHandler)
 
server.listen(process.env.PORT);
