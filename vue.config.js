module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: "localhost"
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};

// module.exports = {
//   devServer: {
//     proxy: {
//       '/api': "https://assignment3-2hilla-shahar.herokuapp.com",
//         ws: true,
//         changeOrigin: true
      
//     }
//   }
// }
