'use client';

import React, { useEffect, useRef, useState } from 'react';

const Mermaid = ({ chart }) => {
    const ref = useRef(null);
    const [rendered, setRendered] = useState(false);
    const [id] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

    useEffect(() => {
        if (ref.current && chart && !rendered) {
            (async () => {
                try {
                    const mermaid = (await import('mermaid')).default;
                    mermaid.initialize({
                        startOnLoad: false,
                        theme: 'default',
                        securityLevel: 'loose',
                        fontFamily: 'inherit',
                    });

                    const { svg } = await mermaid.render(id, chart);
                    if (ref.current) {
                        ref.current.innerHTML = svg;
                        setRendered(true);
                    }
                } catch (error) {
                    console.error('Mermaid render error:', error);
                    if (ref.current) {
                        // Fallback: display code if render fails
                        ref.current.innerText = chart;
                        ref.current.className = "text-red-500 text-sm whitespace-pre-wrap";
                    }
                }
            })();
        }
    }, [chart, id, rendered]);

    return <div ref={ref} className="mermaid-diagram overflow-x-auto my-8 flex justify-center" />;
};

export default Mermaid;
