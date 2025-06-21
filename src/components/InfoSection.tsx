import React from 'react';
import { BookOpen, Calculator, Zap, Code } from 'lucide-react';

export function InfoSection() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Polydivisible Numbers</h2>
        <p className="text-gray-600">
          Understanding the mathematical concept and implementation details
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Definition */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-blue-900">Definition</h3>
            </div>
            <p className="text-blue-800 leading-relaxed">
              A <strong>polydivisible number</strong> is a number with the property that every prefix 
              (reading from left to right) is divisible by its length.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Calculator className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900">Example (Base 10)</h3>
            </div>
            <div className="space-y-2 text-green-800">
              <p>Consider the number <strong>1232</strong>:</p>
              <ul className="space-y-1 ml-4 text-sm font-mono">
                <li>• 1 ÷ 1 = 1 ✓</li>
                <li>• 12 ÷ 2 = 6 ✓</li>
                <li>• 123 ÷ 3 = 41 ✓</li>
                <li>• 1232 ÷ 4 = 308 ✓</li>
              </ul>
              <p className="text-sm">All prefixes are divisible, so 1232 is polydivisible!</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-purple-900">Different Bases</h3>
            </div>
            <div className="space-y-3 text-purple-800">
              <p><strong>Base ≤ 36:</strong> Use alphanumeric notation (0-9, a-z)</p>
              <p className="text-sm font-mono bg-white/50 p-2 rounded">Example: "1a2b" in base 16</p>
              
              <p><strong>Base &gt; 36:</strong> Use comma-separated digits</p>
              <p className="text-sm font-mono bg-white/50 p-2 rounded">Example: "1,2,45,67" in base 100</p>
            </div>
          </div>
        </div>

        {/* Implementation */}
        <div className="space-y-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Code className="w-6 h-6 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Algorithm Details</h3>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Checking Algorithm</h4>
                <p className="text-sm leading-relaxed">
                  For each prefix of length k, we build the value incrementally using 
                  <code className="bg-white px-1 rounded text-xs">value = prev × base + digit</code> 
                  and check if <code className="bg-white px-1 rounded text-xs">value % k == 0</code>.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Generation Algorithm</h4>
                <p className="text-sm leading-relaxed">
                  Uses backtracking to build numbers digit by digit, pruning branches 
                  that violate the divisibility condition early to improve efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">API Endpoints</h3>
            <div className="space-y-3 text-sm">
              <div>
                <code className="bg-white px-2 py-1 rounded text-xs font-mono">
                  GET /api/polydivisible/check
                </code>
                <p className="text-yellow-800 mt-1">
                  Check if a number is polydivisible
                </p>
              </div>
              
              <div>
                <code className="bg-white px-2 py-1 rounded text-xs font-mono">
                  GET /api/polydivisible/generate
                </code>
                <p className="text-yellow-800 mt-1">
                  Generate all polydivisible numbers up to a length
                </p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-3">Performance Notes</h3>
            <ul className="space-y-2 text-sm text-indigo-800">
              <li>• Generation uses efficient backtracking with early pruning</li>
              <li>• Supports bases 2-100 with proper digit validation</li>
              <li>• Maximum length limited to 20 for reasonable computation time</li>
              <li>• Results can be downloaded as text files</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample cURL Commands</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Check if 1232 is polydivisible in base 10:</p>
            <code className="block bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
              curl "http://localhost:3001/api/polydivisible/check?digits=1232&base=10"
            </code>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Generate all polydivisible numbers up to length 4 in base 16:</p>
            <code className="block bg-gray-100 p-3 rounded text-sm font-mono overflow-x-auto">
              curl "http://localhost:3001/api/polydivisible/generate?base=16&maxLength=4"
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}