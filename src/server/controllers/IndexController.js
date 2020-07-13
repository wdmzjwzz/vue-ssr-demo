import { route, GET } from 'awilix-koa';
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const LRU = require('lru-cache')
const path = require('path')
@route('/')
@route('/topics')
class IndexController {
    constructor(indexService) {
        this.indexService = indexService
    }
    createRender(clientManifest, serverbundle, template) {
        return createBundleRenderer(serverbundle, {
            cache: new LRU({
                max: 10000
            }),
            runInNewContext: false,
            template,
            clientManifest
        })
    }
    @GET()
    async getIndex(ctx) {
        try {
            const clientManifest = require(path.join(__dirname, '../vue-ssr-client-manifest.json'))
            const serverbundle = require(path.join(__dirname, '../vue-ssr-server-bundle.json'))
            const template = fs.readFileSync(path.join(__dirname, "../index.html"), 'utf-8')
            const content = { url: ctx.url }
            const ssrrender = this.createRender(clientManifest, serverbundle, template);
            const ssrStream = ssrrender.renderToStream(content);
            ctx.status = 200;
            ctx.type = "html";
            console.log(ssrStream.on)
            ssrStream.on("error", err => { console.log(err) }).pipe(ctx.res)
        } catch (error) {
            console.log(error)
        }
    }

}
export default IndexController