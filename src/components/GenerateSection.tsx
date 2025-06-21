import React, { useState } from 'react';
import { Hash, Loader2, AlertCircle, Download } from 'lucide-react';

interface GenerateResult {
  polydivisibleNumbers: string[];
  base: number;
  maxLength: number;
  count: number;
}

export function GenerateSection() {
  const [base, setBase] = useState(10);
  const [maxLength, setMaxLength] = useState(4);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GenerateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(
        `http://localhost:3001/api/polydivisible/generate?base=${base}&maxLength=${maxLength}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate numbers');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadResults = () => {
    if (!result) return;

    const content = [
      `Polydivisible Numbers (Base ${result.base}, Max Length ${result.maxLength})`,
      `Generated ${result.count} numbers`,
      '',
      ...result.polydivisibleNumbers
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `polydivisible-base${result.base}-length${result.maxLength}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Generate Polydivisible Numbers</h2>
        <p className="text-gray-600">
          Generate all polydivisible numbers up to a specified length in any base
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <label htmlFor="gen-base" className="block text-sm font-medium text-gray-700 mb-2">
              Base (2-100)
            </label>
            <input
              type="number"
              id="gen-base"
              min="2"
              max="100"
              value={base}
              onChange={(e) => setBase(parseInt(e.target.value) || 10)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="max-length" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Length (1-20)
            </label>
            <input
              type="number"
              id="max-length"
              min="1"
              max="20"
              value={maxLength}
              onChange={(e) => setMaxLength(parseInt(e.target.value) || 4)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            <p className="text-xs text-gray-500 mt-1">
              Higher values may take longer to compute
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Hash className="w-4 h-4" />
                <span>Generate Numbers</span>
              </>
            )}
          </button>

          {result && (
            <button
              onClick={downloadResults}
              className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Results</span>
            </button>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
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
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Generated {result.count} polydivisible numbers
                </h3>
                <div className="text-sm text-gray-600">
                  Base {result.base}, Max Length {result.maxLength}
                </div>
              </div>

              <div className="bg-white rounded border max-h-96 overflow-y-auto">
                <pre className="p-4 text-sm font-mono leading-relaxed">
                  {result.polydivisibleNumbers.join('\n')}
                </pre>
              </div>

              {result.count === 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800">
                    No polydivisible numbers found for the given parameters. Try a different base or length.
                  </p>
                </div>
              )}
            </div>
          )}

          {!result && !error && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <Hash className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Ready to generate</p>
              <p className="text-gray-400 text-sm">
                Set your parameters and click "Generate Numbers" to see all polydivisible numbers
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}