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
            <div className={`flex items-center gap-2 text-accent-green ${compact ? 'text-xs py-2' : 'text-sm'}`}>
                <FiCheck size={compact ? 14 : 16} className="flex-shrink-0" />
                <span>订阅成功！请查收确认邮件。</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className={compact ? 'space-y-2' : 'flex gap-2'}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                    }}
                    placeholder="your@email.com"
                    className={`w-full bg-white text-text-main border border-border rounded-md transition-all duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 placeholder:text-text-light ${compact ? 'px-3 py-2 text-xs' : 'px-3 py-2 text-sm'
                        } ${status === 'error' ? 'border-secondary' : ''}`}
                    disabled={status === 'loading'}
                />
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={`inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${compact
                        ? 'w-full px-3 py-2 text-xs bg-primary text-white hover:bg-primary-hover shadow-sm hover:shadow'
                        : 'px-4 py-2 text-sm bg-text-main text-white hover:bg-text-main/90 flex-shrink-0'
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
                    <FiAlertCircle size={12} className="flex-shrink-0" />
                    <span>{errorMsg}</span>
                </div>
            )}
        </form>
    );
}
