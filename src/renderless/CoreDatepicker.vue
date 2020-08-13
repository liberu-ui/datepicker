<script>
import Flatpickr from 'flatpickr';
import i18n from '../locale/locale';

export default {
    name: 'CoreDatepicker',

    props: {
        altInput: {
            type: Boolean,
            default: false,
        },
        altFormat: {
            type: String,
            default: null,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        disableClear: {
            type: Boolean,
            default: false,
        },
        format: {
            type: String,
            default: 'Y-m-d',
        },
        locale: {
            type: String,
            default: 'en',
            validator: (val) => Object.keys(i18n).includes(val),
        },
        max: {
            type: String,
            default: null,
        },
        min: {
            type: String,
            default: null,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        time: {
            type: Boolean,
            default: false,
        },
        time12hr: {
            type: Boolean,
            default: false,
        },
        timeOnly: {
            type: Boolean,
            default: false,
        },
        value: {
            type: null,
            required: true,
            default: null,
            validate(value) {
                return value === null || typeof value === 'string'
                        || value instanceof Date || value instanceof Array;
            },
        },
        weekNumbers: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        picker: null,
    }),

    computed: {
        clearButton() {
            return this.value
                && !this.disableClear
                && !this.disabled
                && !this.readonly;
        },
        config() {
            const self = this;

            return {
                allowInput: false,
                altFormat: this.altFormat,
                altInput: this.altInput,
                clickOpens: !this.readonly,
                dateFormat: this.format.replace('s', 'S'),
                defaultDate: this.value,
                enableTime: this.time || this.timeOnly,
                maxDate: this.max,
                minDate: this.min,
                noCalendar: this.timeOnly,
                time_24hr: !this.time12hr,
                weekNumbers: this.weekNumbers,
                onChange(selectedDates, dateStr) {
                    self.$emit('input', dateStr);
                },
            };
        },
    },

    watch: {
        locale(locale) {
            this.destroy();
            Flatpickr.localize(i18n[locale]);
            this.init();
        },
        max: 'reset',
        min: 'reset',
        readonly: 'reset',
        disabled: 'reset',
        value(value) {
            if(value) {
                this.picker.setDate(value);
            } else {
                this.$nextTick(() => this.clear());
            }
        },
    },

    created() {
        Flatpickr.localize(i18n[this.locale]);
    },

    mounted() {
        this.init();
    },

    beforeDestroy() {
        this.destroy();
    },

    methods: {
        clear() {
            this.picker.clear();
        },
        destroy() {
            this.picker.destroy();
        },
        init() {
            this.picker = new Flatpickr(
                this.$el.querySelector('input'), this.config,
            );
        },
        reset() {
            this.destroy();
            this.$nextTick(() => this.init());
        },
    },

    render() {
        return this.$scopedSlots.default({
            clearButton: this.clearButton,
            clearEvents: {
                click: this.clear,
            },
            inputBindings: {
                disabled: this.disabled,
                readonly: this.readonly,
            },
            readonly: this.readonly || this.disabled,
            timeOnly: this.timeOnly,
        });
    },
};
</script>
