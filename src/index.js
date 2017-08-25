// import RouteManager from './RouteManager';
import WebpackConfig from './WebpackConfig';
import ConfigValidator from './ConfigValidator';
import {join} from 'path';
import glob from 'glob';
import _ from 'lodash';

class LavasCore {
    constructor(cwd = process.cwd()) {
        this.cwd = cwd;
    }

    async init() {
        this.config = await this.loadConfig(process.env.NODE_ENV);

        ConfigValidator.validate(this.config);

        this.webpackConfig = new WebpackConfig(this.config);

        // this.routeManager = new RouteManager(this);
    }

    async loadConfig(env = 'development') {
        const config = {};
        let configDir = join(this.cwd, 'config');
        let files = glob.sync(
            '**/*.js', {
                cwd: configDir
            }
        );

        // require all files and assign them to config recursively
        await Promise.all(files.map(async filepath => {
            filepath = filepath.substring(0, filepath.length - 3);

            let paths = filepath.split('/');

            let name;
            let cur = config;
            for (let i = 0; i < paths.length - 1; i++) {
                name = paths[i];
                if (!cur[name]) {
                    cur[name] = {};
                }

                cur = cur[name];
            }

            name = paths.pop();

            // load config
            cur[name] = await import(join(configDir, filepath));
        }));

        let temp = config.env || {};

        // merge config according env
        if (temp[env]) {
            _.merge(config, temp[env]);
        }

        return config;
    }

    koaMiddleware(context, next) {

    }
}

export default LavasCore;