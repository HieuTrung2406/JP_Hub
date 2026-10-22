
import { createClient } from 'npm:@supabase/supabase-js@2';

// 1. CORS
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// 2. Prompt theo chế độ học
const systemPrompts: Record<string, string> = {
    grammar: `
Bạn là AI Sensei, giáo viên tiếng Nhật.
Hãy giải thích bằng tiếng Việt, phù hợp với người học JLPT N3-N2.

Khi giải thích ngữ pháp:
- Nêu ý nghĩa.
- Giải thích cấu trúc và cách sử dụng.
- Đưa ra ví dụ tiếng Nhật kèm bản dịch.
- Phân biệt với mẫu ngữ pháp tương tự khi cần thiết.
`,

    jlpt: `
Bạn là AI Sensei, giáo viên luyện thi JLPT.
Hãy trả lời bằng tiếng Việt.

Khi học viên gửi câu hỏi trắc nghiệm:
- Xác định đáp án đúng.
- Giải thích lý do đáp án đúng.
- Giải thích vì sao các đáp án khác sai.
- Cung cấp cách đọc và nghĩa của từ vựng quan trọng.
- Nếu đề bài thiếu thông tin, hãy nói rõ.
`,

    correct: `
Bạn là AI Sensei, giáo viên sửa câu tiếng Nhật.
Hãy:
- Kiểm tra ngữ pháp và cách dùng từ.
- Đưa ra câu sửa đúng, tự nhiên.
- Giải thích lỗi bằng tiếng Việt.
- Phân biệt cách nói thông thường và lịch sự nếu phù hợp.
`,

    kaiwa: `
Bạn là AI Sensei, giáo viên hội thoại tiếng Nhật.
Hãy hội thoại bằng tiếng Nhật phù hợp trình độ N3-N2.
Đặt câu hỏi để học viên có thể tiếp tục luyện nói.
Nếu học viên mắc lỗi, hãy sửa ngắn gọn và dễ hiểu.
`,
};

// 3. Helper trả về JSON
const jsonResponse = (data: unknown, status = 200) => {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
        },
    });
};

// 4. Edge Function
Deno.serve(async (req: Request) => {
    // Xử lý CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: corsHeaders,
        });
    }

    if (req.method !== 'POST') {
        return jsonResponse(
            { error: 'Method not allowed' },
            405
        );
    }

    

    try {
        console.log('[AI SENSEI] Request received');

        // 5. Kiểm tra Authorization
        const authHeader = req.headers.get('Authorization');

        if (!authHeader?.startsWith('Bearer ')) {
            return jsonResponse(
                { error: 'Unauthorized' },
                401
            );
        }

        // 6. Khởi tạo Supabase Client
        const supabaseUrl = Deno.env.get('SUPABASE_URL');

        const supabaseKey =
            Deno.env.get('SUPABASE_ANON_KEY') ??
            Deno.env.get('SUPABASE_PUBLISHABLE_KEY');

        if (!supabaseUrl || !supabaseKey) {
            console.error('[AI SENSEI] Missing Supabase config');

            return jsonResponse(
                { error: 'Supabase configuration missing' },
                500
            );
        }

        const supabase = createClient(
            supabaseUrl,
            supabaseKey
        );

        // 7. Xác thực người dùng
        const token = authHeader.slice(7);

        const {
            data: { user },
            error: authError,
        } = await supabase.auth.getUser(token);

        if (authError || !user) {
            console.error(
                '[AI SENSEI] Authentication failed:',
                authError?.message
            );

            return jsonResponse(
                { error: 'Unauthorized' },
                401
            );
        }

        console.log(
            '[AI SENSEI] Authentication successful:',
            user.id
        );

        // 8. Nhận dữ liệu từ React
        const {
            message,
            mode = 'grammar',
            history = [],
        } = await req.json();

        if (
            typeof message !== 'string' ||
            !message.trim() ||
            message.length > 4000 ||
            typeof mode !== 'string' ||
            !Object.hasOwn(systemPrompts, mode) ||
            !Array.isArray(history)
        ) {
            return jsonResponse(
                { error: 'Invalid request' },
                400
            );
        }

        // 9. Chuẩn hóa lịch sử hội thoại cho Gemini
        const safeHistory = history
            .slice(-10)
            .filter(
                (item: any) =>
                    item &&
                    ['user', 'assistant'].includes(item.role) &&
                    typeof item.content === 'string' &&
                    item.content.trim().length > 0 &&
                    item.content.length <= 4000
            )
            .map((item: any) => ({
                role: item.role === 'assistant'
                    ? 'model'
                    : 'user',
                parts: [
                    {
                        text: item.content,
                    },
                ],
            }));

        // 10. Thêm câu hỏi hiện tại
        const contents = [
            ...safeHistory,
            {
                role: 'user',
                parts: [
                    {
                        text: message.trim(),
                    },
                ],
            },
        ];

        // 11. Kiểm tra Gemini API Key
        const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

        if (!geminiApiKey) {
            console.error(
                '[AI SENSEI] GEMINI_API_KEY missing'
            );

            return jsonResponse(
                { error: 'Gemini API Key not configured' },
                500
            );
        }

        console.log('[AI SENSEI] Calling Gemini API');

        // 12. Gọi Google Gemini API
const model = 'gemini-3.8-flash';
const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': geminiApiKey,
        },
        body: JSON.stringify({
            systemInstruction: {
                parts: [
                    {
                        text: systemPrompts[mode],
                    },
                ],
            },
            contents,
            generationConfig: {
                maxOutputTokens: 2048,
                thinkingConfig: {
                    thinkingLevel: 'low',
                },
            },
        }),
    }
);
        // 13. Xử lý lỗi Gemini API
if (!response.ok) {
  const errorBody = await response.text();

  console.error('========== GEMINI ERROR ==========');
  console.error('Status:', response.status);
  console.error('Response:', errorBody);
  console.error('==================================');

  return jsonResponse(
      {
          error: 'Gemini API request failed',
          geminiStatus: response.status,
          details: errorBody,
      },
      502
  );
}

        // 14. Đọc kết quả từ Gemini
        const data = await response.json();

        const reply = (
            data.candidates?.[0]?.content?.parts ?? []
        )
            .filter(
                (part: any) =>
                    typeof part.text === 'string'
            )
            .map(
                (part: any) => part.text
            )
            .join('\n')
            .trim();

        if (!reply) {
            console.error(
                '[AI SENSEI] Empty response from Gemini',
                JSON.stringify({
                    promptFeedback: data.promptFeedback,
                    finishReason:
                        data.candidates?.[0]?.finishReason,
                })
            );

            return jsonResponse(
                { error: 'Gemini không trả về nội dung' },
                502
            );
        }

        console.log(
            '[AI SENSEI] Gemini response successful'
        );

        // 15. Trả kết quả về React
        return jsonResponse({
            success: true,
            reply,
        });

    } catch (error) {
        console.error(
            '[AI SENSEI] Unexpected error:',
            error
        );

        return jsonResponse(
            { error: 'Lỗi hệ thống AI Sensei' },
            500
        );
    }
});
