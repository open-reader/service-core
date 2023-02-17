import { Service, register, Platform, RemoteResource, RemoteChapter, RemoteContent, platform } from '.';

describe('#register', () => {
    const MockPlatform = jest.fn<Platform, [], Platform>();

    test('register service current platform', () => {
        const serviceName = 'test serviceName';
        const serviceUri = 'test uri';
        @register()
        class ServiceImpl extends Service {
            search(keyword: string): Promise<RemoteResource[]> {
                throw new Error('Method not implemented.');
            }

            getCatalog(resource: RemoteResource): Promise<RemoteChapter[]> {
                throw new Error('Method not implemented.');
            }

            getContent(chapter: RemoteChapter): Promise<RemoteContent> {
                throw new Error('Method not implemented.');
            }

            get uri(): string {
                return serviceUri;
            }

            get name(): string {
                return serviceName;
            }
        }

        expect(platform.service).toBeInstanceOf(ServiceImpl);
    });

    test('register service to platform', () => {
        const serviceName = 'test serviceName';
        const serviceUri = 'test uri';
        const mockPlatform = new MockPlatform();
        @register(mockPlatform)
        class ServiceImpl extends Service {
            search(keyword: string): Promise<RemoteResource[]> {
                throw new Error('Method not implemented.');
            }

            getCatalog(resource: RemoteResource): Promise<RemoteChapter[]> {
                throw new Error('Method not implemented.');
            }

            getContent(chapter: RemoteChapter): Promise<RemoteContent> {
                throw new Error('Method not implemented.');
            }

            get uri(): string {
                return serviceUri;
            }

            get name(): string {
                return serviceName;
            }
        }

        expect(mockPlatform.service).toBeInstanceOf(ServiceImpl);
        expect(mockPlatform.service!.name).toBe(serviceName);
        expect(mockPlatform.service!.uri).toBe(serviceUri);
    });
})