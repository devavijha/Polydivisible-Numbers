# Polydivisible Numbers Application

A full-stack web application for exploring polydivisible numbers across different number bases (2-100).

## What are Polydivisible Numbers?

A **polydivisible number** is a number with the property that every prefix (reading from left to right) is divisible by its length.

### Example in Base 10

Consider the number **1232**:
- 1 ÷ 1 = 1 ✓
- 12 ÷ 2 = 6 ✓  
- 123 ÷ 3 = 41 ✓
- 1232 ÷ 4 = 308 ✓

Since all prefixes are divisible by their respective lengths, 1232 is polydivisible.

## Digit Representation for Different Bases

### Bases ≤ 36
Use standard alphanumeric notation:
- Digits 0-9 for values 0-9
- Letters a-z for values 10-35
- Example: "1a2b" represents [1, 10, 2, 11] in base 16

### Bases > 36
Use comma-separated integer notation:
- Each digit is represented as an integer
- Example: "1,2,45,67" represents [1, 2, 45, 67] in base 100

## Features

### 1. Check Polydivisible Numbers
- Input any number in string format
- Specify base from 2 to 100
- Get instant validation with detailed breakdown

### 2. Generate Polydivisible Numbers
- Generate all polydivisible numbers up to specified length
- Support for any base from 2 to 100
- Download results as text files

### 3. Educational Information
- Complete explanation of polydivisible numbers
- Algorithm details and implementation notes
- Sample API usage with cURL commands

## Technical Implementation

### Backend (Node.js/Express)

#### Core Algorithm - Checking
```javascript
isPolydivisible(digits, base) {
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
```

#### Core Algorithm - Generation
Uses backtracking with early pruning:
```javascript
generate(base, maxLength) {
  const backtrack = (currentDigits, currentValue) => {
    // Try each possible next digit
    for (let digit = 0; digit < base; digit++) {
      const newValue = currentValue * base + digit;
      const newLength = currentDigits.length + 1;
      
      // Check divisibility condition
      if (newValue % newLength === 0) {
        // Continue recursively
        currentDigits.push(digit);
        backtrack(currentDigits, newValue);
        currentDigits.pop(); // Backtrack
      }
    }
  };
}
```

### API Endpoints

#### Check Endpoint
```
GET /api/polydivisible/check?digits=<string>&base=<int>
```

**Parameters:**
- `digits`: Number representation (alphanumeric for base ≤ 36, comma-separated for base > 36)
- `base`: Integer from 2 to 100

**Response:**
```json
{
  "isPolydivisible": true,
  "digits": "1232",
  "base": 10,
  "parsedDigits": [1, 2, 3, 2]
}
```

#### Generate Endpoint
```
GET /api/polydivisible/generate?base=<int>&maxLength=<int>
```

**Parameters:**
- `base`: Integer from 2 to 100
- `maxLength`: Maximum length (1-20)

**Response:**
```json
{
  "polydivisibleNumbers": ["1", "12", "123", "1232"],
  "base": 10,
  "maxLength": 4,
  "count": 4
}
```

### Frontend (React/TypeScript)

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Validation**: Input validation and error handling
- **Multiple Views**: Separate sections for checking and generating
- **Export Functionality**: Download results as text files
- **Educational Content**: Built-in documentation and examples

## Installation and Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd polydivisible-numbers

# Install dependencies
npm install

# Start the development server (runs both frontend and backend)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Build for Production
```bash
npm run build
```

## Sample Usage

### cURL Examples

Check if 1232 is polydivisible in base 10:
```bash
curl "http://localhost:3001/api/polydivisible/check?digits=1232&base=10"
```

Generate polydivisible numbers in base 16 up to length 3:
```bash
curl "http://localhost:3001/api/polydivisible/generate?base=16&maxLength=3"
```

Check a number in base 60 (using comma-separated format):
```bash
curl "http://localhost:3001/api/polydivisible/check?digits=1,2,45&base=60"
```

## Algorithm Complexity

### Time Complexity
- **Checking**: O(n) where n is the number of digits
- **Generation**: O(b^n) where b is the base and n is the maximum length, but with significant pruning

### Space Complexity
- **Checking**: O(1) additional space
- **Generation**: O(n) for recursion depth

## Performance Optimizations

1. **Early Pruning**: The generation algorithm stops exploring branches as soon as the divisibility condition fails
2. **Incremental Calculation**: Prefix values are built incrementally rather than recalculated
3. **Input Validation**: Comprehensive validation prevents unnecessary computation
4. **Efficient Parsing**: Optimized digit parsing for different base representations

## Testing

The application includes comprehensive validation for:
- Input format validation for different bases
- Boundary condition testing (bases 2, 36, 37, 100)
- Error handling for invalid inputs
- Performance testing with various parameters

## Architecture

```
├── server/
│   ├── index.js                 # Express server setup
│   └── services/
│       └── PolydivisibleService.js  # Core algorithms
├── src/
│   ├── components/
│   │   ├── CheckSection.tsx     # Number checking interface
│   │   ├── GenerateSection.tsx  # Number generation interface
│   │   └── InfoSection.tsx      # Documentation and examples
│   └── App.tsx                  # Main application component
└── README.md                    # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details