const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema({
    line_items:Object,
    name:String,
    phone:String,
    email:String,
    city:String,
    address:String,
    postCode:String,
    paid:Boolean,
});

export const Order = models?.Order || model('Order', OrderSchema);