export interface RemoteResource {
    name: string;
    coverUri: string;
    uri: string;
}

export interface RemoteChapter {
    name: string;
    uri: string;
}

export interface RemoteContent {
    uris: string[]
}

export abstract class Service<R extends RemoteResource = RemoteResource, CH extends RemoteChapter = RemoteChapter, C extends RemoteContent = RemoteContent> {
    constructor(protected platform: Platform) { }
    abstract get uri(): string;
    abstract get name(): string;
    abstract search(keyword: string): Promise<R[]>;
    abstract getCatalog(resource: RemoteResource): Promise<CH[]>;
    abstract getContent(chapter: CH): Promise<C>;
}

export interface ServiceConstructor<S extends Service> {
    new(platform: Platform): S;
}

declare module global {
    export const version: string;
    export function fetch(
        url: string,
        options?: {
            method?: 'GET' | 'POST',
            headers?: { [key: string]: string },
            body?: string
        }
    ): Promise<Response>;
    export let service: Service | undefined;
}

export type Platform = Pick<typeof global, 'version' | 'fetch' | 'service'>

export const platform: Platform = global;

export interface Response {
    ok: boolean;
    status: string;
    json(): Promise<any>;
    arrayBuffer(): Promise<ArrayBuffer>;
    text(): Promise<string>;
}

export function register<T extends Service>(currentPlatform: Platform = platform) {
    return (target: ServiceConstructor<T>) => {
        currentPlatform.service = new target(currentPlatform);
    };
}
