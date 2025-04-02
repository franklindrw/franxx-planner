import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";

export const MATERIAL_CONFIG = [
  {
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appearance: 'outline', subscriptSizing: 'dynamic' }
  },
  {
    provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
    useValue: { duration: 5000, horizontalPosition: 'end', verticalPosition: 'top' }
  }
]
