import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  standalone: false
})
export class CustomInputComponent {
  private _control!: FormControl;

 @Input() control!: FormControl;

  @Input() label!: string;
  @Input() type: string = 'text';
  @Input() icon?: string;
  @Input() autocomplete?: string;
  @Input() isPassword: boolean = false;

  hide = true;

  showOrHidePassword() {
    this.hide = !this.hide;
    this.type = this.hide ? 'password' : 'text';
  }
}
