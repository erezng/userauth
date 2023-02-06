import mongoose from "mongoose";
import dbConfig from "../db/config/db.config.js";
import { Role } from "../models/role.js";
const { HOST, DB, PORT, ROLES } = dbConfig;
const connect = async () => {
  await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`);
  console.log(`Succesfully connected to the database ${DB}`);
  initDB();
};
const initDB = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ROLES.map((s) => new Role({ name: s })).forEach((role) => {
        role.save((err) => {
          if (err) console.log(err);
          else console.log("added", role.name, "to the collectiin");
        });
      });
    }
  });
};
export { connect };
