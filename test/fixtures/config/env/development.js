/**
 * @file development config
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

'use strict';

module.exports = {

    webpack: {
        base: {
            output: {
                publicPath: '/dist/',
                filename: 'js/[name].[hash:8].js'
            }
        },
        shortcuts: {
            cssExtract: false
        }
    }

};
