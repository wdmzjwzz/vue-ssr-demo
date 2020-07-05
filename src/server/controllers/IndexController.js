import { route, GET } from 'awilix-koa';
const fs = require('fs');
const { createRenderer } = require('vue-server-renderer');
const LRU = require('lru-cache')
@route('/')
@route('/topics')
class IndexController {
    constructor(indexService) {
        this.indexService = indexService
    }
    createRender(clientManifest, serverbundle, template) {
        return createRenderer(serverbundle, {
            cache: LRU({
                max: 10000
            }),
            runInNewContext: false,
            template,
            clientManifest
        })
    }
    @GET()
    async getIndex(ctx) {
        const clientManifest = require('../vue-ssr-client-manifest.json')
        const serverbundle = require('../vue-ssr-server-bundle.json')
        const template = fs.readFileSync("../index.html", 'utf-8')
        const content = { url: ctx.url }
        const ssrrender = this.createRender(clientManifest, serverbundle, template);
        const ssrStream = ssrrender.renderToStream(content);
        ctx.status = 200;
        ctx.type = "html";
        ssrStream.on("error", err => { console.log(err) }).pipe(ctx.res)
    }

}
export default IndexController