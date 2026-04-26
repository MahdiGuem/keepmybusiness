'use client';

import { useState, useEffect } from 'react';

const presetColors = [
  '#FFFFFF', '#EF4444', '#F97316', '#F59E0B', '#22C55E',
  '#10B981', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6',
  '#EC4899', '#000000', '#1F2937', '#374151'
];

export default function ColorPicker({ color, onChange, title = 'Background Color', small = false, compact = false }) {
  const [localColor, setLocalColor] = useState(color);

  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  const handlePresetClick = (newColor) => {
    setLocalColor(newColor);
    onChange(newColor);
  };

  const handleCustomChange = (e) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
    onChange(newColor);
  };

  const buttonSize = compact ? 'w-5 h-5' : small ? 'w-8 h-8' : 'w-6 h-6';
  const maxWidth = compact ? 'max-w-[120px]' : small ? 'max-w-[160px]' : 'max-w-[200px]';

  return (
    <div className="bg-white rounded-lg shadow-lg p-2 border border-gray-200">
      {title && <p className="text-xs font-medium mb-1 text-gray-700">{title}</p>}
      <div className={`flex flex-wrap gap-1 mb-2 ${maxWidth}`}>
        {presetColors.map((preset, i) => (
          <button
            key={i}
            className={`${buttonSize} rounded border border-gray-300 hover:scale-110 transition-transform`}
            style={{ backgroundColor: preset }}
            onClick={() => handlePresetClick(preset)}
          />
        ))}
      </div>
      {!compact && (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Custom:</span>
          <input
            type="color"
            value={localColor.startsWith('#') ? localColor : '#FFFFFF'}
            onChange={handleCustomChange}
            className="w-8 h-8 cursor-pointer rounded border-0"
          />
          <span className="text-xs text-gray-500 font-mono">{localColor.startsWith('#') ? localColor : '#FFFFFF'}</span>
        </div>
      )}
    </div>
  );
}