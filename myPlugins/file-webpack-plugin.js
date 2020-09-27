class fileWebpackPlugin {
  constructor() {}
  apply(compiler) {
    compiler.hooks.emit.tapAsync("fileWebpackPlugin", (compilation, cb) => {
      const files = Object.keys(compilation.assets);
      let info = `
      文件数量：${files.length},
      文件名称：
        `;
      files.forEach((file) => {
        info += `${file}
        `;
      });
      compilation.assets["info.txt"] = {
        source: function () {
          return info;
        },
        size: function () {
          return 1024;
        },
      };
      cb();
    });
  }
}
module.exports = fileWebpackPlugin;
