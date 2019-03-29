import { Container, inject,  } from "inversify";
import { provide, buildProviderModule, fluentProvide } from "inversify-binding-decorators";
import { controller, interfaces, httpGet, TYPE } from "inversify-koa-utils";
import * as Router from 'koa-router';
import TAGS from '../constant/tags';
import TYPES from '../constant/types';

let provideThrowable = function (identifier, name) {
    return fluentProvide(identifier)
        .whenTargetNamed(name)
        .done();
}

export {
    Container,
    inject,
    provide,
    provideThrowable,
    buildProviderModule,

    controller,
    interfaces,
    httpGet,
    TYPE,
    
    Router,
    TAGS,
    TYPES,
}