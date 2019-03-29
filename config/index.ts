// const {join} = require('path');
// const _ = require('lodash');

import { join } from 'path';
import * as _ from 'lodash';

let config = {
    VIEWS_DIR: join(__dirname, '..', 'views'),
    STATIC_DIR: join(__dirname, '..', 'assets'),
    COMPONENTS_DIR: join(__dirname, '..', 'components'),
    baseUrl: "http://www.book.com",
    PORT: 3000,
}

if (process.env.NODE_ENV === 'development') {
    let devConfig = {
        PORT: 3000,
    }
    config = _.extend(config, devConfig);
}
if (process.env.NODE_ENV === 'production') {
    let proConfig = {
        PORT: 3001,
    }
    config = _.extend(config, proConfig);
}

export default config;