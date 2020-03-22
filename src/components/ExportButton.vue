<template>
    <button
        type="button"
        class="flex items-center justify-center text-white font-medium py-2 px-4 rounded bg-teal-500 hover:bg-teal-700"
        @click="exportColors"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-4 h-4 fill-current mr-2"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
        <span>tailwind.config.js</span>
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        colors: {
            type: Array as () => ColorDefinition[],
            required: true,
        },
    },
    methods: {
        exportColors() {
            const lines = [
                'module.exports = {',
                '   theme: {',
                '       colors: {',
            ];

            const formatObjectKey = (name: string) => /-\s/.test(name) ? `'${name}'` : name;

            for (const color of this.colors) {
                const shadeEntries = Object.entries(color.shades);

                if (shadeEntries.length === 1 && shadeEntries[0][0] === 'default') {
                    lines.push(`            ${formatObjectKey(color.name)}: '${shadeEntries[0][1]}',`);

                    continue;
                }

                lines.push(`            ${formatObjectKey(color.name)}: {`);
                lines.push(
                    ...shadeEntries
                        .map(([shade, color]) => `                ${shade}: '${color}',`),
                );
                lines.push('            },');
            }

            lines.push(...[
                '        },',
                '    },',
                '};',
                '',
            ]);

            const url = window.URL.createObjectURL(
                new Blob([lines.join('\n')], {type: 'application/javascript'}),
            );
            const anchor = document.createElement('a');
            anchor.style.display = 'none';
            anchor.href = url;
            anchor.download = 'tailwind.config.js';
            document.body.appendChild(anchor);
            anchor.click();
            window.URL.revokeObjectURL(url);
        },
    },
});
</script>
