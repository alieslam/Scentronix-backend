import axios from 'axios';

interface Server {
    url: string;
    priority: number;
}
/**
  Find the first online server from the given list of servers using axios to check their connectivity status.
  @param {Server[]} serverList - The list of servers to check.
  @returns {Promise<Server|string>} A Promise that resolves to the first online server from the serverList, or rejects with an error message if no servers are online.
**/
async function findServer(serverList: Server[]): Promise<Server | string> {
    const promises = serverList.map(server =>
        axios
            .get(server.url, { timeout: 5000 })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return { url: server.url, priority: server.priority };
                } else {
                    // Return rejection when code is beyond the limits
                    return Promise.reject({ error: response.status, description: 'Error in network' });
                }
            })
            .catch(error => {
                return Promise.reject({ error: error, description: 'Error in network' });
            }),
    );
    // Settle all promises and return the results as an array of Servers[]
    const results = await Promise.allSettled(promises);
    // Filter results by fulfilled
    const onlineServers = results
        .filter(server => server.status === 'fulfilled')
        .map(server => server.status === 'fulfilled' && server.value) as { url: string; priority: number }[];
    // If no online servers Reject
    if (onlineServers.length === 0) {
        return Promise.reject('No servers are online');
    }
    // TODO: Currently we sort by priority but we need other classifier to return the right server if
    // two or more servers has the same priority
    onlineServers.sort((a, b) => a.priority - b.priority);
    return Promise.resolve(onlineServers[0]);
}

export { findServer };
