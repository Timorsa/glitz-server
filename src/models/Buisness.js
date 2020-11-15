import { Schema, model } from 'monsgoose';

type Address = {
    street: String,
    city: String,
    number: Number
}

const schema = {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        number: Number
    },
    location: {


    }



}