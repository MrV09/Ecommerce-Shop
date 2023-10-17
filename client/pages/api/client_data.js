import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ClientData } from "@/models/ClientData";

export default async function handler(req, res){
    await mongooseConnect();
    const {user} = await getServerSession(req, res, authOptions);

    if(req.method === 'PUT'){
        const clientData = await ClientData.findOne({userEmail:user.email});
        if(clientData){
            res.json(await ClientData.findByIdAndUpdate(clientData._id, req.body));
        }else{
            res.json(await ClientData.create({userEmail:user.email, ...req.body}));
        }
    }

    if(req.method === 'GET'){
        const clientData = await ClientData.findOne({userEmail:user.email});
        res.json(clientData);
    }
}