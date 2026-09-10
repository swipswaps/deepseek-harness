import test from 'node:test';
import assert from 'node:assert';

test('Harness configuration defaults', () => {
  const defaultModel = 'deepseek-ai/deepseek-v4.1-flash';
  assert.strictEqual(defaultModel, 'deepseek-ai/deepseek-v4.1-flash');
});