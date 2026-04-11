'use client';

import { useState } from 'react';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function SubscribeForm({ compact = false }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setErrorMsg('请输入有效的邮箱地址');
            return;
        }

        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setEmail('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMsg(data.error || '订阅失败，请稍后重试');
            }
        } catch {
            setStatus('error');
            setErrorMsg('网络错误，请稍后重试');
        }
    };

    if (status === 'success') {
        return (
            <div className={`p-4 bg-accent-green/10 border border-accent-green/20 rounded-lg flex items-center gap-3 text-accent-green animate-in fade-in slide-in-from-bottom-2 ${compact ? 'text-xs py-2 px-3' : 'text-sm'}`}>
                <FiCheck size={compact ? 16 : 18} className="flex-shrink-0" />
                <span className="font-medium">订阅申请已发送！我会尽快为您处理。</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className={`flex gap-2 ${compact ? 'flex-col' : 'flex-row'}`}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                    }}
                    placeholder="your@email.com"
                    className={`flex-grow bg-white text-text-main border-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-0 placeholder:text-text-light/50 ${compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-sm'
                        } ${status === 'error'
                            ? 'border-secondary focus:border-secondary'
                            : 'border-border/40 focus:border-primary'
                        }`}
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-white hover:bg-primary-hover active:scale-[0.98] ${compact
                            ? 'w-full px-4 py-2 text-xs rounded-md shadow-sm'
                            : 'px-8 py-3 text-sm rounded-r-lg shadow-sm hover:shadow-md'
                        }`}
                >
                    {status === 'loading' ? (
                        <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <FiSend size={compact ? 14 : 16} />
                            <span>立即订阅</span>
                        </>
                    )}
                </button>
            </div>

            {status === 'error' && errorMsg && (
                <div className={`flex items-center gap-1.5 text-secondary mt-2 animate-in fade-in slide-in-from-top-1 ${compact ? 'text-[10px]' : 'text-xs'}`}>
                    <FiAlertCircle size={14} className="flex-shrink-0" />
                    <span>{errorMsg}</span>
                </div>
            )}

            {!status || status === 'idle' || status === 'loading' ? (
                <p className={`text-text-light mt-3 font-serif italic ${compact ? 'text-[10px]' : 'text-xs'}`}>
                    * 私密发送，请放心订阅。
                </p>
            ) : null}
        </form>
    );
}
