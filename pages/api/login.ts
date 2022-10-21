import bcrypt from "bcryptjs";
import clientPromise from "../../src/service/mongo";

export default async function handler(req: any, res: any) {
    const client = await clientPromise;
    const db = client.db("open-cem");
    switch (req.method) {
        case "POST":
            var bodyObject = JSON.parse(req.body);
            var findUser = await db.collection("users").findOne({ email: bodyObject.email })
            if (!findUser) {
                res.status(401).json({ error: "Unauthorized" })
            } else if (findUser.email && (!findUser.password || findUser.password === "")) {
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(bodyObject.password, salt);
                await db.collection("users").update({ email: bodyObject.email }, {
                    $set: {
                        password: hashPassword
                    }
                })
                var findUser = await db.collection("users").findOne({ email: bodyObject.email })
                res.json({ id: findUser._id, name: findUser.name, email: findUser.email, role: findUser.role, access: findUser.access })
            } else if (await bcrypt.compare(bodyObject.password, findUser.password)) {
                res.json({ id: findUser._id, name: findUser.name, email: findUser.email, role: findUser.role, access: findUser.access })
            } else {
                res.status(400).json({ error: "Bad password" })
            }
            break;
    }
}