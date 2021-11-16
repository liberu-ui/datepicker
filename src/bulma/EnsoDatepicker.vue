<template>
    <datepicker v-bind="$attrs"
        :locale="lang"
        alt-input
        :alt-format="format"
        :time="time"/>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Datepicker from './Datepicker.vue';

export default {
    name: 'EnsoDatepicker',

    components: { Datepicker },

    props: {
        altFormat: {
            type: String,
            default: null,
        },
        time: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState(['meta']),
        ...mapGetters('preferences', ['lang']),
        format() {
            return this.altFormat
                ?? (this.time ? this.meta.dateTimeFormat : this.meta.dateFormat);
        },
    },
};
</script>
