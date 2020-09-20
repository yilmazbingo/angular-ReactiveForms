import { FormControl } from '@angular/forms';

// input masking packages just change how the data displated on input but not the value is stored in FormControl
// 999-999-999   this will be displayed as 999999999 in FormControl
// name lastname will be stored as namelastname
export class DateFormControl extends FormControl {
  // we are going to customize some of the FormControls methods
  // when user changes the value input "setValue" gets called
  setValue(value: string | null, options: any) {
    //   when we reset the form, null will be set as the value
    if (value === null) {
      super.setValue('', { ...options, emitModelToViewChange: true });
      return;
    }
    //   The gi modifier is used to do a case insensitive search
    if (value.match(/[^0-9|\/]/gi)) {
      // current value "this.value" is stored in this.value.
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }
    // emitModelToViewChange will change the dom based on 5 charc that u entered. otherwise, 5 charcs would be stored as the value inside formControl, but in the input, you would be typing more than 5 chars
    if (value.length > 5) {
      super.setValue(this.value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length === 2 && this.value.length === 3) {
      // "value" is the value that in the input. this.value is the value that stored in FormControl. we are setting value in the FormControl as "12/" so we can delete the "/"
      super.setValue(value, { ...options, emitModelToViewChange: true });
      return;
    }

    if (value.length === 2) {
      super.setValue(value + '/', { ...options, emitModelToViewChange: true });
      return;
    }
    // we are going to modify the value and then call the original setVAlue()
    super.setValue(value, { ...options, emitModelToViewChange: true });
  }
}

// *********ORIGINAL setValue*********
// setValue(value: any, options?: {
//     onlySelf?: boolean;
//     emitEvent?: boolean;
//     emitModelToViewChange?: boolean;
//     emitViewToModelChange?: boolean;
// }): void;

// emitModelToViewChange : whenever we call setValue() if we pass it as true, we want to update the input element based on the value in the setValue(). it will change the dom
