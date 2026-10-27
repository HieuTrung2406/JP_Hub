
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};


const prompts: Record<string, string> = {
    grammar: 'You are AI Sensei, a Japanese language teacher. Explain JLPT N3-N2 Japanese grammar in English, including grammar structures, usage, and examples with English translations.',

    jlpt: 'You are a JLPT instructor. Select the correct answer and explain in English why it is correct and why the other options are incorrect.',

    correct: 'You are a Japanese language teacher. Correct Japanese sentences, explain the mistakes in English, and suggest more natural expressions.',

    kaiwa: 'You are a Japanese conversation teacher. Conduct conversations in Japanese at the JLPT N3-N2 level and provide brief corrections and explanations in English when necessary.',
};


const json = (data: unknown, status = 200) =>
    new Response(JSON.stringify(data), {
        status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
        return json({ error: 'Method not allowed' }, 405);
    }

    try {
        // 1. Xác thực Supabase
        const token = req.headers.get('Authorization')?.replace(/^Bearer /, '');

        if (!token) return json({ error: 'Unauthorized' }, 401);

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_ANON_KEY') ??
                Deno.env.get('SUPABASE_PUBLISHABLE_KEY')!
        );

        const { data, error } = await supabase.auth.getUser(token);

        if (error || !data.user) {
            return json({ error: 'Unauthorized' }, 401);
        }

        // 2. Nhận dữ liệu từ React
        const { message, mode = 'grammar', history = [] } = await req.json();

        if (typeof message !== 'string' || !message.trim()) {
            return json({ error: 'Message is required' }, 400);
        }

        if (!Object.hasOwn(prompts, mode)) {
            return json({ error: 'Invalid mode' }, 400);
        }

        const messages = [
            { role: 'system', content: prompts[mode] },
            ...(Array.isArray(history) ? history : [])
                .slice(-6)
                .filter((m) =>
                    ['user', 'assistant'].includes(m?.role) &&
                    typeof m?.content === 'string'
                )
                .map((m) => ({
                    role: m.role,
                    content: m.content.slice(0, 1500),
                })),
            { role: 'user', content: message.slice(0, 4000) },
        ];

        // 3. Gọi Groq API
        const response = await fetch(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: Deno.env.get('GROQ_MODEL') || 'openai/gpt-oss-120b',
                    messages,
                    max_completion_tokens: 512,
                    stream: false,
                }),
                signal: AbortSignal.timeout(20000),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            console.error('Groq error:', result);
            return json({
                success: false,
                error: result.error?.message || 'Groq API failed',
                groqStatus: response.status,
            }, 502);
        }

        // 4. Trả kết quả cho React
        return json({
            success: true,
            reply: result.choices?.[0]?.message?.content || '',
        });

    } catch (error) {
        console.error('AI Sensei error:', error);

        const timeout = error instanceof Error &&
            ['TimeoutError', 'AbortError'].includes(error.name);

        return json({
            success: false,
            error: timeout ? 'Groq timeout' : 'Internal server error',
        }, timeout ? 504 : 500);
    }
});
