import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
title: { type: String, required: true },
contentType: { type: String, enum: ['video','text','pdf'], default: 'text' },
contentUrl: { type: String }, // for text or url for video/pdf
contentText: { type: String },
module: { type: mongoose.Schema.Types.ObjectId, ref: 'module' }
});

const LessonModel = mongoose.models.lesson || mongoose.model('lesson', lessonSchema)

export default LessonModel