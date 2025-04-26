import { AbstractControl } from "@angular/forms";

/**
 * Função que retorna a mensagem de erro correspondente ao erro do formControl
 * @param control o formControl do campo
 * @returns {string | null} mensagem de erro correspondente
 */

export function formErrorMessage(control: AbstractControl | null): string | null {
  if (!control || !control.errors || !control.touched) return null;

  if (control.hasError("required")) return "Este campo é obrigatório";

  if (control.hasError("minlength")) {
    const minLength = control.getError("minlength")?.requiredLength;
    return `Mínimo ${minLength} caracteres`;
  }

  if (control.hasError("maxlength")) {
    const maxLength = control.getError("maxlength")?.requiredLength;
    return `Máximo ${maxLength} caracteres`;
  }

  if (control.hasError("notMatching")) return "Os valores devem ser iguais";

  if (control.hasError("pattern")) return "Formato inválido";

  if (control.hasError("email")) return "E-mail inválido";

  return null;
}
