import mongoose from 'mongoose';


// 定义一个示例的 MongoDB 模型
const TeslaSchema = new mongoose.Schema({
  id: {
    type: Number, // 使用 Long 类型
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  source: {
    type: String,
    required: false,
  },
  score: {
    type: Number,
    required: true,
  },
  analyse: {
    type: String,
    required: false,
  },
}, { collection: 'tesla' }); // 明确指定集合名称为 'tesla'

// 选择集合
console.log(mongoose.models); // Check if Tesla is already registered
console.log('------------------------')
const Tesla = mongoose.model('Tesla', TeslaSchema);
export default Tesla;