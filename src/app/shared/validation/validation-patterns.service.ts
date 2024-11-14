
import { Injectable } from '@angular/core';
import { AsyncValidatorFn, FormControl } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';
import { BidService } from 'src/app/salespad/bid/bid.service';


@Injectable({
    providedIn: 'root'
})
export class ValidationPatternsService {
    logedinUserId: string;

    constructor(private readonly bidServices: BidService,) {

    }

    /**
     * Provides a regular expression that gets false a string contains no other characters than whitespaces.
     *
     * @returns RegExp object to check for whitespace only strings
     */
    noWhitespaceOnly(): RegExp {
        // use [^] instead of . (dot) to match "not any" aka "all" characters
        // (that includes newlines too). "/m" flag does not work with Angular!?
        return /[^]*[^\s][^]*/;
    }

    /**
     * Provides a regular expression that gets false when a HTML tag in different notations is found.
     *
     * @returns RegExp object to find HTML tags
     */
    noHtmlTags(): RegExp {
        return /^(?![^]*(<|&lt;|&#60;|&#x003C;)[^]*(>|&gt;|&#62;|&#x003E;))[^]*/;
    }

    /**
   * Generates a regular expression pattern to validate a string,
   * ensuring it does not match any of the provided invalid strings.
   *
   * @param marks - An array of strings representing invalid values.
   * @returns A regular expression that disallows the provided invalid strings.
   */
    invalidString(marks: string[]): RegExp {
        const escapedStrings = marks.map(str => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
        const pattern = `^(?!.*(${escapedStrings.join('|')}|-)).*$`;
        return new RegExp(pattern, 'i');
    }

    /**
     * RegExp gets false if a string has leading or trailing whitespaces (e.g. "  leading and trailing whitespaces  " => false)
     *
     * @returns RegExp object to find leading and trailing whitespaces
     */
    noLeadingAndTrailingWhitespace(): RegExp {
        return /^[^\s]+(\s+[^\s]+)*$/;
    }

    /**
     * RegExp finds three or more consecutive identical characters (e.g. 'aaa', 'gggggg').
     *
     * @returns RegExp object to find consecutive identical characters.
     */
    noMultiples(): RegExp {
        return /^((?!((.)\3{2,})).)*$/;
    }

    /**
    * RegExp checks whether we have entered valid integer/ floating number (e.g. 0.23, 1.5).
    * Numbers like .098 etc won't be considered. It only accepts 0.098
    * @returns RegExp object to find valid integer or floating numbers.
    */
    noNonNumeric(): RegExp {
        return /^[0-9]+(\.[0-9]+)?$/;
    }

    /**
     * RegExp checks whether we have entered valid postive integer (e.g. 345621, 6453297).
     *
     * @returns RegExp object to find valid positive integer
     */
    onlyPositiveIntegers(): RegExp {
        return (/^[0-9]+(\.\d+)?$/)
    }

    onlyPositiveNumbersWithoutMinus(): RegExp {
        return /^(?!-)[0-9]+(\.[0-9]+)?$/;
    }

    onlyPositiveIntegerAnyLength() {
        return /^[1-9]\d*$/;
    }
    onlyPositiveIntegerWithoutZero(): RegExp {
        return /^[1-9]\d*(\.\d+)?$/;
    }

    phoneNumber(): RegExp {
        return /^(\+?\d{1,4}[\s-])?(?!0+\s+,?$)\d{10}\s*,?$/;
    }



    /**
    * RegExp checks whether only alphabets are entered.
    *
    * @returns RegExp object to find valid positive integer
    */
    //only alphabets and allows space
    onlyAlphabets(): RegExp {
        return /^[a-zA-Z ]*$/;
    }

    onlyNumbers(): RegExp {
        return /^[0-9]+$/;
    }

    /**
     * RegExp checks whether we can start decimal numbers with zero followed by number or period followed by number (.) eg: 0.2 or .2
     */
    alternateDecimalPattern(): RegExp {
        return /^(?:\d+(\.\d+)?|\.\d+)$/;
    }

    /**
     * RegExp checks a number can start with +91
     */
    mobileNumber(): RegExp {
        return /^((\\+91-?)|0)?[0-9]{10}$/;
    }

      /**
     * RegExp checks only alphanumeric value with space
     */
    alphanumeric() : RegExp {
        return /^(?:[a-zA-Z]+|[0-9]+|\s+)*$/
    }
    /**
     * no special characters
     */
    noSpecialCharacters(): RegExp{
        return /[!!!!!@#$%^&*(),.?":{}|<>]/
    }

    /**
           * Custom asynchronous validator function
           */

    registeredMobileNumberValidator(): AsyncValidatorFn {
        return (control: FormControl): Observable<{ [key: string]: any } | null> => {

            let mduser = { phonenumber: control.value };
            if (!control.value || control.value.length !== 10) {
                return of(null); // If the input is empty or doesn't have 10 digits, no need to call the API
            }
            return timer(300) // Delay the API call by 300 milliseconds (optional)
                .pipe(
                    switchMap(() => this.bidServices.getUserInfoBy(mduser)),
                    map((response) => {
                        if (response[0]) {
                            if (this.logedinUserId !== response[0].id) {

                                // If the API response is successful, it means the number exists, so set an error
                                return { numberExists: true };
                            } else {
                                return null;
                            }
                        } else {
                            return null; // No error if the number doesn't exist
                        }
                    }),
                    catchError(() => of(null)) // No error in case of an API error
                );
        };
    }

}
