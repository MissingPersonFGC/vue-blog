"use strict";

// Imports and defs
const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const router = express();

// Middleware
const { URL, PORT } = require("./utils/constants");
const middleWare = require("./middleware");
const { applyMiddleware } = require("./utils");

applyMiddleware(middleWare, router);

// Routes
const { router: userRouter } = require("./routes/users/userRoutes");
const { router: postRouter } = require("./routes/posts/postRoutes");
const { router: commentRouter } = require("./routes/comments/commentRoutes");

router.use("/api/users", userRouter);
router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);

// Setup server
const server = http.createServer(router);

// Connect to MongoDB
mongoose
  .connect(URL, { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
