import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Subject } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-form',
  imports: [
    MatInputModule,
    MatError,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject<void>();
  loginForm!: FormGroup;
  submitting = false;
  hide = signal(true);

  toggleHide() {
    this.hide.set(!this.hide());
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitting = true;

    if (this.loginForm.invalid) {
      return;
    }

    console.log('Login form submitted', this.loginForm.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
