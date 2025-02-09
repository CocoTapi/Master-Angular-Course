import { Directive, ElementRef, input, inject } from "@angular/core";

@Directive({
    // attribute selector. Need unique name to distinguish already existed ones. "a" is for anchor element  
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)'
    }

})

export class SafeLinkDirective {
    // if you don't want to add queryParam attribute in html, you can add alias, so you can just set appSafeLink="myapp" in html
    queryParam = input('my-app', { alias: 'appSafeLink' });

    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    constructor() {
        console.log("SafeLinkDirective is active!")
    }

    onConfirmLeavePage() {
        const wantsToLeave = window.confirm('Do you want to leave the app?')

        if(wantsToLeave) {
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();

            // const address = (event?.target as HTMLAnchorElement).href;
            // (event?.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();

            return;
        }

        event?.preventDefault();
    }   
}