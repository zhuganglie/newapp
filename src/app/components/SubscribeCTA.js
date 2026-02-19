'use client';

import SubscribeForm from './SubscribeForm';
import { FiMail } from 'react-icons/fi';

export default function SubscribeCTA() {
    return (
        <section className="my-12 animate-fade-in">
            <div className="bg-surface rounded-lg border border-border px-6 py-8 md:px-8">
                <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 bg-primary-light rounded-md text-primary flex-shrink-0 mt-0.5">
                        <FiMail size={18} />
                    </div>
                    <div>
                        <h3 className="text-base font-serif font-bold text-text-main m-0 p-0 border-none">
                            订阅「政治的逻辑」
                        </h3>
                        <p className="text-sm text-text-muted m-0 p-0 mt-1 max-w-md">
                            新文章发布时，直接送到你的收件箱。不定期更新，没有垃圾邮件。
                        </p>
                    </div>
                </div>
                <div className="max-w-md ml-0 md:ml-11">
                    <SubscribeForm />
                </div>
            </div>
        </section>
    );
}
