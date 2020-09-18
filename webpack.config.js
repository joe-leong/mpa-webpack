const path = require('path')
const fs = require('fs')
const modules = fs.readdirSync(path.resolve(__dirname,'./module'))
const HtmlWebpcKPlugin = require('html-webpack-plugin')
const entries = {}
const htmlPs = []
modules.forEach(module=>{
    entries[`${module}/${module}`] = `./module/${module}/${module}.js`,
    htmlPs.push(new HtmlWebpcKPlugin({
        filename:`${module}/${module}.html`,
        template:`./module/${module}/index.html`,
        chunks:[`${module}/${module}`]
    }))
})
module.exports = {
    mode:'development',
    entry:entries,
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name]-[hash:8].js'
    },
    plugins:[...htmlPs]
}