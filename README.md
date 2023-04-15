# findServer

A Node.js module that selects an online server from a list of servers based on their priority.

## Installation

To use `findServer` in your Node.js project, you can install it via npm:

`npm install findserver-scentronix`

## Usage

To use `findServer`, import the `findServer` function and call it with an array of `Server` objects.

```typescript
import axios from 'axios';
import { findServer, Server } from 'findserver-scentrnx';

async function fetch() {
    const servers: Server[] = [
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
    try {
        const st = await findServer(servers);
        console.log(st);
    } catch (error) {
        console.log('error', error);
    }
}

fetch();
```

The findServer function returns a promise that resolves with the selected server (a Server object) or rejects with an error message (a string).

## API

`findServer(serverList: Server[]): Promise<Server | string>`
Given an array of Server objects, selects the online server with the highest priority and returns it as a Server object wrapped in a resolved promise. If no servers are online, returns a rejected promise with an error message. If there is a network error, returns a rejected promise with an error message that includes the URL of the server that failed and the error message returned by `axios`.

`Server`
An interface that represents a server object with a URL and a priority.

```typescript
interface Server {
    url: string;
    priority: number;
}
```

## Todo List

Here are some of the features that we plan to add to this application:

-   [ ] Add a check to servers to make sure the content dynamically correct before accessing axios
-   [ ] Currently we sort by priority but we need other classifier to return the right server if two or more servers has the same priority
