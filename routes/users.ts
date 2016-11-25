///<reference path="../typings/express/express.d.ts"/>
import * as express from "express";
import Request = express.Request;
import Response = express.Response;
import NextFunction = express.NextFunction;


let router = express.Router();


/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
	res.send('respond with a users resource');
});

export = router;