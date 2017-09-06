/**
 * @file privateFileMiddlewareFactory.js
 * @author lavas
 */

/**
 * generate private file middleware
 * which prevents user from getting in touch with some private files
 *
 * @param {Object} core lavas core
 * @return {Function} koa middleware
 */
export default function (core) {
    // static files such as routes.json, vue-server-bundle.json
    let privateFiles = [...core.routeManager.privateFiles, ...core.renderer.privateFiles];

    return async function (ctx, next) {

        if (privateFiles.find(file => ctx.path.indexOf(file) > -1)) {
            await Promise.reject({status: 404});
        }
        else {
            await next();
        }
    };
}
