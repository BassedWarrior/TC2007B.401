const { MongoClient } = require("mongodb");

async function insertAdmin() {
    const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI if different
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("SandersDB");
        const adminsCollection = db.collection("admins");

        const result = await adminsCollection.insertOne({
            usuario: "admin",
            contrasena:
                "$2a$10$bnk1oFQH6hPwwLgXtrnmze6HkPfY0nfn/GAtwVV52nX7sYm17Rbpe",
            correo: "admin@admin.gmail.com",
            nombre: "admin",
            rol: "administrador",
        });

        console.log("Admin inserted with id:", result.insertedId);
    } catch (error) {
        console.error("Error inserting admin:", error);
    } finally {
        await client.close();
    }
}

insertAdmin();
