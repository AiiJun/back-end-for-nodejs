//1. 安装 mongoose
//2. 导入 mongoose
const mongoose = require("mongoose");

//设置 strictQuery 为 true
mongoose.set("strictQuery", true);

//3. 连接 mongodb 服务                        数据库的名称
mongoose.connect("mongodb://192.168.88.128:27017/mongo");

//4. 设置回调
// 设置连接成功的回调  once 一次   事件回调函数只执行一次
mongoose.connection.once("open", () => {
  //5. 创建文档的结构对象
  //设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    is_hot: Boolean,
  });

  //6. 创建模型对象  对文档操作的封装对象   mongoose 会使用集合名称的复数,创建集合
  let BookModel = mongoose.model("novel", BookSchema);

  //7.设置字段 字段筛选.select({ name: 1, author: 1, _id: 0 })  1为选中   0为不选中
  //   BookModel.find()
  //     .select({ name: 1, author: 1, _id: 0 })
  //     .exec((err, data) => {
  //       if (err) {
  //         console.log("读取失败");
  //         return;
  //       }
  //       console.log(data);
  //     });

  //数据排序.sort({ price: -1 })  正序值为1  倒序值为-1
  //   BookModel.find()
  //     .sort({ price: -1 })
  //     .select({ name: 1, price: 1, _id: 0 })
  //     .exec((err, data) => {
  //       if (err) {
  //         console.log("读取失败");
  //         return;
  //       }
  //       console.log(data);
  //     });

  //数据的截取.limit()   过滤数据(从前往后的).skip() 常用于分页
  BookModel.find()
    .sort({ price: 1 })
    .skip(3)
    .limit(3)
    .select({ name: 1, price: 1, _id: 0 })
    .exec((err, data) => {
      if (err) {
        console.log("读取失败");
        return;
      }
      console.log(data);
    });
});

// 设置连接错误的回调
mongoose.connection.on("error", () => {
  console.log("连接失败");
});

//设置连接关闭的回调
mongoose.connection.on("close", () => {
  console.log("连接关闭");
});
