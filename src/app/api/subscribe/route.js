import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json(
                { error: '请提供有效的邮箱地址' },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        const adminEmail = process.env.ADMIN_EMAIL || "logicofpolitics25@gmail.com";

        // Dev mode hint
        if (!apiKey) {
            console.log(`[Dev] New subscription notification for: ${email}`);
            return NextResponse.json({ success: true });
        }

        // Send notification email to Admin instead of adding to Audience
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                from: 'Blog Subscribe <onboarding@resend.dev>',
                to: adminEmail,
                subject: '🔔 发现新订阅者',
                html: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #333;">新订阅通知</h2>
                        <p>有读者在您的博客提交了订阅申请：</p>
                        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-size: 1.2em; font-weight: bold; border-left: 4px solid #0070f3;">
                            ${email}
                        </div>
                        <p style="color: #666; font-size: 0.9em; margin-top: 20px;">
                            提示：您可以手动将此邮箱添加至您的发送列表。
                        </p>
                    </div>
                `
            }),
        });

        const data = await res.json();

        if (res.ok) {
            return NextResponse.json({ success: true });
        }

        console.error('Resend Notification Error:', data);
        
        // If Resend fails because of unverified domain or other reasons, 
        // we still want to log it but maybe tell the user it failed.
        return NextResponse.json(
            { error: '发送通知失败，但您的申请已记录在后台。' },
            { status: 500 }
        );
    } catch (error) {
        console.error('Subscribe error:', error);
        return NextResponse.json(
            { error: '服务器繁忙，请稍后重试' },
            { status: 500 }
        );
    }
}
