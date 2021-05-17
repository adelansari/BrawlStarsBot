import { Player, PlayerBattlelog, RankingsPlayer } from "./Player";
import { Brawler } from "./Brawler";
import { Club, ClubMember, RankingsClub } from "./Club";
import Cache, { Options } from "node-cache";
export interface ClientOptions {
    cache: boolean;
    cacheOptions?: Options;
}
export declare class APIError extends Error {
    status: number;
    constructor(text: string, status: number);
}
export declare class Client {
    token: string;
    cache?: Cache;
    baseURL: string;
    constructor(token: string, options?: ClientOptions);
    /**
     * Returns the bearer value for authorization header.
     * @returns {String}
     */
    get authorization(): string;
    private _fetch;
    getPlayer(tag: string): Promise<Player>;
    getPlayerBattlelog(tag: string): Promise<PlayerBattlelog[]>;
    getClub(tag: string): Promise<Club>;
    getPlayerRankings(country: string, { before, after, limit }?: {
        before?: string;
        after?: string;
        limit?: number;
    }): Promise<RankingsPlayer[]>;
    getClubRankings(country: string, { before, after, limit }?: {
        before?: string;
        after?: string;
        limit?: number;
    }): Promise<RankingsClub[]>;
    getBrawlerRankings(country: string, brawler: string, { before, after, limit }?: {
        before?: string;
        after?: string;
        limit?: number;
    }): Promise<RankingsPlayer[]>;
    getClubMembers(tag: string, { before, after, limit }?: {
        before?: string;
        after?: string;
        limit?: number;
    }): Promise<ClubMember[]>;
    getBrawlers({ before, after, limit }?: {
        before?: string;
        after?: string;
        limit?: number;
    }): Promise<Brawler[]>;
    getBrawler(id: string): Promise<Brawler>;
}
