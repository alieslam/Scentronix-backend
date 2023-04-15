import axios from 'axios';

interface Server {
    url: string;
    priority: number;
}

async function findServer(serverList: Server[]): Promise<Server | string> {
    const promises = serverList.map(server =>
        axios
            .get(server.url, { timeout: 5000 })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return { url: server.url, priority: server.priority };
                }
            })
            .catch(error => {
                return Promise.reject({ error: error, description: 'Error in network' });
            }),
    );
    const results = await Promise.allSettled(promises);
    const onlineServers = results
        .filter(server => server.status === 'fulfilled')
        .map(server => server.status === 'fulfilled' && server.value) as { url: string; priority: number }[];

    if (onlineServers.length === 0) {
        return Promise.reject('No servers are online');
    }
    onlineServers.sort((a, b) => a.priority - b.priority);
    return Promise.resolve(onlineServers[0]);
}

export { findServer };
