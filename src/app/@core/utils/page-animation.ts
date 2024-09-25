import { animate, state, style, transition, trigger } from "@angular/animations";

export const loaderAnimation =
 trigger("loaderAnimation", [
  state("void", style({ opacity: 0 })),
  state("*", style({ opacity: 1 })),
  transition(":enter, :leave", animate("300ms ease-in-out")),
 ]);