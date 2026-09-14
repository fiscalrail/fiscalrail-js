import type { TaxReference } from "../types.js";

function reference(tax: string, rule: string): Readonly<TaxReference> {
  return Object.freeze({ tax, rule });
}

export const vat = Object.freeze({
  exemptIntraEuGoods: reference("vat", "exempt_intra_eu_goods"),
  general: reference("vat", "general"),
  notSubjectPlaceOfSupply: reference("vat", "not_subject_place_of_supply"),
  reduced: reference("vat", "reduced"),
  superReduced: reference("vat", "super_reduced"),
});

export const irpf = Object.freeze({
  newProfessionals: reference("irpf", "new_professionals"),
  professionals: reference("irpf", "professionals"),
});
