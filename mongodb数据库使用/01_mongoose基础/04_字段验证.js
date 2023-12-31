//1.安装 mongoose
//2.导入 mongoose
const mongoose = require("mongoose");

//设置 strictQuery 为 true
mongoose.set("strictQuery", true);

//3.链接 mongodb 服务
mongoose.connect("mongodb://192.168.88.128:27017/mongo");

//4.设置回调
//设置链接成功的回调    事件回调函数只执行一次
mongoose.connection.once("open", () => {
  //   console.log("链接成功");
  //5.创建文档的结构对象
  //设置集合中文档的属性以及属性值的类型
  let BookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, //表明该属性必须不为空  必填项
      unique: true, //设置为独一无二
    },
    author: {
      type: String,
      default: "匿名", //设置值的时候没有值,默认为default  默认值
    },
    //类型
    style: {
      type: String,
      enum: ["言情", "城市", "志怪", "恐怖"],
    },
    price: Number,
  });

  //6.创建模型对象  对文档操作的封装对象
  let BookModel = mongoose.model("books", BookSchema);

  //7.新增
  BookModel.create(
    {
      name: "西游记",
      author: "吴承恩",
      price: 19.9,
      style: "志怪",
    },
    (err, data) => {
      //判断是否有错误
      if (err) {
        console.log(err);
        // console.log("插入失败");
        mongoose.disconnect();
        return;
      }
      //如果没有出错,则输出插入后的文档对象
      console.log(data);
      //8.关闭数据库链接(项目运行过程中,不会添加该代码)
      mongoose.disconnect();
    }
  );
});
//设置链接失败的回调
mongoose.connection.on("error", () => {
  console.log("链接失败");
});
//设置链接关闭的回调
mongoose.connection.on("close", () => {
  console.log("链接关闭");
});

//关闭mongodb的链接
// setTimeout(() => {
//   mongoose.disconnect();
// }, 2000);
