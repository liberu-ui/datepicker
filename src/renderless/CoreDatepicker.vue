<script>
import Flatpickr from 'flatpickr';
import i18n from '../locale/locale';


export default {
    name: 'CoreDatepicker',

    props: {
        time12hr: {
            type: Boolean,
            default: false,
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
                weekNumbers: this.weekNumbers,
                defaultDate: this.value,
                dateFormat: this.format,
                allowInput: false,
                minDate: this.min,
                maxDate: this.max,
                noCalendar: this.timeOnly,
                enableTime: this.time || this.timeOnly,
                time_24hr: !this.time12hr,
                clickOpens: !this.readonly,
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
        readonly(readonly) {
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
