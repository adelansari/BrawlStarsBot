"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cache_1 = __importDefault(require("node-cache"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const utils_1 = require("./utils");
const querystring_1 = require("querystring");
class APIError extends Error {
    constructor(text, status) {
        super(text);
        this.status = status;
    }
}
exports.APIError = APIError;
class Client {
    constructor(token, options = { cache: true }) {
        this.baseURL = "https://api.brawlstars.com/v1";
        this.token = token;
        this.cache = options.cache ? new node_cache_1.default(options.cacheOptions) : undefined;
    }
    /**
     * Returns the bearer value for authorization header.
     * @returns {String}
     */
    get authorization() {
        return `Bearer ${this.token}`;
    }
    _fetch(path, query) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.baseURL + path + (query ? "?" + querystring_1.stringify(query) : "");
            const exists = (_a = this.cache) === null || _a === void 0 ? void 0 : _a.get(url);
            if (exists)
                return exists;
            const response = yield node_fetch_1.default(url, {
                headers: {
                    "Authorization": this.authorization,
                    "User-Agent": "BrawlStars.js https://github.com/pollen5/brawlstars.js",
                    "Accept": "application/json"
                }
            });
            if (!response.ok)
                throw new APIError(response.statusText, response.status);
            const data = yield response.json();
            const cache = response.headers.get("cache-control");
            const ttl = cache && cache.startsWith("max-age=") ? parseInt(cache.slice(8)) : 0;
            if (ttl)
                (_b = this.cache) === null || _b === void 0 ? void 0 : _b.set(url, data, ttl);
            return data;
        });
    }
    getPlayer(tag) {
        return this._fetch(`/players/%23${utils_1.cleanTag(tag)}`)
            .then((res) => {
            // Thanks a lot supercell.
            res.x3vs3Victories = res["3vs3Victories"];
            return res;
        });
    }
    getPlayerBattlelog(tag) {
        return this._fetch(`/players/%23${utils_1.cleanTag(tag)}/battlelog`);
    }
    getClub(tag) {
        return this._fetch(`/clubs/%23${utils_1.cleanTag(tag)}`);
    }
    getPlayerRankings(country, { before, after, limit } = {}) {
        const query = {};
        if (before)
            query.before = before;
        if (after)
            query.after = after;
        if (limit)
            query.limit = limit;
        return this._fetch(`/rankings/${country}/players`, query);
    }
    getClubRankings(country, { before, after, limit } = {}) {
        const query = {};
        if (before)
            query.before = before;
        if (after)
            query.after = after;
        if (limit)
            query.limit = limit;
        return this._fetch(`/rankings/${country}/clubs`, query);
    }
    getBrawlerRankings(country, brawler, { before, after, limit } = {}) {
        const query = {};
        if (before)
            query.before = before;
        if (after)
            query.after = after;
        if (limit)
            query.limit = limit;
        return this._fetch(`/rankings/${country}/brawlers/${brawler}`, query);
    }
    getClubMembers(tag, { before, after, limit } = {}) {
        const query = {};
        if (before)
            query.before = before;
        if (after)
            query.after = after;
        if (limit)
            query.limit = limit;
        return this._fetch(`/clubs/%23${utils_1.cleanTag(tag)}/members`, query);
    }
    getBrawlers({ before, after, limit } = {}) {
        const query = {};
        if (before)
            query.before = before;
        if (after)
            query.after = after;
        if (limit)
            query.limit = limit;
        return this._fetch(`/brawlers`, query);
    }
    getBrawler(id) {
        return this._fetch(`/brawlers/${id}`);
    }
}
exports.Client = Client;
