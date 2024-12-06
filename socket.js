import { Server } from 'socket.io';

export const webSocketServer = {
    name: 'webSocketServer',
    /**
     *
     * @param {import('vite').ViteDevServer} server
     * @returns
     */
    configureServer(server) {
        if (!server.httpServer) return;
        const io = new Server(server.httpServer);

        io.on('connection', (socket) => {
            console.log(`User ${socket.id} connected`);

            socket.onAny((name, message) => {
                console.log(name, message, 's');

                io.emit('changes', message);
            });

            socket.on('disconnect', () => {});
        });
    },
};
