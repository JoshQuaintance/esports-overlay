<script>
    import { io } from 'socket.io-client';

    const teamA = $state({
        name: 'Team A',
        tags: 'TA1',
        logo: 'https://placehold.co/400',
    });

    const teamB = $state({
        name: 'Team B',
        tags: 'TB1',
        logo: 'https://placehold.co/400',
    });

    const pos = $state({ left: teamA, right: teamB });

    // const socket = io();
    // socket.on('connect', () => {
    //     console.log(`Socket Connected, ID: ${socket.id}`);
    // });

    // socket.onAny((name, message) => {
    //     console.log('client', message);
    // });

    /**
     * Effects that will trigger a socket emit when either of the teams
     * have any data being updated
     */
    // $effect(() => {
    //     socket.emit('teama-update', JSON.stringify(teamA));
    // });

    // $effect(() => {
    //     socket.emit('teamb-update', JSON.stringify(teamB));
    // });
</script>

<svelte:head>
    <title>Overlay Controls</title>
</svelte:head>
