const { render } = require("ejs")
const express = require("express")

const app = express()

app.set("view engine", "ejs")

app.get("/", function (req, res) {
  const items = [
    {
      name: "Herique Jessus",
      mail: "heriquejessus77@gmail.com"
    },
    {
      name: "Tayná Renata",
      mail: "tainazinha99@gmail.com"
    },
    {
      name: "Maria Olivia",
      mail: "mariaolivia007@otlook.com"
    },
    {
      name: "Lucas Mandel",
      mail: "luquinha_m22@gmail.com"
    }
  ]

  const message = "Lorem ipsum dolor sit amet."

  res.render("pages/index", {
    writers: items,
    message:message
  })
})

app.get("/sobre", function (req, res) {
  res.render("pages/about")
})

app.get("/contato", function (req, res) {
  res.render("pages/contact")
})

app.listen(8080)
console.log("running...")
