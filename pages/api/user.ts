var ObjectID = require('mongodb').ObjectID;
import clientPromise from "../../src/service/mongo";

export default async function handler(req: any, res: any) {
    const client = await clientPromise;
    const db = client.db("open-cem");
    switch (req.method) {
        case "POST":
            var bodyObject = JSON.parse(req.body).values;
            var findUser = await db.collection("users").findOne({ email: bodyObject.email })
            if (findUser) {
                res.status(400).json({ error: "All ready exist" })
            } else {
                const insert = await db.collection("users").insertOne({ email: bodyObject.email, name: bodyObject.name, access: bodyObject.access, role: "user" })
                if (insert) {
                    res.status(200).json()
                } else {
                    res.status(400).json({ error: "Cannot create user" })
                }
            }
            break;
        case "GET":
            var allUser = await db.collection("users").find({ role: "user" }).toArray();
            if (!allUser) {
                res.status(400).json({ error: "No user find" })
            } else {
                res.json({ status: 200, data: allUser });
            }
            break;
        case "PUT":
            var { name, email, access, id } = JSON.parse(req.body);
            var myUser = await db.collection("users").updateOne({ _id: ObjectID(id) }, { $set: { name, access, email } })
            if (myUser) {
                res.status(200).json()
            } else {
                res.status(500).json({ error: "Point not update" })
            }
            break;
    }
}
