import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
title: { type: String, required: true },
course: { type: mongoose.Schema.Types.ObjectId, ref: 'course', required: true },
lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lesson' }]
});
const ModuleModel = mongoose.models.module || mongoose.model('module', moduleSchema)

export default ModuleModel