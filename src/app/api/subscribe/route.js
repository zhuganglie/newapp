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

        const apiKey = process.env.BUTTONDOWN_API_KEY;

        // Dev mode: return mock success if no API key configured
        if (!apiKey) {
            console.log(`[Dev] Subscribe request for: ${email}`);
            return NextResponse.json({ success: true });
        }

        const res = await fetch('https://api.buttondown.com/v1/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${apiKey}`,
            },
            body: JSON.stringify({
                email_address: email,
                type: 'regular',
            }),
        });

        if (res.ok) {
            return NextResponse.json({ success: true });
        }

        const data = await res.json();

        // Buttondown returns 400 if already subscribed
        if (res.status === 400 && JSON.stringify(data).includes('already')) {
            return NextResponse.json({ success: true }); // Treat as success
        }

        console.error('Buttondown API error:', data);
        return NextResponse.json(
            { error: '订阅失败，请稍后重试' },
            { status: 500 }
        );
    } catch (error) {
        console.error('Subscribe error:', error);
        return NextResponse.json(
            { error: '服务器错误，请稍后重试' },
            { status: 500 }
        );
    }
}
