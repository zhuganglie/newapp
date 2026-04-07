import React from 'react';

const categoryStyles = {
  '专题研究': 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20',
  '深度科普': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
  '读书笔记': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
  '未分类': 'bg-gray-50 text-gray-600 border-gray-200',
};

export default function CategoryBadge({ category, className = "" }) {
  const style = categoryStyles[category] || categoryStyles['未分类'];
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-tight border transition-colors duration-200 ${style} ${className}`}>
      {category}
    </span>
  );
}
