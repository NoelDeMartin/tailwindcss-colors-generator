<template>
    <div class="relative w-12 h-12 border border-gray-300" :style="{ background: value }">
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span class="bg-white px-1 rounded opacity-50">{{ shade }}</span>
        </div>
        <input
            :value="value"
            type="color"
            class="w-12 h-12 cursor-pointer opacity-0"
            @input="$emit('input', $event.target.value)"
        >
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    props: {
        shade: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
});
</script>
