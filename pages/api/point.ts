import clientPromise from "../../src/service/mongo";
var ObjectID = require('mongodb').ObjectID;

export default async function handler(req: any, res: any) {
    const client = await clientPromise;
    const db = client.db("open-cem");
    switch (req.method) {
        case "POST":
            var { name, description, type, lat, lng } = JSON.parse(req.body).values;
            var myPost = await db.collection("points").insertOne({ name, description, type, lat, lng, createdAt: new Date() });
            if (myPost) {
                res.status(200).json()
            } else {
                res.status(500).json({ error: "Point not create" })
            }
            break;
        case "PUT":
            var { name, description, type, id } = JSON.parse(req.body);
            var myPost = await db.collection("points").updateOne({ _id: ObjectID(id) }, { $set: { name, description, type } })
            if (myPost) {
                res.status(200).json()
            } else {
                res.status(500).json({ error: "Point not update" })
            }
            break;
        case "DELETE":
            var { id } = JSON.parse(req.body);
            var myPost = await db.collection("points").deleteOne({ _id: ObjectID(id) })
            if (myPost) {
                res.status(200).json()
            } else {
                res.status(500).json({ error: "Point not delete" })
            }
            break;
        case "GET":
            const allPoint = await db.collection("points").find({}).toArray();
            res.json({ status: 200, data: allPoint });
            break;
    }
}
