import { Component, ChangeDetectionStrategy, forwardRef, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, NgControl, ControlValueAccessor, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'jva-custom-form-control',
  templateUrl: './custom-form-control.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => JVACustomFormControlComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => JVACustomFormControlComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JVACustomFormControlComponent implements ControlValueAccessor, Validator {
    private value;
    private onChange;
    private onTouched;
    private validatorOnChange;
    public disabled;

    constructor(private elementRef:ElementRef, private renderer:Renderer2, private cdr:ChangeDetectorRef){}


    public writeValue(obj: any): void {
        this.value = obj ? obj : null;
    }
      public registerOnChange(fn: (_: any) => void): void {
        console.log('register: onChange');
        this.onChange = fn;
    }
    public registerOnTouched(fn: (_: any) => void): void {
      console.log('register: onTouched')
        this.onTouched = fn;
    }
    public registerOnValidatorChange(fn: ()=>void):void{
      console.log('register: validator')
      this.validatorOnChange = fn;
    }

        public setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        if(isDisabled){
        this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', '');
        }else{
          this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
        }
        this.cdr.detectChanges();
    }

    public validate(control: AbstractControl):ValidationErrors{
      console.log('execute: validator');
      if(control.value === 'test'){
        return {
          parse: true
        }
      }else{
        return null;
      }
    }

    public valueChanges(value) {
        console.log(value);
        this.onChange(value);
    }
}