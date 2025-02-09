import { Directive, input, inject, effect, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth'});
  private authService = inject(AuthService);

  // gives you access to content of the template.
  private templateRef = inject(TemplateRef);

    // gives you access to the place in the DOM where this directive is being used.
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()){
        // after this, ng-template shows the content
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    })
   }

}
