import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CustomInputComponent,
    },
  ],
})
export class CustomInputComponent implements OnInit {
  @Input() public tabNumber: number;
  @Input() public pointNumber: number;
  @Output() public deletePoint = new EventEmitter<number>();

  public pointForm: FormGroup;

  onChange = () => {};

  onTouched = () => {};

  touched = false;

  disabled = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pointForm = this.fb.group({
      pointNumber: [
        { value: this.pointNumber + 1, disabled: false },
        Validators.required,
      ],
      xAxis: [null, Validators.required],
      yAxis: [null, Validators.required],
    });
  }

  writeValue(data: any): void {
    if (data) {
      this.pointForm.setValue(
        {
          pointNumber: this.pointNumber + 1,
          xAxis: data.xAxis,
          yAxis: data.yAxis,
        },
        { emitEvent: false }
      );
    }
  }

  registerOnChange(onChange: any): void {
    this.pointForm.valueChanges.subscribe(onChange);
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  removePoint(): void {
    this.deletePoint.emit(this.pointNumber);
  }
}
