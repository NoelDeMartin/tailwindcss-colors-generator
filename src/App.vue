<template>
    <div
        id="app"
        class="flex flex-col w-screen h-screen overflow-x-hidden font-ubuntu bg-gray-200"
    >
        <div ref="scroll" class="flex-grow overflow-y-auto w-full p-4 pb-8">
            <div class="flex flex-col max-w-content mx-auto pb-10">
                <div class="mb-6 flex flex-col items-center md:flex-row">
                    <h1 class="font-medium text-3xl text-center mb-4 md:mb-0">
                        TailwindCSS Colors Generator
                    </h1>

                    <div class="flex-grow" />

                    <button
                        type="button"
                        class="flex items-center font-medium text-sm py-2 px-4 rounded text-teal-700 hover:bg-gray-300"
                        @click="loadDefaults"
                    >
                        Load defaults
                    </button>

                    <ImportButton class="self-center" @updateColors="updateColors" />
                </div>

                <ul class="rounded bg-white shadow mb-4">
                    <li
                        v-for="(color, index) of colors"
                        :key="index"
                        class="cursor-pointer flex flex-col p-4 border-b border-gray-400 last:border-b-0 hover:bg-gray-300"
                        :class="{ 'bg-gray-300': index === activeColor }"
                        @click="toggleColor(index)"
                    >
                        <div class="flex items-center">
                            <input
                                v-model="color.name"
                                type="text"
                                class="mr-2 w-32 font-bold bg-transparent"
                                @click.stop=""
                            >

                            <div class="hidden border border-gray-300 mr-4 md:flex">
                                <div
                                    v-for="(shadeValue, shadeName) of color.shades"
                                    :key="shadeName"
                                    class="w-8 h-8"
                                    :style="{ background: shadeValue }"
                                />
                            </div>
                            <div class="flex-grow" />
                            <RemoveButton @click.stop="removeColor(index)" />
                        </div>
                        <div class="flex border border-gray-300 mt-4 md:hidden">
                            <div
                                v-for="(shadeValue, shadeName) of color.shades"
                                :key="shadeName"
                                class="w-8 h-8"
                                :style="{ background: shadeValue }"
                            />
                        </div>
                    </li>
                    <li>
                        <button
                            type="button"
                            class="flex justify-center items-center w-full text-white text-lg p-3 rounded-b bg-blue-500 hover:bg-blue-700"
                            @click="addColor"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="w-5 h-5 fill-current mr-2"><path d="M11 9V5H9v4H5v2h4v4h2v-4h4V9h-4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" /></svg>
                            add new color
                        </button>
                    </li>
                </ul>

                <ExportButton ref="export-button" class="w-64 mt-2 self-end" :colors="colors" />

                <template v-if="activeColor !== null">
                    <h2 class="text-2xl mb-2">
                        <strong>{{ colors[activeColor].name }}</strong>
                    </h2>
                    <ColorShadesEditor :shades="colors[activeColor].shades" />
                </template>
            </div>
        </div>
        <AppFooter />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { animate } from '@/utils/animations';
import { BASIC_COLORS, DEFAULT_COLORS, GRAY_SHADES } from '@/utils/tailwind-colors';

import AppFooter from '@/components/AppFooter.vue';
import ColorShadesEditor from '@/components/ColorShadesEditor.vue';
import ExportButton from '@/components/ExportButton.vue';
import ImportButton from '@/components/ImportButton.vue';
import RemoveButton from '@/components/RemoveButton.vue';

interface Data {
    activeColor: number | null;
    colors: ColorDefinition[];
}

export default Vue.extend({
    components: {
        AppFooter,
        ColorShadesEditor,
        ExportButton,
        ImportButton,
        RemoveButton,
    },
    data: (): Data => ({
        activeColor: 0,
        colors: BASIC_COLORS,
    }),
    methods: {
        updateColors(colors: ColorDefinition[]): void {
            this.colors = colors;
        },
        loadDefaults() {
            this.colors = DEFAULT_COLORS;
        },
        addColor() {
            this.colors.push({
                name: 'new-color',
                shades: GRAY_SHADES,
            });

            this.activeColor = this.colors.length - 1;
        },
        removeColor(index: number) {
            this.colors.splice(index, 1);

            if (this.activeColor === null)
                return;

            if (this.activeColor >= index)
                this.activeColor = index > 0 ? this.activeColor - 1 : null;
        },
        toggleColor(index: number) {
            if (this.activeColor === index) {
                this.activeColor = null;

                return;
            }

            this.activeColor = index;

            const scroll = this.$refs.scroll as HTMLDivElement;
            const exportButton = (this.$refs['export-button'] as Vue).$el as HTMLButtonElement;
            const scrollStart = scroll.scrollTop;
            const scrollEnd = exportButton.offsetTop + exportButton.clientHeight;

            animate(progress => {
                scroll.scrollTo({ top: scrollStart * (1 - progress) + scrollEnd * progress });
            }, 300);
        },
    },
});
</script>

<style lang="scss">
    @import "./styles/main.scss";
</style>
