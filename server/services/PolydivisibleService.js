/**
 * Service class for polydivisible number operations
 * 
 * A polydivisible number is a number with the property that:
 * - The first digit is divisible by 1
 * - The first two digits form a number divisible by 2
 * - The first three digits form a number divisible by 3
 * - And so on...
 */
export class PolydivisibleService {
  
  /**
   * Parse digit string into array of integers
   * @param {string} digits - Input string (alphanumeric or comma-separated)
   * @param {number} base - Number base (2-100)
   * @returns {number[]} Array of digit values
   */
  parseDigits(digits, base) {
    if (!digits || typeof digits !== 'string') {
      throw new Error('Digits must be a non-empty string');
    }

    // For bases > 36, expect comma-separated format
    if (base > 36) {
      if (digits.includes(',')) {
        const parts = digits.split(',').map(s => s.trim());
        const digitArray = parts.map(part => {
          const num = parseInt(part);
          if (isNaN(num) || num < 0 || num >= base) {
            throw new Error(`Invalid digit "${part}" for base ${base}`);
          }
          return num;
        });
        return digitArray;
      } else {
        // Single digit case
        const num = parseInt(digits);
        if (isNaN(num) || num < 0 || num >= base) {
          throw new Error(`Invalid digit "${digits}" for base ${base}`);
        }
        return [num];
      }
    } else {
      // For bases ≤ 36, parse alphanumeric
      const digitArray = [];
      for (let i = 0; i < digits.length; i++) {
        const char = digits[i].toLowerCase();
        let digitValue;
        
        if (char >= '0' && char <= '9') {
          digitValue = parseInt(char);
        } else if (char >= 'a' && char <= 'z') {
          digitValue = char.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
        } else {
          throw new Error(`Invalid character "${digits[i]}" for base ${base}`);
        }
        
        if (digitValue >= base) {
          throw new Error(`Digit value ${digitValue} is too large for base ${base}`);
        }
        
        digitArray.push(digitValue);
      }
      return digitArray;
    }
  }

  /**
   * Format digit array back to string representation
   * @param {number[]} digits - Array of digit values
   * @param {number} base - Number base (2-100)
   * @returns {string} Formatted string
   */
  formatDigits(digits, base) {
    if (base > 36) {
      return digits.join(',');
    } else {
      return digits.map(d => {
        if (d < 10) return d.toString();
        return String.fromCharCode('a'.charCodeAt(0) + d - 10);
      }).join('');
    }
  }

  /**
   * Check if a sequence of digits represents a polydivisible number
   * @param {number[]} digits - Array of digit values
   * @param {number} base - Number base (2-100)
   * @returns {boolean} True if polydivisible, false otherwise
   */
  isPolydivisible(digits, base) {
    if (!Array.isArray(digits) || digits.length === 0) {
      return false;
    }

    // Check each prefix
    let prefixValue = 0;
    for (let k = 1; k <= digits.length; k++) {
      // Build prefix value: value = prev × base + digit
      prefixValue = prefixValue * base + digits[k - 1];
      
      // Check if prefix is divisible by k
      if (prefixValue % k !== 0) {
        return false;
      }
    }
    
    return true;
  }

  /**
   * Generate all polydivisible numbers up to specified length using backtracking
   * @param {number} base - Number base (2-100)
   * @param {number} maxLength - Maximum length of numbers to generate
   * @returns {number[][]} Array of digit arrays representing polydivisible numbers
   */
  generate(base, maxLength) {
    const results = [];
    
    /**
     * Recursive backtracking function
     * @param {number[]} currentDigits - Current sequence being built
     * @param {number} currentValue - Current prefix value
     */
    const backtrack = (currentDigits, currentValue) => {
      const length = currentDigits.length;
      
      // If we have a valid sequence, add it to results
      if (length > 0) {
        results.push([...currentDigits]);
      }
      
      // If we've reached max length, stop
      if (length >= maxLength) {
        return;
      }
      
      // Try each possible next digit
      for (let digit = 0; digit < base; digit++) {
        // Skip leading zeros for multi-digit numbers
        if (length === 0 && digit === 0) {
          continue;
        }
        
        // Calculate new prefix value
        const newValue = currentValue * base + digit;
        const newLength = length + 1;
        
        // Check if this prefix would be divisible by its length
        if (newValue % newLength === 0) {
          // This digit works, continue recursively
          currentDigits.push(digit);
          backtrack(currentDigits, newValue);
          currentDigits.pop(); // Backtrack
        }
      }
    };
    
    // Start the backtracking process
    backtrack([], 0);
    
    return results;
  }

  /**
   * Convert a number to its representation in the given base
   * @param {number} num - Number to convert
   * @param {number} base - Target base
   * @returns {number[]} Array of digits in the target base
   */
  toBase(num, base) {
    if (num === 0) return [0];
    
    const digits = [];
    while (num > 0) {
      digits.unshift(num % base);
      num = Math.floor(num / base);
    }
    return digits;
  }

  /**
   * Convert digit array to decimal number
   * @param {number[]} digits - Array of digits
   * @param {number} base - Source base
   * @returns {number} Decimal representation
   */
  fromBase(digits, base) {
    let result = 0;
    for (const digit of digits) {
      result = result * base + digit;
    }
    return result;
  }
}