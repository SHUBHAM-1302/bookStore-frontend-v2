import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'licensePlate' })
export class LicensePlatePipe implements PipeTransform {
  transform(value: string): string {
    // Replace dashes with spaces
    return value?.replace(/-/g, ' ');
  }
}