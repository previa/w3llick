import express from "express";
import { COOKIE_NAME, __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ShowResolver } from "./resolvers/show";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import { Show } from "./entities/Show";
import { User } from "./entities/User";
import path from "path";
import { Episode } from "./entities/Episode";
import { EpisodeResolver } from "./resolvers/episodes";

// rerun
const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "w3llickdb",
    username: "postgres",
    password: "postgres",
    logging: true,
    synchronize: true,
    entities: [Show, User, Episode],
    migrations: [path.join(__dirname, "./migrations/*")],
  });

  await conn.runMigrations();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  console.log(__dirname);

  app.get("/images/:id/poster", async (req, res) => {
    const show = await Show.findOne(req.params.id);
    if (show && !show.posterPath) {
      res.sendFile(path.join(__dirname, "images", "default.png"));
    } else {
      res.sendFile(
        path.join(
          __dirname,
          "images",
          req.params.id,
          show?.posterPath as string
        )
      );
    }
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: __prod__, // cookie only works in https
        sameSite: "lax", // csrf
      },
      saveUninitialized: false,
      secret: "qweqwasdfjkjaflw",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ShowResolver, UserResolver, EpisodeResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(9091, () => {
    console.log("server started on localhost:9091");
  });
};

main();
