const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    category: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        difficult: { type: Number },
        skill: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String }
    }],
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],
    usagetips: { type: String },
    battletips: { type: String },
    teamtips: { type: String },
    partners: [{
        hreo: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String }
    }]

})

module.exports = mongoose.model('Hero', schema)