import { findServer } from '../index';
import axios from 'axios';

jest.mock('axios');

describe('Lowest priority server', () => {
    it('returns the server with the lowest priority', async () => {
        const data = [
            {
                url: 'https://does-not-work.perfume.new',
                priority: 1,
            },
            {
                url: 'https://gitlab.com',
                priority: 4,
            },
            {
                url: 'http://app.scnt.me',
                priority: 3,
            },
            {
                url: 'https://offline.scentronix.com',
                priority: 2,
            },
        ];

        const getMock = jest.spyOn(axios, 'get');

        getMock.mockImplementation((url: string) => {
            const responses: Record<string, Promise<any>> = {
                'https://does-not-work.perfume.new': Promise.resolve({ status: 404 }),
                'https://gitlab.com': Promise.resolve({ status: 200 }),
                'http://app.scnt.me': Promise.resolve({ status: 404 }),
                'https://offline.scentronix.com': Promise.resolve({ status: 500 }),
            };
            return responses[url];
        });

        const server = await findServer(data);
        expect(server)
            .toEqual({
                url: 'https://gitlab.com',
                priority: 4,
            });
    });
});
