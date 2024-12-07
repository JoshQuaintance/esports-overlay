<script>
    import template from '$lib/assets/IntermissionTemplate.png';

    const placeholderImg = 'https://placehold.co/200';
</script>

<svelte:head>
    <title>Intermission Screen</title>
</svelte:head>

<!-- svelte-ignore a11y_missing_attribute -->
<img class="absolute left-0 top-0 -z-10 h-auto" src={template} />

<div id="intermission-info" class="absolute left-14 top-28 flex size-[50em] h-auto flex-row justify-between text-white">
    <div id="teamA" class="flex size-fit flex-col items-center text-4xl">
        <!-- svelte-ignore a11y_missing_attribute -->
        <img
            class="team-logo"
            src="https://images.leagueos.gg/teams/1i6dpjo6q3dorc45gsff04dzc/65a4a79c9e286c6da98d8e63" />

        <div class="team-info">
            <p class="py-3">Name A</p>

            <span class="records flex flex-row items-center justify-center">
                <p class="wins">0</p>
                -
                <p class="losses">0</p>
            </span>
        </div>
    </div>

    <p id="rounds-won" class="pt-14 text-8xl">
        <span data-team="a">0</span> - <span data-team="b">0</span>
    </p>

    <div id="teamB" class="flex size-fit flex-col items-center text-4xl">
        <!-- svelte-ignore a11y_missing_attribute -->
        <img class="team-logo" src={placeholderImg} />

        <div class="team-info">
            <p class="py-3">Name B</p>

            <span class="records flex flex-row items-center justify-center">
                <p class="wins">0</p>
                -
                <p class="losses">0</p>
            </span>
        </div>
    </div>
</div>

<style>
    @import url('https://use.typekit.net/sso3kkk.css');

    * {
        font-family: 'address-sans-pro', sans-serif;
        font-weight: 900;
        font-style: normal;
    }

    .team-logo {
        width: 200px;
        height: 200px;
        object-fit: scale-down;
        align-content: center;
    }

    p {
        text-shadow:
            -3px -3px 0 #000,
            3px -3px 0 #000,
            -3px 3px 0 #000,
            3px 3px 0 #000;
    }
    h1,
    h2,
    h3 {
        text-shadow:
            -5px -5px 0 #000,
            5px -5px 0 #000,
            -5px 5px 0 #000,
            5px 5px 0 #000;
    }
</style>
