const swaggerDist = require('swagger-ui-dist');
const serve = require('koa-static');

// const ui = swaggerDist.SwaggerUIBundle({
//     url: "spec",
//     dom_id: '#swagger-ui',
//     deepLinking: true,
//     presets: [
//         swaggerDist.SwaggerUIStandalonePreset
//     ],
//     layout: 'StandaloneLayout'
// })
console.log("swagger path: " + swaggerDist.absolutePath());

module.exports = serve(swaggerDist.absolutePath());