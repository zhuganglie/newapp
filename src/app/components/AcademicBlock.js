import React from 'react';

/**
 * AcademicBlock - A Beamer-inspired information box for academic content.
 * 
 * @param {Object} props
 * @param {string} props.title - The title shown in the header of the block.
 * @param {'concept' | 'theory' | 'example'} [props.type='concept'] - The theme of the block.
 * @param {React.ReactNode} props.children - The content to be displayed within the block.
 */
const AcademicBlock = ({ title, type = 'concept', children }) => {
  const typeClass = {
    concept: 'block-concept',
    theory: 'block-theory',
    example: 'block-example',
  }[type] || 'block-concept';

  return (
    <div className={`academic-block ${typeClass} group transition-all duration-300 hover:shadow-md`}>
      {title && (
        <div className="academic-block-header">
          {title}
        </div>
      )}
      <div className="academic-block-content">
        {children}
      </div>
    </div>
  );
};

export default AcademicBlock;
