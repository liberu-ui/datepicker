<template>
    <core-datepicker v-bind="$attrs"
        ref="coreDatepicker">
        <template #default="{ timeOnly, clearButton, clearEvents, inputBindings, readonly }">
            <div class="control"
                :class="{'has-icons-left has-icons-right': !readonly}">
                <input class="input"
                    :class="[{ 'is-danger': isDanger }, { 'is-warning': isWarning }, { 'is-small': isSmall }]"
                    v-bind="inputBindings"
                    type="text"
                    :placeholder="placeholder">
                <span class="icon is-small is-left"
                    v-if="!readonly">
                    <fa icon="clock"
                        v-if="timeOnly"/>
                    <fa icon="calendar-alt"
                        v-else/>
                </span>
                <span class="icon is-small is-right clear-button"
                    v-on="clearEvents"
                    v-if="clearButton">
                    <a class="delete is-small"/>
                </span>
            </div>
        </template>
    </core-datepicker>
</template>

<script>
import { FontAwesomeIcon as Fa } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faCalendarAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import CoreDatepicker from '../renderless/CoreDatepicker.vue';

library.add(faClock, faCalendarAlt, faExclamationTriangle);

export default {
    name: 'Datepicker',

    components: { Fa, CoreDatepicker },

    props: {
        isDanger: {
            type: Boolean,
            default: false,
        },
        isSmall: {
            type: Boolean,
            default: false,
        },
        isWarning: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: 'Select Date',
        },
    },

    methods: {
        clear() {
            this.$refs.coreDatepicker.clear();
        },
    },
};
</script>

<style lang="scss">
    .control.has-icons-right .clear-button {
        pointer-events: all;
    }
</style>
