<template>
    <div
        id="app"
        class="w-screen h-screen overflow-x-hidden font-ubuntu"
    >
        <div class="overflow-y-auto w-full p-4 bg-gray-200">
            <div class="max-w-content mx-auto mb-6 flex flex-col items-center md:flex-row">
                <h1 class="font-semibold text-3xl mb-4 md:mb-0">
                    TailwindCSS Colors Generator
                </h1>

                <div class="flex-grow" />

                <ImportButton class="self-end md:self-center" @updateColors="updateColors" />
            </div>

            <div class="flex flex-col bg-white w-full max-w-content mx-auto p-6 rounded-lg shadow">
                <div class="flex mb-2">
                    <h2 class="font-medium text-xl">
                        Choose the base color first
                    </h2>
                    <div class="flex-grow" />
                    <PreviewTitle class="hidden md:flex" />
                </div>

                <div class="flex flex-col mb-2 md:flex-row">
                    <ColorPicker v-model="colors[500]" shade="500" />

                    <div class="flex-grow" />

                    <div class="flex flex-col mt-2 items-end md:mt-0">
                        <PreviewTitle class="flex mb-2 md:hidden" />
                        <button
                            class="text-white font-bold py-2 px-4 rounded w-64"
                            :style="{ background: buttonHovered ? colors[700] : colors[500] }"
                            @mouseenter="buttonHovered = true"
                            @mouseleave="buttonHovered = false"
                        >
                            GET STARTED
                        </button>
                    </div>
                </div>

                <div class="flex mt-4 mb-2">
                    <h2 class="font-medium text-xl">
                        Finding the edges
                    </h2>
                    <div class="flex-grow" />
                    <PreviewTitle class="hidden md:flex" />
                </div>

                <div class="flex flex-col mb-2 md:flex-row">
                    <div class="flex">
                        <ColorPicker v-model="colors[100]" shade="100" class="mr-2" />
                        <ColorPicker v-model="colors[900]" shade="900" />
                    </div>

                    <div class="flex-grow" />

                    <div class="flex flex-col mt-2 items-end md:mt-0">
                        <PreviewTitle class="flex mb-2 md:hidden" />
                        <div
                            class="border px-4 py-3 rounded relative"
                            :style="{
                                background: colors[100],
                                borderColor: colors[400],
                                color: colors[900],
                            }"
                        >
                            <p class="font-semibold">
                                Our privacy policy has changed
                            </p>
                            <p class="text-sm">
                                Make sure you know how these changes affect you.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex mt-4 my-2">
                    <h2 class="font-medium text-xl">
                        Filling in the gaps
                    </h2>
                </div>

                <div class="flex items-center mb-2">
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[100] }" />
                    <ColorPicker v-model="colors[300]" shade="300" class="mr-2" />
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[500] }" />
                </div>

                <div class="flex items-center mb-2">
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[500] }" />
                    <ColorPicker v-model="colors[700]" shade="700" class="mr-2" />
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[900] }" />
                </div>

                <div class="flex items-center mb-2">
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[100] }" />
                    <ColorPicker v-model="colors[200]" shade="200" class="mr-2" />
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[300] }" />
                </div>

                <div class="flex items-center mb-2">
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[300] }" />
                    <ColorPicker v-model="colors[400]" shade="400" class="mr-2" />
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[500] }" />
                </div>

                <div class="flex items-center mb-2">
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[500] }" />
                    <ColorPicker v-model="colors[600]" shade="600" class="mr-2" />
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[700] }" />
                </div>

                <div class="flex items-center mb-2">
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[700] }" />
                    <ColorPicker v-model="colors[800]" shade="800" class="mr-2" />
                    <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: colors[900] }" />
                </div>

                <div class="flex flex-col items-center bg-gray-300 mt-6 -mx-6 -mb-6 p-6">
                    <div class="mb-3">
                        <div class="flex border border-gray-300 mr-4">
                            <div
                                v-for="(color, shade) of colors"
                                :key="shade"
                                class="w-8 h-8"
                                :style="{ background: colors[shade] }"
                            />
                        </div>
                    </div>

                    <div class="flex flex-row flex-wrap justify-center items-center -m-1">
                        <ColorPicker
                            v-for="(color, shade) of colors"
                            :key="shade"
                            v-model="colors[shade]"
                            :shade="shade"
                            class="m-1"
                        />
                    </div>

                    <ExportButton class="w-64 mt-4" :colors="colors" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ColorPicker from '@/components/ColorPicker.vue';
import ExportButton from '@/components/ExportButton.vue';
import ImportButton from '@/components/ImportButton.vue';
import PreviewTitle from '@/components/PreviewTitle.vue';

export default Vue.extend({
    components: {
        ColorPicker,
        ExportButton,
        ImportButton,
        PreviewTitle,
    },
    data: () => ({
        colors: {
            100: '#EBF8FF',
            200: '#BEE3F8',
            300: '#90CDF4',
            400: '#63B3ED',
            500: '#4299E1',
            600: '#3182CE',
            700: '#2B6CB0',
            800: '#2C5282',
            900: '#2A4365',
        },
        buttonHovered: false,
    }),
    methods: {
        updateColors(newColors: Colors) {
            for (const [shade, color] of Object.entries(newColors)) {
                (this.colors as any)[shade] = color;
            }
        },
    },
});
</script>

<style lang="scss">
    @import "./styles/main.scss";
</style>
