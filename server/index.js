import express from 'express';
import cors from 'cors';
import { PolydivisibleService } from './services/PolydivisibleService.js';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize service
const polydivisibleService = new PolydivisibleService();

/**
 * GET /api/polydivisible/check
 * Check if a given string represents a polydivisible number
 * Query params:
 * - digits: string representation (alphanumeric for base ≤ 36, comma-separated for base > 36)
 * - base: integer from 2 to 100
 */
app.get('/api/polydivisible/check', (req, res) => {
  try {
    const { digits, base } = req.query;
    
    if (!digits || !base) {
      return res.status(400).json({ 
        error: 'Missing required parameters: digits and base' 
      });
    }

    const baseNum = parseInt(base);
    if (isNaN(baseNum) || baseNum < 2 || baseNum > 100) {
      return res.status(400).json({ 
        error: 'Base must be an integer between 2 and 100' 
      });
    }

    // Parse digits based on base
    let digitArray;
    try {
      digitArray = polydivisibleService.parseDigits(digits, baseNum);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    const result = polydivisibleService.isPolydivisible(digitArray, baseNum);
    
    res.json({ 
      isPolydivisible: result,
      digits: digits,
      base: baseNum,
      parsedDigits: digitArray
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

/**
 * GET /api/polydivisible/generate
 * Generate all polydivisible numbers up to specified length
 * Query params:
 * - base: integer from 2 to 100
 * - maxLength: maximum length of generated numbers
 */
app.get('/api/polydivisible/generate', (req, res) => {
  try {
    const { base, maxLength } = req.query;
    
    if (!base || !maxLength) {
      return res.status(400).json({ 
        error: 'Missing required parameters: base and maxLength' 
      });
    }

    const baseNum = parseInt(base);
    const maxLen = parseInt(maxLength);
    
    if (isNaN(baseNum) || baseNum < 2 || baseNum > 100) {
      return res.status(400).json({ 
        error: 'Base must be an integer between 2 and 100' 
      });
    }

    if (isNaN(maxLen) || maxLen < 1 || maxLen > 20) {
      return res.status(400).json({ 
        error: 'Max length must be an integer between 1 and 20' 
      });
    }

    const results = polydivisibleService.generate(baseNum, maxLen);
    
    // Format results based on base
    const formattedResults = results.map(digitArray => 
      polydivisibleService.formatDigits(digitArray, baseNum)
    );

    res.json({ 
      polydivisibleNumbers: formattedResults,
      base: baseNum,
      maxLength: maxLen,
      count: formattedResults.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Polydivisible Numbers API server running on port ${port}`);
});