<template>
    <div class="flex flex-col bg-white w-full max-w-content mx-auto p-6 rounded-lg shadow">
        <template v-if="hasStandardShades">
            <div class="flex mb-2">
                <h2 class="text-xl">
                    Choose the base color first
                </h2>
                <div class="flex-grow" />
                <PreviewTitle class="hidden md:flex" />
            </div>

            <div class="flex flex-col mb-2 md:flex-row">
                <ColorPicker v-model="shades[500]" shade="500" />

                <div class="flex-grow" />

                <div class="flex flex-col mt-2 items-end md:mt-0">
                    <PreviewTitle class="flex mb-2 md:hidden" />
                    <button
                        type="button"
                        class="text-white font-bold py-2 px-4 rounded w-64"
                        :style="{ background: buttonHovered ? shades[700] : shades[500] }"
                        @mouseenter="buttonHovered = true"
                        @mouseleave="buttonHovered = false"
                    >
                        GET STARTED
                    </button>
                </div>
            </div>

            <div class="flex mt-4 mb-2">
                <h2 class="text-xl">
                    Finding the edges
                </h2>
                <div class="flex-grow" />
                <PreviewTitle class="hidden md:flex" />
            </div>

            <div class="flex flex-col mb-2 md:flex-row">
                <div class="flex">
                    <ColorPicker v-model="shades[100]" shade="100" class="mr-2" />
                    <ColorPicker v-model="shades[900]" shade="900" />
                </div>

                <div class="flex-grow" />

                <div class="flex flex-col mt-2 items-end md:mt-0">
                    <PreviewTitle class="flex mb-2 md:hidden" />
                    <div
                        class="border px-4 py-3 rounded relative"
                        :style="{
                            background: shades[100],
                            borderColor: shades[400],
                            color: shades[900],
                        }"
                    >
                        <p class="font-medium">
                            Our privacy policy has changed
                        </p>
                        <p class="text-sm" :style="{ color: shades[700] }">
                            Make sure you know how these changes affect you.
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex mt-4 my-2">
                <h2 class="text-xl">
                    Filling in the gaps
                </h2>
            </div>

            <div class="flex items-center mb-2">
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[100] }" />
                <ColorPicker v-model="shades[300]" shade="300" class="mr-2" />
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[500] }" />
            </div>

            <div class="flex items-center mb-2">
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[500] }" />
                <ColorPicker v-model="shades[700]" shade="700" class="mr-2" />
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[900] }" />
            </div>

            <div class="flex items-center mb-2">
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[100] }" />
                <ColorPicker v-model="shades[200]" shade="200" class="mr-2" />
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[300] }" />
            </div>

            <div class="flex items-center mb-2">
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[300] }" />
                <ColorPicker v-model="shades[400]" shade="400" class="mr-2" />
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[500] }" />
            </div>

            <div class="flex items-center mb-2">
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[500] }" />
                <ColorPicker v-model="shades[600]" shade="600" class="mr-2" />
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[700] }" />
            </div>

            <div class="flex items-center mb-2">
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[700] }" />
                <ColorPicker v-model="shades[800]" shade="800" class="mr-2" />
                <div class="w-12 h-12 mr-2 border border-gray-300" :style="{ background: shades[900] }" />
            </div>
        </template>

        <div v-if="hasStandardShades" class="flex mt-4 my-2">
            <h2 class="text-xl">
                View them all together
            </h2>
        </div>

        <div class="flex flex-row flex-wrap items-center -m-1">
            <ColorPicker
                v-for="(shadeValue, shadeName) of shades"
                :key="shadeName"
                v-model="shades[shadeName]"
                :shade="shadeName"
                class="m-1"
                :class="{ 'w-20': !hasStandardShades }"
            />
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import ColorPicker from '@/components/ColorPicker.vue';
import PreviewTitle from '@/components/PreviewTitle.vue';

export default Vue.extend({
    components: {
        ColorPicker,
        PreviewTitle,
    },
    props: {
        shades: {
            type: Object as () => ColorShades,
            required: true,
        },
    },
    data: () => ({
        buttonHovered: false,
    }),
    computed: {
        hasStandardShades(): boolean {
            return '100' in this.shades
                && '200' in this.shades
                && '300' in this.shades
                && '400' in this.shades
                && '500' in this.shades
                && '600' in this.shades
                && '700' in this.shades
                && '800' in this.shades
                && '900' in this.shades;
        },
    },
});
</script>
