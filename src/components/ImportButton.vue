<template>
    <button
        class="flex items-center font-medium text-sm py-2 px-4 rounded text-teal-700 hover:bg-gray-300"
        @click="importColors"
    >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-4 h-4 fill-current mr-2"><path d="M13 10v6H7v-6H2l8-8 8 8h-5zM0 18h20v2H0v-2z" /></svg>
        <span>Import from config (primary color)</span>
    </button>
</template>

<script lang="ts">
import Vue from 'vue';

import FilePicker from '@/utils/FilePicker';

export default Vue.extend({
    methods: {
        async importColors() {
            const data = await FilePicker.upload({ accept: 'application/javascript' });
            const module: any = {};

            eval(data);

            const { exports: { colors: { primary: customColors } } } = module;

            this.$emit('updateColors', customColors);
        },
    },
});
</script>
