import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

import { DatabaseException } from "../exceptions/database.exception";


sqlite3.verbose();

const dbPath = path.resolve('data/app.sqlite');
const dir = path.dirname(dbPath);

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


export const database = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        throw new DatabaseException(err.message);
    } else {
        console.log('Database opened successfully');
    }
});