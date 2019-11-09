<template>
    <datepicker :locale="lang"
        :alt-input="!!altFormat"
        :alt-format="altFormat || meta.dateFormat"
        v-bind="$attrs"
        v-on="$listeners"/>
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
    },

    computed: {
        ...mapState(['meta']),
        ...mapGetters('preferences', ['lang']),
    },
};
</script>
