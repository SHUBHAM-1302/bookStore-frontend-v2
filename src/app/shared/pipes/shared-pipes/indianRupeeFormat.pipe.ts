import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianRupeeFormat'
})
export class IndianRupeeFormatPipe implements PipeTransform {

  transform(value: number | string): string {
    // Convert value to number if it's a string
    if (value) {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;

      // Check if numericValue is NaN or not a number
      if (isNaN(numericValue)) {
        return '0.00'; // or handle error case as needed
      }

      // Determine if the value is negative
      const isNegative = numericValue < 0;

      // Format the number to Indian Rupee format: 1,00,000.00
      let formattedValue = Math.abs(numericValue).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        style: 'currency',
        currency: 'INR',
        currencyDisplay: 'symbol'
      });

      // Remove the currency symbol (₹) for the final output
      formattedValue = formattedValue.replace('₹', '').trim();

      // Return the formatted value with a negative sign if needed
      return isNegative ? `- ${formattedValue}` : formattedValue;
    }
    return '0.00'; // Return empty string if value is null or undefined
  }

}
