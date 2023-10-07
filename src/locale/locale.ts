/**
 * This file exports localizations for different languages using the Flatpickr library.
 */

import { Romanian } from 'flatpickr/dist/l10n/ro';
import { English } from 'flatpickr/dist/l10n/default';
import { German } from 'flatpickr/dist/l10n/de';
import { Dutch } from 'flatpickr/dist/l10n/nl';
import { French } from 'flatpickr/dist/l10n/fr';
import { Portuguese } from 'flatpickr/dist/l10n/pt';
import { Arabic } from 'flatpickr/dist/l10n/ar';
import { Mongolian } from 'flatpickr/dist/l10n/mn';
import { Hungarian } from 'flatpickr/dist/l10n/hu';
import { Ukrainian } from 'flatpickr/dist/l10n/uk';
import { Spanish } from 'flatpickr/dist/l10n/es';

/**
 * Exported object containing the language code as keys and corresponding language objects as values.
 */
const localizations: Record<string, any> = {
    ro: Romanian, // Romanian
    en: English, // English
    de: German, // German
    nl: Dutch, // Dutch
    fr: French, // French
    br: Portuguese, // Portuguese
    ar: Arabic, // Arabic
    mn: Mongolian, // Mongolian
    hu: Hungarian, // Hungarian
    uk: Ukrainian, // Ukrainian
    es: Spanish, // Spanish
};

export default localizations;