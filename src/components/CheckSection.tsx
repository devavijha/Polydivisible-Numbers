import React, { useState } from 'react';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';

interface CheckResult {
  isPolydivisible: boolean;
  digits: string;
  base: number;
  parsedDigits: number[];
}

export function CheckSection() {
  const [digits, setDigits] = useState('');
  const [base, setBase] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!digits.trim()) {
      setError('Please enter a number to check');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/polydivisible/check?digits=${encodeURIComponent(digits)}&base=${base}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check number');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    if (base <= 36) {
      return base <= 10 ? '123' : '1a2b';
    }
    return '1,2,3';
  };

  const getHelpText = () => {
    if (base <= 36) {
      return `Use digits 0-${base - 1}${base > 10 ? ' and letters a-' + String.fromCharCode('a'.charCodeAt(0) + base - 11) : ''}`;
    }
    return `Use comma-separated digits 0-${base - 1} (e.g., "1,2,3,45")`;
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Polydivisible Number</h2>
        <p className="text-gray-600">
          Enter a number and base to check if it's polydivisible
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label htmlFor="digits" className="block text-sm font-medium text-gray-700 mb-2">
              Number to Check
            </label>
            <input
              type="text"
              id="digits"
              value={digits}
              onChange={(e) => setDigits(e.target.value)}
              placeholder={getPlaceholder()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <p className="text-xs text-gray-500 mt-1">{getHelpText()}</p>
          </div>

          <div>
            <label htmlFor="base" className="block text-sm font-medium text-gray-700 mb-2">
              Base (2-100)
            </label>
            <input
              type="number"
              id="base"
              min="2"
              max="100"
              value={base}
              onChange={(e) => setBase(parseInt(e.target.value) || 10)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <button
            onClick={handleCheck}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Checking...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Check Number</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-red-800">Error</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className={`border rounded-lg p-6 ${
              result.isPolydivisible 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                {result.isPolydivisible ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <h3 className={`text-lg font-semibold ${
                  result.isPolydivisible ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.isPolydivisible ? 'Polydivisible!' : 'Not Polydivisible'}
                </h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Input:</span>
                  <span className="font-mono">{result.digits}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Base:</span>
                  <span className="font-mono">{result.base}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Parsed digits:</span>
                  <span className="font-mono">[{result.parsedDigits.join(', ')}]</span>
                </div>
              </div>

              {result.isPolydivisible && (
                <div className="mt-4 p-3 bg-white/50 rounded border">
                  <p className="text-xs text-gray-600">
                    This number satisfies the polydivisible property: each prefix of length k is divisible by k.
                  </p>
                </div>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Enter a number and click "Check Number" to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}