import "reflect-metadata";
import * as dotenv from 'dotenv';
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import * as expressJwt from "express-jwt";
import { buildSchema } from "type-graphql";
import * as mongoose from 'mongoose';

import {Files} from './models'

import resolvers from './resolvers/index';
import {graphqlUploadExpress} from "graphql-upload";

import { Context } from "./types/MyContext";
import { authChecker } from "./middleware/auth-checker";

import {upload} from './utils/uploader'

dotenv.config();

(async () => {
  const schema = await buildSchema({ resolvers,authChecker, authMode: "null"});
  const app = Express();

  app.use(
    expressJwt({
      secret: "super_secret",
      algorithms: ["HS256"],
      credentialsRequired: false
    })
  );

  app.post('/api/uploadFile', upload.single('myFile'), async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      res.sendStatus(400);
      return next(error)
    }
    try {
      const newFile=await Files.create({
        name: file.filename
      });
      res.status(200).json({
        status: "success",
        message: "File created successfully!!",
        file: newFile
      });
    } catch (error) {
      res.json({
        error,
      });
    }  
    
  })

  // this is a simple route to make sure everything is working properly
app.get('/', (req: Express.Request, res: Express.Response) => {
  console.log(req);
  res.status(200).send(`Server up and running!`)
});

  app.get("/api/getFiles", async ( res:Express.Response) => {
    try {
      const files = await Files.find()                                                                                                                                                                                                                                                                                                                                                                                                          ;
      res.status(200).json({
        status: "success",
        files,
      });
    } catch (error) {
      res.json({
        status: "Fail",
        error,
      });
    }
  });
 

  // Create a GraphQL server
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => {  
      const ctx: Context  = {
        user: req.user || null // `req.user` comes from `express-jwt`
      };
     
      return ctx ;
    },
    uploads: false
  });
  app.use(graphqlUploadExpress());
  apolloServer.applyMiddleware({ app })

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  })

  const dbUrl = `mongodb+srv://developer:${process.env.DB_PASSWORD}@cluster0.stwdi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => {
    console.log("DB connected successfully");
  });;
})()