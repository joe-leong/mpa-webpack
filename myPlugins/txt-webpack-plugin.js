class txtWebpackPlugin {
  constructor(options) {
    // console.log(options);
  }
  //webpack 调用插件时会触发apply钩子函数
  apply(compiler) {
    compiler.hooks.emit.tapAsync("txtWebpackPlugin", (compilation, cb) => {
      compilation.assets["text.txt"] = {
        source: function () {
          return "hello ";
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
  }
}

module.exports = txtWebpackPlugin;
