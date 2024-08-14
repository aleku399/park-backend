import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Location } from "./entity/Location";
import { Review } from "./entity/Review";
import { Feature } from "./entity/Feature";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "alex",
    password: "alex",
    database: "park",
    synchronize: true,
    logging: false,
    entities: [User, Location, Review, Feature],
    migrations: [],
    subscribers: [],
})
