export interface Resource {
    name: string;
    cover: string;
}

export interface Chapter {
    name: string;
}

export interface Service<R extends Resource = any, C extends Chapter = any, Impl extends Service = any> {
    platform: Platform;
    get source(): string;
    get name(): string;
    catalog(offset: number): Promise<R[]>;
    search(keyword: string): Promise<R[]>;
    chapters(resource: R): Promise<C[]>;
    content(chapter: C): Promise<void>;
}

export interface ServiceConstructor {
    new(platform: Platform): Service;
}

declare global {
    let service: Service;
    const platform: Platform;
}

export interface Response {
    ok: boolean;
    status: string;
    json(): Promise<any>;
    arrayBuffer(): Promise<ArrayBuffer>;
    text(): Promise<string>;
}

export interface Platform {
    version: string;
    fetch(
        url: string,
        options?: {
            method?: 'GET' | 'POST',
            headers?: { [key: string]: string },
            body?: string
        }
    ): Promise<Response>;
    sendMessage: (name: 'data' | 'done' | 'error', message: string) => void;
    service: Service;
}

export function register(current = platform) {
    return (target: ServiceConstructor) => {
        current.service = new target(current);
    };
}
