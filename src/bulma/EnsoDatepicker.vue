<template>
    <datepicker :locale="lang"
        :format="format || meta.jsDateFormat"
        v-bind="$attrs"
        v-on="$listeners"/>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Datepicker from './Datepicker.vue';

export default {
    name: 'Datepicker',

    components: { Datepicker },

    props: {
        format: {
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
