import mongoose from 'mongoose';
import { Types } from 'mongoose';
import mongooseLong from 'mongoose-long';

// 注册 mongoose-long 插件
mongooseLong(mongoose);

// 通过 `Types.Long` 使用 `Long` 类型
const { Long } = Types;

// 定义一个示例的 MongoDB 模型
const TeslaSchema = new mongoose.Schema({
  id: {
    type: Long, // 使用 Long 类型
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
const Tesla = mongoose.models.Tesla || mongoose.model('Tesla', TeslaSchema);

export default Tesla;