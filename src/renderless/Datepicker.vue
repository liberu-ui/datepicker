<script>
import Flatpickr from 'flatpickr';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faCalendarAlt, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import i18n from '../locale/locale';

library.add(faClock, faCalendarAlt, faExclamationTriangle);

export default {
    props: {
        disabled: {
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
            return this.value && !this.disabled && !this.readonly;
        },
        config() {
            const self = this;

            return {
                weekNumbers: this.weekNumbers,
                defaultDate: this.value,
                dateFormat: this.format,
                allowInput: false,
                clickOpens: true,
                minDate: this.min,
                maxDate: this.max,
                noCalendar: this.timeOnly,
                enableTime: this.time || this.timeOnly,
                onChange(selectedDates, dateStr) {
                    self.$emit('input', dateStr);
                },
            };
        },
    },

    watch: {
        value(newValue) {
            this.picker.setDate(newValue);
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
            inputBindings: {
                disabled: this.readonly || this.disabled,
            },
            clearEvents: {
                click: this.clear,
            },
        });
    },
};
</script>
