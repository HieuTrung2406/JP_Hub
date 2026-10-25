const vi = {
    common: {
        appName: 'Nihongo-hub',
        tagline: 'Học tiếng Nhật • Kết nối tương lai',
        registerPrompt: 'Chưa có tài khoản?',
        register: 'Đăng ký',
        registerNow: 'Đăng ký ngay',
        login: 'Đăng nhập',
        email: 'Email',
        password: 'Mật khẩu',
        rememberMe: 'Ghi nhớ đăng nhập',
        forgotPassword: 'Quên mật khẩu?',
    },

    login: {
        title: 'Đăng nhập',
        subtitle: 'Tiếp tục hành trình chinh phục tiếng Nhật cùng Nihongo-hub!',
        emailPlaceholder: 'Nhập email của bạn',
        passwordPlaceholder: 'Nhập mật khẩu',
        emailRequired: 'Vui lòng nhập email',
        emailInvalid: 'Email không hợp lệ',
        passwordRequired: 'Vui lòng nhập mật khẩu',
        loginSuccess: 'Đăng nhập thành công!',
        loginFailed: 'Đăng nhập thất bại. Vui lòng kiểm tra email hoặc mật khẩu!',
    },

    register: {
        title: 'Tạo tài khoản',
        subtitle: 'Bắt đầu hành trình chinh phục tiếng Nhật cùng Nihongo-hub ngay hôm nay.',
        fullName: 'Họ và tên',
        email: 'Địa chỉ email',
        password: 'Mật khẩu',
        confirmPassword: 'Xác nhận mật khẩu',
        fullNameRequired: 'Vui lòng nhập họ và tên!',
        emailRequired: 'Vui lòng nhập email!',
        emailInvalid: 'Địa chỉ email không hợp lệ!',
        passwordRequired: 'Vui lòng nhập mật khẩu!',
        passwordMinLength: 'Mật khẩu phải có ít nhất 8 ký tự!',
        confirmPasswordRequired: 'Vui lòng xác nhận mật khẩu!',
        passwordMismatch: 'Mật khẩu xác nhận không khớp!',
        submit: 'Đăng ký tài khoản',
        alreadyHaveAccount: 'Bạn đã có tài khoản?',
        loginNow: 'Đăng nhập ngay',
        registerPending: 'Chức năng đăng ký đang được phát triển.',
        registerSuccess: 'Đăng ký tài khoản thành công!',
        registerFailed: 'Đăng ký thất bại. Vui lòng thử lại!',
        emailConfirmation: 'Vui lòng kiểm tra email để xác nhận tài khoản.',
    },

    account: {
        title: 'Tài khoản của tôi',
        description: 'Thông tin tài khoản của bạn trên Nihongo-hub.',
        displayName: 'Display name',
        email: 'Email',
        phone: 'Phone',
        providers: 'Providers',
        providerType: 'Provider type',
        createdAt: 'Created at',
        defaultName: 'Chưa cập nhật',
        emptyValue: '—',
        loadUserFailed: 'Không thể tải thông tin tài khoản',
        userNotFound: 'Không tìm thấy thông tin tài khoản.',
    },

    hero: {
        badge: 'HỌC TIẾNG NHẬT MỖI NGÀY',
        title: 'JLPT Vocabulary Flashcards',
        description:
            'Lật thẻ, ghi nhớ từ mới và ôn lại những từ bạn chưa thuộc. Học theo cách của riêng bạn!',
        imageAlt: 'Japanese Torii Gate',
    },

    levelAndMode: {
        selectLevel: 'Chọn cấp độ JLPT',
        levels: ['N5', 'N4', 'N3', 'N2', 'N1'],
        learnAll: 'Học tất cả',
        reviewUnknown: 'Ôn từ chưa thuộc',
        vocabularyCount: 'từ vựng',
        unknownCount: 'từ cần ôn',
    },

    stats: {
        totalVocabulary: 'Tổng từ vựng',
        knownWords: 'Đã thuộc',
        unknownWords: 'Cần ôn lại',
    },

    mainGrid: {
        studyTitle: 'Bắt đầu học từ vựng',
        reviewTitle: 'Ôn tập từ chưa thuộc',
        card: 'Thẻ',
        level: 'Cấp độ',
        shuffle: 'Trộn thẻ',
        flipCard: 'Lật flashcard',
        frontSide: 'MẶT TRƯỚC · TIẾNG NHẬT',
        backSide: 'MẶT SAU · Ý NGHĨA',
        flipHint: 'Nhấn vào thẻ để lật',
        listenPronunciation: 'Nghe phát âm',
        reviewCompleted: 'Bạn đã ôn hết từ chưa thuộc!',
        noVocabulary: 'Chưa có từ vựng',
        continueLearning: 'Hãy tiếp tục học từ mới nhé.',
        selectAnotherLevel: 'Hãy chọn cấp độ khác.',
        learnAll: 'Học tất cả',
        unknown: 'Chưa thuộc',
        known: 'Đã thuộc',
        previous: 'Trước',
        next: 'Tiếp',
        keyboardHint: 'Space để lật · ← → chuyển thẻ',
        unknownWordsTitle: 'Từ chưa thuộc',
        removeFromList: 'Xóa khỏi danh sách',
        noUnknownWords: 'Chưa có từ cần ôn',
        addUnknownHint: 'Đánh dấu "Chưa thuộc" để thêm từ.',
        reviewNow: 'Ôn tập ngay',
        learningTipTitle: 'Mẹo học nhanh',
        learningTipDescription:
            'Hãy thử nhớ nghĩa trước khi lật thẻ. Những từ chưa thuộc sẽ được đưa vào danh sách ôn tập riêng.',
        learningTipEmoji: '🐱',
        memoryStatus: 'Tình trạng ghi nhớ',
        knownWordsCount: 'từ đã thuộc',
    },

    sidebar: {
        appName: 'NihongoHub',
        tagline: '日本語を楽しく学ぼう',
        sectionTitle: 'Học tập',
        featureComingSoon: 'Tính năng sẽ phát triển sau.',
        dailyWordTitle: 'Một từ mỗi ngày',
        dailyWordDescription: 'Học đều đặn sẽ giúp bạn ghi nhớ tốt hơn!',
        userAvatar: 'H',
        userAccount: 'Tài khoản học viên',
        userStatus: 'Đang học JLPT',
        nav: {
            home: 'Tổng quan',
            flashcard: 'Flashcard',
            vocabulary: 'Từ vựng',
            grammar: 'Ngữ pháp',
            exam: 'Luyện đề JLPT',
            sensei: 'AI Sensei',
            account: 'Tài khoản',
        },
    },

    topBar: {
        sectionTitle: 'Học tập',
        currentPage: 'Flashcard',
        userAvatar: 'H',
        userRole: 'Học viên',
        accountManagement: 'Quản lý tài khoản',
        logout: 'Đăng xuất',
        logoutSuccess: 'Đăng xuất thành công!',
        logoutFailed: 'Đăng xuất thất bại. Vui lòng thử lại!',
    },

    chatMessages: {
        welcomeTitle: 'こんにちは！ Hôm nay bạn muốn học gì?',
        welcomeDescription:
            'Hãy nhập câu hỏi tiếng Nhật hoặc chọn một chế độ học ở bên phải để bắt đầu cùng Sensei nhé!',
        welcomeBadge: 'Sensei luôn sẵn sàng giúp bạn học tiếng Nhật',
        assistantName: 'AI Sensei',
        userAvatar: 'N',
        copy: 'Sao chép',
        helpful: 'Hữu ích',
        notHelpful: 'Chưa hữu ích',
        thinking: 'Sensei đang suy nghĩ...',
    },

    chatInput: {
        placeholder: 'Nhập câu hỏi tiếng Nhật của bạn...',
    },

    studyModes: {
        title: 'Chế độ học',
        subtitle: '(Gợi ý nhanh)',

        grammar: {
            title: 'Giải thích ngữ pháp',
            description: 'Hỏi về cách dùng, so sánh ngữ pháp...',
            prompt: 'Giải thích giúp tôi ngữ pháp ～わりに kèm ví dụ.',
        },

        jlpt: {
            title: 'Giải bài JLPT',
            description: 'Phân tích đáp án, giải thích chi tiết...',
            prompt: 'Hãy giải thích câu hỏi JLPT sau:\n',
        },

        correct: {
            title: 'Sửa câu tiếng Nhật',
            description: 'Kiểm tra và sửa lỗi diễn đạt tự nhiên...',
            prompt: 'Hãy sửa câu tiếng Nhật sau và giải thích lỗi:\n',
        },

        kaiwa: {
            title: 'Luyện hội thoại',
            description: 'Đóng vai tình huống thực tế...',
            prompt: 'Hãy đóng vai người phỏng vấn IT Nhật Bản.',
        },
    },

    chatHistory: {
        title: 'Lịch sử hội thoại',
        newChat: 'Chat mới',
        emptyChat: 'Chưa có cuộc trò chuyện',
        deleteChat: 'Xóa hội thoại',
        viewMore: 'Xem thêm',
    },

    aiSensei: {
        viewMoreInfo: 'Đang hiển thị toàn bộ lịch sử mẫu',
        deleteChatSuccess: 'Đã xóa cuộc trò chuyện',
        deleteChatFailed: 'Không thể xóa cuộc trò chuyện',
        sendMessageFailed: 'Không thể gửi tin nhắn',
    },

    home: {
        saveProgressFailed: 'Không thể lưu tiến độ học',
        shuffleSuccess: 'Đã trộn thẻ!',
        speechNotSupported: 'Trình duyệt chưa hỗ trợ phát âm.',
        loadVocabularyFailed: 'Không thể tải danh sách từ vựng. Vui lòng thử lại!',
    },
};

export default vi;
