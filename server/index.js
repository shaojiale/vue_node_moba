const express = require("express");
const app = express();

app.set("secret", "hahahhahhahaha");
app.use(require("cors")());
app.use(express.json());
app.use("/admin/", express.static(__dirname + "/admin_dist"));
app.use("/", express.static(__dirname + "/web_dist"));
app.use("/uploads", express.static(__dirname + "/uploads"));

require("./plugins/db")(app);
require("./routes/admin/index")(app);
require("./routes/web")(app);

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
