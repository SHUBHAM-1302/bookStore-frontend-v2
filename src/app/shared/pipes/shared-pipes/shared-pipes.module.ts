import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPipesComponent } from './shared-pipes.component';
import { LicensePlatePipe } from './licensePlate.pipe';
import { IndianRupeeFormatPipe } from './indianRupeeFormat.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LicensePlatePipe,
    IndianRupeeFormatPipe
  ],
  exports: [LicensePlatePipe, IndianRupeeFormatPipe]
})
export class SharedPipesModule { }
