// Import Module dan Template Engine
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const port = 3000;

// Konfigurasi express-handlebars
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: "src/views/layouts",
    partialsDir: "src/views/partials",
  }),
);
app.set("view engine", "hbs");
app.set("views", "src/views"); //Lokasi Views ada di (project)/src/views

app.use(express.static("public")); //Folder Publik bisa di Akses di Web

app.get(["/", "/home"], (req, res) => {
  res.render("home", {
    title: "Home",
    scriptFile: "/js/home.js",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact",
  });
});

app.get("/projects", (req, res) => {
  res.render("projects", {
    title: "Projects",
    scriptFile: "/js/projects.js",
  });
});

// Run node index.js
app.listen(port, () => {
  console.log(`Server Nyala: http://localhost:${port}`);
});
