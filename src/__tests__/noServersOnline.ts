import { findServer } from '../index';

describe('findServer', () => {
    it('returns no servers online', async () => {
        const serverList = [
            { url: 'https://does-not-work.perfume.new', priority: 1 },
            { url: 'https://offline.scentronix.com', priority: 2 },
        ];
        try {
            const res = await findServer(serverList);
            expect(res).rejects.toThrow('No servers are online');
        } catch (error) {}
    });
});
