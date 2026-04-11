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
                        <div className="text-sm text-text-muted m-0 p-0 mt-2 max-w-md">
                            <p className="font-bold text-text-main mb-2 opacity-90">订阅后你会收到：</p>
                            <ul className="list-none space-y-1.5 mt-0 p-0">
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>新文章更新</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>主题书单 / 阅读顺序</li>
                                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>偶尔发送的政治学读物</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-md ml-0 md:ml-11">
                    <SubscribeForm />
                </div>
            </div>
        </section>
    );
}
