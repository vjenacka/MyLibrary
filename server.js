const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT=process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
