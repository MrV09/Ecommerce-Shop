import mongoose, { Schema, model, models } from "mongoose";

const ClientDataSchema = new Schema({
    userEmail: {type: String, unique: true, required: true},
    name: String,
    email: String,
    phone: String,
    city: String,
    address: String,
    postCode: String,
});

export const ClientData = models?.ClientData || model('ClientData', ClientDataSchema);