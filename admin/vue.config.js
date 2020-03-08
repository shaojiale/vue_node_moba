module.exports = {
  outputDir: __dirname + "/../server/admin_dist",
  publicPath: process.env.NODE_ENV === "production" ? "/admin/" : "/"
};
