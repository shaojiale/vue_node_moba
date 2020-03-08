module.exports = {
  outputDir: __dirname + "/../server/web_dist",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/"
};
