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
            default: 'd-m-Y',
        },
        locale: {
            type: String,
            default: 'en',
            validator: val => Object.keys(i18n).includes(val),
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
        value(value) {
            this.picker.setDate(value);
        },
        locale(locale) {
            this.destroy();
            Flatpickr.localize(i18n[locale]);
            this.init();
        },
        min() {
            this.reset();
        },
        max() {
            this.reset();
        },
        readonly() {
            this.destroy();
            this.init();
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
        init() {
            this.picker = new Flatpickr(
                this.$el.querySelector('input'), this.config,
            );
        },
        clear() {
            this.picker.clear();
        },
        destroy() {
            this.picker.destroy();
        },
        reset() {
            this.destroy();
            this.init();
        },
    },

    render() {
        return this.$scopedSlots.default({
            timeOnly: this.timeOnly,
            clearButton: this.clearButton,
            readonly: this.readonly || this.disabled,
            inputBindings: {
                disabled: this.disabled,
                readonly: this.readonly,
            },
            clearEvents: {
                click: this.clear,
            },
        });
    },
};
</script>
