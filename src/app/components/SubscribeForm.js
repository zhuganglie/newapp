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
                setTimeout(() => setStatus('idle'), 3000);
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
            <div className={`flex items-center gap-2 text-accent-green ${compact ? 'text-xs' : 'text-sm'}`}>
                <FiCheck size={compact ? 14 : 16} />
                <span>订阅成功！请查收确认邮件。</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className={`flex gap-2 ${compact ? '' : ''}`}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                    }}
                    placeholder="your@email.com"
                    className={`flex-1 min-w-0 bg-surface text-text-main border border-border rounded-md transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 placeholder:text-text-light ${compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
                        } ${status === 'error' ? 'border-secondary' : ''}`}
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`inline-flex items-center justify-center gap-1.5 bg-text-main text-white rounded-md font-medium hover:bg-text-main/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 ${compact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
                        }`}
                >
                    {status === 'loading' ? (
                        <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <FiSend size={compact ? 12 : 14} />
                            <span>订阅</span>
                        </>
                    )}
                </button>
            </div>

            {status === 'error' && errorMsg && (
                <div className={`flex items-center gap-1.5 text-secondary mt-1.5 ${compact ? 'text-[10px]' : 'text-xs'}`}>
                    <FiAlertCircle size={12} />
                    <span>{errorMsg}</span>
                </div>
            )}
        </form>
    );
}
