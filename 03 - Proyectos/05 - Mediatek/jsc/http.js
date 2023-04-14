'use strict';

const {
    ArrayPrototypeSlice,
    ArrayPrototypeSort,
    ObjectDefineProperty,
} = primordials;

const httpAgent = require('_http_agent');
const { ClientRequest } = require('_http_client');
const { methods } = require('_http_common');
const { IncomingMessage } = require('_http_incoming');
const {
    validateHeaderName,
    validateHeaderValue,
    OutgoingMessage
} = require('_http_outgoing');
const {
    _connectionListener,
    STATUS_CODES,
    Server,
    ServerResponse
} = require('_http_server');
let maxHeaderSize;

/**
 * Returns a new instance of `http.Server`.
 * @param {{
 *   IncomingMessage?: IncomingMessage;
 *   ServerResponse?: ServerResponse;
 *   insecureHTTPParser?: boolean;
 *   maxHeaderSize?: number;
 *   }} [opts]
 * @param {Function} [requestListener]
 * @returns {Server}
 */
function createServer(opts, requestListener) {
    return new Server(opts, requestListener);
}

/**
 * @typedef {object} HTTPRequestOptions
 * @property {httpAgent.Agent | boolean} [agent]
 * @property {string} [auth]
 * @property {Function} [createConnection]
 * @property {number} [defaultPort]
 * @property {number} [family]
 * @property {object} [headers]
 * @property {number} [hints]
 * @property {string} [host]
 * @property {string} [hostname]
 * @property {boolean} [insecureHTTPParser]
 * @property {string} [localAddress]
 * @property {number} [localPort]
 * @property {Function} [lookup]
 * @property {number} [maxHeaderSize]
 * @property {string} [method]
 * @property {string} [path]
 * @property {number} [port]
 * @property {string} [protocol]
 * @property {boolean} [setHost]
 * @property {string} [socketPath]
 * @property {number} [timeout]
 * @property {AbortSignal} [signal]
 */

/**
 * Makes an HTTP request.
 * @param {string | URL} url
 * @param {HTTPRequestOptions} [options]
 * @param {Function} [cb]
 * @returns {ClientRequest}
 */
function request(url, options, cb) {
    return new ClientRequest(url, options, cb);
}

/**
 * Makes a `GET` HTTP request.
 * @param {string | URL} url
 * @param {HTTPRequestOptions} [options]
 * @param {Function} [cb]
 * @returns {ClientRequest}
 */
function get(url, options, cb) {
    const req = request(url, options, cb);
    req.end();
    return req;
}

module.exports = {
    _connectionListener,
    METHODS: ArrayPrototypeSort(ArrayPrototypeSlice(methods)),
    STATUS_CODES,
    Agent: httpAgent.Agent,
    ClientRequest,
    IncomingMessage,
    OutgoingMessage,
    Server,
    ServerResponse,
    createServer,
    validateHeaderName,
    validateHeaderValue,
    get,
    request
};

ObjectDefineProperty(module.exports, 'maxHeaderSize', {
    __proto__: null,
    configurable: true,
    enumerable: true,
    get() {
        if (maxHeaderSize === undefined) {
            const { getOptionValue } = require('internal/options');
            maxHeaderSize = getOptionValue('--max-http-header-size');
        }

        return maxHeaderSize;
    }
});

ObjectDefineProperty(module.exports, 'globalAgent', {
    __proto__: null,
    configurable: true,
    enumerable: true,
    get() {
        return httpAgent.globalAgent;
    },
    set(value) {
        httpAgent.globalAgent = value;
    }
});