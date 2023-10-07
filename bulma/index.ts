```typescript
/**
 * This module provides types and components related to datepicker functionality.
 * @module Datepicker
 */

import Datepicker from '../src/bulma/Datepicker.vue';
import EnsoDatepicker from '../src/bulma/EnsoDatepicker.vue';

/**
 * A datepicker component based on Bulma design.
 * @component
 * @example
 * <template>
 *   <datepicker />
 * </template>
 * 
 * <script>
 * import { Datepicker } from './path/to/Datepicker';
 *
 * export default {
 *   components: {
 *     Datepicker
 *   }
 * }
 * </script>
 */
export { Datepicker };

/**
 * A custom datepicker component.
 * @component
 * @example
 * <template>
 *   <enso-datepicker />
 * </template>
 * 
 * <script>
 * import { EnsoDatepicker } from './path/to/EnsoDatepicker';
 *
 * export default {
 *   components: {
 *     EnsoDatepicker
 *   }
 * }
 * </script>
 */
export { EnsoDatepicker };
```