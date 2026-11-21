const STUDY_DATA = {
  // =========================================================================
  // 1. TỪ VỰNG THEO CỤM (CHIA THEO CHỦ ĐỀ Ở SIDEBAR)
  // =========================================================================
  vocabTopics: [
    {
      id: "daily",
      title: "Đời sống thường nhật",
      items: [
        {
          chunk: "자리를 예약하다",
          meaning: "Đặt chỗ ngồi",
          exampleKo: "창가 자리를 미리 예약했어요.",
          exampleVi: "Tôi đã đặt trước chỗ ngồi cạnh cửa sổ.",
          note: "Lưu ý: Dùng động từ 예약하다 (đặt trước), không dùng 놓다.",
          pinterestImg: ""
        },
        {
          chunk: "알람을 맞추다",
          meaning: "Đặt báo thức",
          exampleKo: "내일 일찍 일어나야 해서 알람을 맞췄어요.",
          exampleVi: "Vì ngày mai phải dậy sớm nên tôi đã đặt báo thức.",
          note: "Lưu ý: Cụm cố định là 알람을 맞추다 (chỉnh báo thức).",
          pinterestImg: ""
        }
      ]
    },
    {
      id: "school",
      title: "Cuộc sống học đường",
      items: [
        {
          chunk: "수업을 듣다",
          meaning: "Nghe giảng / Học môn học",
          exampleKo: "이번 학기에 한국어 문학 수업을 들어요.",
          exampleVi: "Học kỳ này tôi học môn văn học Hàn Quốc.",
          note: "Lưu ý: Người Hàn nói 'nghe tiết học' (수업을 듣다).",
          pinterestImg: ""
        },
        {
          chunk: "과제를 제출하다",
          meaning: "Nộp bài tập",
          exampleKo: "금요일까지 교수님께 과제를 제출해야 해요.",
          exampleVi: "Phải nộp bài tập cho giáo sư trước thứ Sáu.",
          note: "Lưu ý: Giao tiếp thân mật dùng 숙제를 내다.",
          pinterestImg: ""
        }
      ]
    }
  ],

  // =========================================================================
  // 2. NGỮ PHÁP (CÁC MỤC Ở SIDEBAR)
  // =========================================================================
  grammarSections: [
    {
      id: "daily",
      title: "Chủ đề: Đời sống",
      items: [
        {
          form: "Động từ + -아/어서",
          meaning: "Vì... nên... (Chỉ nguyên nhân - kết quả tự nhiên)",
          exampleKo: "비가 와서 집에 있었어요.",
          exampleVi: "Vì trời mưa nên tôi đã ở nhà.",
          note: "Lưu ý: Không chia thì quá khứ trước -아/어서 và không dùng với câu mệnh lệnh (-세요)."
        },
        {
          form: "Động từ + -(으)려고 하다",
          meaning: "Định làm gì đó (Diễn tả ý định)",
          exampleKo: "한국어를 배우려고 해요.",
          exampleVi: "Tôi đang định học tiếng Hàn.",
          note: "Lưu ý: Chủ ngữ chỉ dùng ngôi thứ nhất (tôi/chúng tôi) trong câu trần thuật."
        }
      ]
    },
    {
      id: "school",
      title: "Chủ đề: Học đường",
      items: [
        {
          form: "Động từ + -(으)ㄹ 겸",
          meaning: "Nhân tiện / Kết hợp làm hai việc",
          exampleKo: "공부도 할 겸 친구도 만날 겸 도서관에 갔어요.",
          exampleVi: "Tôi đến thư viện để vừa học bài vừa gặp bạn.",
          note: "Lưu ý: Thường lặp lại 2 lần 'V1-(으)ㄹ 겸 V2-(으)ㄹ 겸'."
        }
      ]
    },
    {
      id: "speaking",
      title: "Ngữ pháp giao tiếp",
      items: [
        {
          form: "Tính từ / Động từ + -잖아요",
          meaning: "Chẳng phải là... sao (nhắc lại điều người nghe cũng biết)",
          exampleKo: "내일은 일요일이잖아요. 집에서 푹 쉬세요.",
          exampleVi: "Ngày mai chẳng phải Chủ nhật sao. Hãy nghỉ ngơi đi.",
          suggestions: [
            "왜 안 먹어요? → 배가 부르잖아요. (Sao không ăn? → Chẳng phải no rồi sao.)",
            "오늘 너무 춥네요. → 겨울이잖아요. (Hôm nay lạnh quá. → Chẳng phải mùa đông sao.)"
          ],
          note: "Lưu ý: Tránh dùng với người lớn tuổi/cấp trên vì dễ mang sắc thái trách móc."
        }
      ]
    },
    {
      id: "writing",
      title: "Ngữ pháp văn viết",
      items: [
        {
          form: "Động từ + -는다 / -ㄴ다",
          meaning: "Đuôi kết thúc câu trần thuật trong văn viết, báo chí, nhật ký",
          exampleKo: "많은 사람들이 건강을 위해 매일 운동을 한다.",
          exampleVi: "Nhiều người tập thể dục mỗi ngày vì sức khỏe.",
          note: "Lưu ý: Động từ có patchim + -는다 (먹는다); không patchim + -ㄴ다 (간다); tính từ giữ nguyên (예쁘다)."
        },
        {
          form: "Động từ / Tính từ + -기 때문이다",
          meaning: "Là vì... (nêu nguyên nhân trong văn nghị luận)",
          exampleKo: "한국어를 배우는 이유는 한국 문화가 좋기 때문이다.",
          exampleVi: "Lý do học tiếng Hàn là vì thích văn hóa Hàn Quốc.",
          note: "Lưu ý: Thường đi theo cặp hô ứng '이유는 ~ -기 때문이다'."
        }
      ]
    },
    {
      id: "compare",
      title: "So sánh ngữ pháp",
      items: [
        {
          form: "-아/어서  VS  -(으)니까",
          meaning: "Đều mang nghĩa 'Vì... nên...' nhưng khác quy tắc kết hợp vế sau",
          exampleKo: "날씨가 추우니까 따뜻한 옷을 입으세요. (Đúng) / 추워서 입으세요. (Sai)",
          exampleVi: "Vì trời lạnh nên hãy mặc áo ấm vào.",
          note: "Lưu ý: Vế sau có câu mệnh lệnh (-세요) hoặc rủ rê (-읍시다) bắt buộc dùng -(으)니까."
        }
      ]
    },
    {
      id: "practice",
      title: "Luyện tập (Đục lỗ & Dịch)",
      isPractice: true,
      cloze: [
        {
          question: "날씨가 더우_______ 에어컨을 켜세요. (Điền -아서 hoặc -니까)",
          answer: "니까",
          note: "Giải thích: Vế sau là câu mệnh lệnh (-세요) nên dùng -(으)니까."
        },
        {
          question: "지금 회사에 가_______ 길이에요. (Điền -는 hoặc -은)",
          answer: "는",
          note: "Giải thích: Động từ 가다 đi với -는 길이다."
        }
      ],
      translate: [
        {
          vi: "Ngày mai chẳng phải là ngày thi sao.",
          answerKo: "내일은 시험 날이잖아요.",
          note: "Gợi ý: Sử dụng đuôi giao tiếp -잖아요."
        }
      ]
    }
  ],

  // =========================================================================
  // 3. BỐN KỸ NĂNG
  // =========================================================================
  skills: {
    listening: {
      modes: [
        {
          id: "choice",
          label: "Dạng 1: Chọn thông tin đúng",
          title: "Luyện Nghe: Nghe câu và chọn nghĩa đúng",
          audioText: "오늘 날씨가 아주 좋아서 공원에 가고 싶어요.",
          options: [
            "Hôm nay thời tiết rất đẹp nên tôi muốn đi công viên.",
            "Hôm nay trời mưa nên tôi ở nhà ngủ.",
            "Ngày mai tôi có hẹn ăn tối với bạn."
          ],
          correctIndex: 0,
          note: "Lưu ý từ khóa: 날씨가 아주 좋아서 (thời tiết rất đẹp) + 공원에 가고 싶어요 (muốn đi công viên)."
        },
        {
          id: "fill",
          label: "Dạng 2: Điền từ nghe được",
          title: "Luyện Nghe: Nghe và điền từ vào chỗ trống",
          audioText: "어제 도서관에서 한국어 숙제를 했어요.",
          maskedSentence: "어제 ( ________ )에서 한국어 숙제를 했어요.",
          answer: "도서관",
          note: "Câu đầy đủ: 어제 도서관에서 한국어 숙제를 했어요. (Hôm qua tôi đã làm bài tập tiếng Hàn ở thư viện.)"
        }
      ]
    },

    speaking: {
      modes: [
        { id: "shadowing", label: "1. Luyện nói Shadowing" },
        { id: "ai", label: "2. Đặt câu & AI chấm chữa" }
      ],
      shadowing: [
        {
          ko: "한국어를 공부한 지 육 개월쯤 되었어요.",
          vi: "Tôi đã học tiếng Hàn được khoảng 6 tháng rồi.",
          note: "Lưu ý nối âm: [한국어를 → 한구거를], [육 개월 → 육깨월]"
        },
        {
          ko: "주말에 시간이 있으면 같이 영화를 볼까요?",
          vi: "Cuối tuần nếu có thời gian thì chúng ta cùng xem phim nhé?",
          note: "Lưu ý ngữ điệu: Lên giọng nhẹ ở cuối câu hỏi -(으)ㄹ까요?"
        }
      ],
      aiPrompt: {
        structure: "V + -아/어 본 적이 있다 (Đã từng làm gì)",
        requiredToken: "적이 있",
        situation: "Hãy đặt một câu tiếng Hàn kể về món ăn Hàn Quốc bạn đã từng ăn hoặc nơi bạn đã từng đến.",
        sampleAnswer: "저는 불고기를 먹어 본 적이 있어요."
      }
    },

    reading: {
      title: "Đọc hiểu (O / X): 한국 대학생의 하루",
      passage: "민지 씨는 한국 대학교에 다닙니다. 매일 아침 8시에 일어나서 학교에 갑니다. 오전에는 전공 수업을 듣고 점심에는 학생 식당에서 친구들과 같이 밥을 먹습니다. 오후에는 도서관에서 숙제를 하거나 아르바이트를 합니다.",
      statements: [
        {
          text: "1. 민지 씨는 매일 아침 9시에 일어납니다.",
          isTrue: false,
          note: "Sai (X): Trong bài ghi dậy lúc 8 giờ sáng (8시에 일어나서)."
        },
        {
          text: "2. 민지 씨는 점심에 학생 식당에서 식사를 합니다.",
          isTrue: true,
          note: "Đúng (O): Trong bài ghi ăn trưa ở nhà ăn sinh viên (학생 식당에서)."
        },
        {
          text: "3. 민지 씨는 오후에 항상 집에서 쉽니다.",
          isTrue: false,
          note: "Sai (X): Buổi chiều bạn ấy làm bài tập ở thư viện hoặc làm thêm."
        }
      ]
    },

    writing: {
      modes: [
        { id: "practice", label: "1. Viết giấy ô vuông" },
        { id: "guide", label: "2. Quy tắc & Từ văn viết" }
      ],
      wongojiRules: [
        "Ô đầu tiên của mỗi đoạn văn lùi vào 1 ô trống.",
        "Dấu chấm (.) và dấu phẩy (,) chiếm 1 ô riêng, đặt ở góc dưới bên trái.",
        "Dấu cách giữa các từ để trống 1 ô; nếu hết dòng thì bỏ qua ô cách ở đầu dòng mới."
      ],
      correlativeStructures: [
        "왜냐하면 ~ -기 때문이다 (Sở dĩ... là vì...)",
        "비록 ~ -지만 (Mặc dù... nhưng...)",
        "첫째 ~, 둘째 ~, 마지막으로 ~ (Thứ nhất..., thứ hai..., cuối cùng...)"
      ],
      writtenWords: [
        "Văn nói: 나/저 → Văn viết: 나 (Tuyệt đối không dùng 저 trong bài luận)",
        "Văn nói: 그리고 → Văn viết: 또한 / 아울러 / 및",
        "Văn nói: 하지만 → Văn viết: 그러나 / 반면에",
        "Văn nói: -아요/어요 → Văn viết: -는다 / -ㄴ다 / -다"
      ]
    }
  }
};
