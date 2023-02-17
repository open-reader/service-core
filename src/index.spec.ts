import { Service, register, Platform } from '.';
describe('#register', () => {

    test('register service to platform', () => {
        (global as any).service = {} as any;
        (global as any).platform = {} as any;

        var platform: Platform = {} as any;
        @register(platform)
        class ServiceImpl implements Service {
            constructor(public platform: Platform) {
            }
            get source(): string {
                throw new Error('Method not implemented.');
            }
            get name(): string {
                throw new Error('Method not implemented.');
            }
            catalog(): Promise<any[]> {
                throw new Error('Method not implemented.');
            }
            search(keyword: string): Promise<any[]> {
                throw new Error('Method not implemented.');
            }
            chapters(resource: any): Promise<any[]> {
                throw new Error('Method not implemented.');
            }

            content(chapter: any): Promise<void> {
                throw new Error('Method not implemented.');
            }
        }

        expect(platform).toBe(platform);
        expect(platform.service).toBeInstanceOf(ServiceImpl);
    });
})