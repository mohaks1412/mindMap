'use client';
import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/app/store/hooks';
import { setMindmapData } from '@/app/store/slices/mindmapSlice';
import { RawJsonNode } from '@/app/lib/types';
import { resolveJson } from '@/app/lib/resolveJson';

export default function JsonTester() {
  const dispatch = useAppDispatch();
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<{ nodes: number; links: number; levels: number } | null>(null);

  const validateJson = useCallback((input: string) => {
    try {
      const data: RawJsonNode = JSON.parse(input);
      const result = resolveJson(data);
      setPreview({
        nodes: result.nodes.length,
        links: result.links.length,
        levels: Math.max(...result.nodes.map(n =>
          n.color === '#4F46E5' ? 0 :
          n.color === '#EF4444' ? 1 :
          n.color === '#10B981' ? 2 :
          n.color === '#F59E0B' ? 3 : 4))
      });
      setError('');
      return result;
    } catch (err) {
      setPreview(null);
      setError('Invalid JSON format');
      return null;
    }
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
    validateJson(e.target.value);
  }, [validateJson]);

  const handleLoad = useCallback(() => {
    const result = validateJson(jsonInput);
    if (result) {
      dispatch(setMindmapData(result));
    }
  }, [jsonInput, validateJson, dispatch]);

  const handleClear = useCallback(() => {
    setJsonInput('');
    setError('');
    setPreview(null);
    dispatch(setMindmapData(null));
  }, [dispatch]);

  return (
    <div className="w-full h-10 flex items-stretch overflow-hidden transition-colors duration-300">
      
      <div className="flex-1 flex items-center px-2">
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder="Paste JSON here..."
          className="flex-1 h-8 bg-transparent border-none px-2 py-1 text-sm text-fg font-mono resize-none focus:outline-none focus:ring-0 placeholder:text-fg-subtle"
          rows={1}
        />
      </div>

      <div className="w-20 flex items-center justify-center bg-transparent text-[10px] font-bold uppercase tracking-tight text-fg-muted">
        {preview ? `${preview.nodes}N / ${preview.links}L` : error ? 'Error' : 'Ready'}
      </div>

      <div className="flex items-center gap-1 px-2">
        <button
          onClick={handleClear}
          className="p-1 text-fg-subtle hover:text-danger hover:bg-danger/10 rounded transition-all"
          title="Clear"
        >
          ✕
        </button>
        <button
          onClick={handleLoad}
          disabled={!preview || !!error || !jsonInput.trim()}
          className="px-3 py-1 bg-accent hover:opacity-90 text-accent-fg font-bold text-xs uppercase tracking-widest rounded transition-all shadow-sm disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed"
        >
          Load
        </button>
      </div>
    </div>
  );
}
