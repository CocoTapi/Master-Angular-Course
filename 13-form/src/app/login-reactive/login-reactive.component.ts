import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// custom validator
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
};

// async validator
function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@gmail.com') {
    // of() produces observable that instantly emits a value
    return of(null);
  }

  return of({ notUnique: true })
}

// this is only for client side
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}


@Component({
  selector: 'app-login-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-reactive.component.html',
  styleUrl: './login-reactive.component.css'
})

export class LoginReactiveComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      // use this such as sending an HTTP request to a backend to check whether an email already was registered or no
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
    
    })
  });

  get emailIsInValid() {
    return (
      this.form.controls.email.touched && 
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    )
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched && 
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    )
  }

  /* 
    you can use constructor with afterNextRender() but
    you make a form first in ts, you don't need to wait for the template to render for it to be initialized
  */ 
  ngOnInit(): void {
    // const savedForm = window.localStorage.getItem('saved-login-form');

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   // this method is for reactive way
    //   // you can also do with setValue()
    //   this.form.patchValue({
    //     email: loadedForm.email
    //   })
    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email })
        )
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    // if you want to add validation here (not common)
    // this.form.controls.email.addValidators[Symbol]

    const enteredEmail = this.form.controls.email;
    const enteredPassword = this.form.controls.password;

    console.log(enteredEmail, enteredPassword)
  }
}
