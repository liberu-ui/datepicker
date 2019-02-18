<template>
    <renderless-datepicker v-bind="$attrs"
        v-on="$listeners">
        <template v-slot:default="{ timeOnly, clearButton, clear }">
            <div class="control has-icons-left has-icons-right">
                <input :class="[
                        'input',
                        { 'is-danger': isDanger },
                        { 'is-warning': isWarning }
                    ]" type="text"
                    :placeholder="placeholder"
                    :disabled="disabled">
                <span class="icon is-small is-left">
                    <fa icon="clock"
                        v-if="timeOnly"/>
                    <fa icon="calendar-alt"
                        v-else/>
                </span>
                <span class="icon is-small is-right clear-button"
                    :class="{ 'is-spaced': isWarning || isDanger }"
                    @click="clear"
                    v-if="clearButton">
                    <a class="delete is-small"/>
                </span>
                <span :class="[
                        'icon is-small is-right',
                        { 'has-text-danger': isDanger },
                        { 'has-text-warning': isWarning }
                    ]" v-if="isDanger || isWarning">
                    <fa icon="exclamation-triangle"/>
                </span>
            </div>
        </template>
    </renderless-datepicker>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faCalendarAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import RenderlessDatepicker from '../renderless/Datepicker.vue';

library.add(faClock, faCalendarAlt, faExclamationTriangle);

export default {
    components: { RenderlessDatepicker },

    props: {
        placeholder: {
            type: String,
            default: 'Select Date',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        isDanger: {
            type: Boolean,
            default: false,
        },
        isWarning: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss">

    .control.has-icons-right .clear-button {
        pointer-events: all;

        &.is-spaced {
            margin-right: 1.2em;
        }
    }

</style>
