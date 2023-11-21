const express = require("express");
const {open} = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const app = express();
const DBPath = path.join(__dirname, "goodreads.db")

let db = null;

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: DBPath,
            driver: sqlite3.Database
        });
        app.listen(3000, () => {
            console.log("The server is running at https://localhost.3000/")
        });
    } catch (e) {
        console.log(`Error Message : ${e.message}`);
        process.exit(1);
    }
};


initializeDBAndServer();

app.get("/books/", async (request, response) => {
    const getBooksQuery = `
        SELECT * FROM book ORDER BY book.book_id;
    `;

    const booksArray = await db.all(getBooksQuery);
    response.send(booksArray);
});