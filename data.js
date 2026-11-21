const STUDY_DATA = {
  // =========================================================================
  // PHẦN 1: TỪ VỰNG HỌC THEO CỤM (CHIA THEO CHỦ ĐỀ)
  // =========================================================================
  vocabTopics: [
    {
      id: "daily",
      title: "Chủ đề 1: Đời sống thường nhật (일상생활)",
      items: [
        {
          chunk: "알람을 맞추다",
          meaning: "Đặt báo thức",
          exampleKo: "내일 일찍 일어나야 해서 알람을 맞췄어요.",
          exampleVi: "Vì ngày mai phải dậy sớm nên tôi đã đặt báo thức.",
          note: "Lưu ý: Dùng động từ 맞추다 (điều chỉnh/đặt), không dùng 놓다.",
          pinterestImg: ""
        },
        {
          chunk: "약속을 잡다",
          meaning: "Hẹn lịch / Lên lịch hẹn",
          exampleKo: "이번 주말에 친구와 만나기로 약속을 잡았어요.",
          exampleVi: "Tôi đã lên lịch hẹn gặp bạn vào cuối tuần này.",
          note: "Lưu ý: Hủy hẹn là 약속을 취소하다, trễ hẹn là 약속에 늦다.",
          pinterestImg: ""
        },
        {
          chunk: "집안일을 돕다",
          meaning: "Giúp việc nhà",
          exampleKo: "주말마다 부모님의 집안일을 돕고 있어요.",
          exampleVi: "Cuối tuần nào tôi cũng giúp bố mẹ làm việc nhà.",
          note: "Lưu ý: 돕다 là bất quy tắc ㅂ → chia đuôi 아/어요 thành 도와요.",
          pinterestImg: ""
        }
      ]
    },
    {
      id: "school",
      title: "Chủ đề 2: Cuộc sống học đường (학교생활)",
      items: [
        {
          chunk: "수업을 듣다",
          meaning: "Nghe giảng / Học môn học",
          exampleKo: "이번 학기에 한국어 문학 수업을 들어요.",
          exampleVi: "Học kỳ này tôi học môn văn học Hàn Quốc.",
          note: "Lưu ý: Người Hàn nói 'nghe tiết học' (수업을 듣다) thay vì 'học tiết học'.",
          pinterestImg: ""
        },
        {
          chunk: "과제를 제출하다",
          meaning: "Nộp bài tập",
          exampleKo: "금요일까지 교수님께 과제를 제출해야 해요.",
          exampleVi: "Phải nộp bài tập cho giáo sư trước thứ Sáu.",
          note: "Lưu ý: Đồng nghĩa giao tiếp là 숙제를 내다 (nộp bài tập về nhà).",
          pinterestImg: ""
        },
        {
          chunk: "장학금을 받다",
          meaning: "Nhận học bổng",
          exampleKo: "열심히 공부해서 꼭 장학금을 받고 싶어요.",
          exampleVi: "Tôi muốn học chăm chỉ để nhất định nhận được học bổng.",
          note: "Lưu ý: Xin học bổng dùng cụm 장학금을 신청하다.",
          pinterestImg: ""
        }
      ]
    }
  ],

  // =========================================================================
  // PHẦN 2: NGỮ PHÁP (THEO CHỦ ĐỀ, GIAO TIẾP, VĂN VIẾT, SO SÁNH)
  // =========================================================================
  grammar: {
    // 2.1 Theo chủ đề
    topic: [
      {
        topicId: "daily",
        topicName: "Đời sống thường nhật",
        form: "V + -는 길이다",
        meaning: "Đang trên đường làm gì (đi/về)",
        exampleKo: "지금 집에 가는 길이에요.",
        exampleVi: "Bây giờ tôi đang trên đường về nhà.",
        note: "Lưu ý: Chỉ đi với động từ di chuyển như 가다, 오다, 출근하다, 퇴근하다."
      },
      {
        topicId: "school",
        topicName: "Cuộc sống học đường",
        form: "V + -(으)ㄹ 겸",
        meaning: "Nhân tiện / Kết hợp làm hai việc",
        exampleKo: "공부도 할 겸 친구도 만날 겸 도서관에 갔어요.",
        exampleVi: "Tôi đến thư viện để vừa học bài vừa gặp bạn.",
        note: "Lưu ý: Thường lặp lại 2 lần 'V1-(으)ㄹ 겸 V2-(으)ㄹ 겸'."
      }
    ],

    // 2.2 Ngữ pháp giao tiếp + Gợi ý cấu trúc câu đi kèm
    speaking: [
      {
        form: "A/V + -잖아요",
        meaning: "Chẳng phải là... sao (nhắc lại điều người nghe cũng biết)",
        exampleKo: "내일은 일요일이잖아요. 집에서 푹 쉬세요.",
        exampleVi: "Ngày mai chẳng phải là Chủ nhật sao. Hãy nghỉ ngơi ở nhà đi.",
        suggestedStructures: [
          "왜 [N]을/를 안 먹어요? → 배가 부르잖아요. (Tại sao không ăn? → Chẳng phải đang no bụng sao.)",
          "오늘 너무 춥네요. → 겨울이잖아요. (Hôm nay lạnh quá. → Chẳng phải đang mùa đông sao.)"
        ],
        note: "Lưu ý: Không dùng với người lớn tuổi hoặc cấp trên vì dễ gây cảm giác trách móc."
      },
      {
        form: "V + -(으)ㄹ까요?",
        meaning: "Chúng ta cùng... nhé? / Tôi làm... cho bạn nhé?",
        exampleKo: "우리 같이 점심 먹을까요?",
        exampleVi: "Chúng ta cùng ăn trưa nhé?",
        suggestedStructures: [
          "주말에 뭐 할까요? → 영화 볼까요? (Cuối tuần làm gì nhỉ? → Xem phim nhé?)",
          "창문을 좀 열까요? → 네, 열어 주세요. (Tôi mở cửa sổ một chút nhé? → Vâng, mở giúp tôi.)"
        ],
        note: "Lưu ý: Khi chủ ngữ là 'tôi' (내가), cấu trúc này dùng để hỏi ý kiến người nghe."
      }
    ],

    // 2.3 Ngữ pháp văn viết
    writing: [
      {
        form: "V + -는다 / -ㄴ다 (Thể văn viết trần thuật)",
        meaning: "Đuôi kết thúc câu trong báo chí, bài luận, nhật ký",
        exampleKo: "많은 사람들이 건강을 위해 매일 운동을 한다.",
        exampleVi: "Nhiều người tập thể dục mỗi ngày vì sức khỏe.",
        note: "Lưu ý: Động từ có patchim + -는다 (먹는다); không patchim + -ㄴ다 (간다); tính từ giữ nguyên nguyên thể (예쁘다)."
      },
      {
        form: "V/A + -기 때문이다",
        meaning: "Là vì... (nêu nguyên nhân trong văn viết trang trọng)",
        exampleKo: "한국어를 배우는 이유는 한국 문화가 좋기 때문이다.",
        exampleVi: "Lý do học tiếng Hàn là vì thích văn hóa Hàn Quốc.",
        note: "Lưu ý: Đầu câu thường kết hợp hô ứng với '이유는 ~ -기 때문이다'."
      }
    ],

    // 2.4 So sánh ngữ pháp tương đồng
    compare: [
      {
        pair: "-아/어서  VS  -(으)니까",
        similarity: "Đều mang nghĩa 'Vì... nên...' chỉ nguyên nhân - kết quả.",
        differenceNote: "Lưu ý khác biệt quan trọng:\n• -아/어서: Không chia thì quá khứ (-았/었어서 SAI), vế sau KHÔNG dùng câu mệnh lệnh/rủ rê (-세요, -읍시다).\n• -(으)니까: Chia được thì quá khứ (-았/었으니까 ĐÚNG), vế sau DÙNG ĐƯỢC câu mệnh lệnh/rủ rê.",
        exampleKo: "날씨가 추우니까 따뜻한 옷을 입으세요. (Đúng) / 추워서 입으세요. (Sai)",
        exampleVi: "Vì trời lạnh nên hãy mặc áo ấm vào."
      }
    ],

    // 2.5 Bài tập luyện ngữ pháp (Đục lỗ & Dịch câu)
    exercises: {
      cloze: [
        {
          question: "날씨가 더우_______ 에어컨을 켜세요. (Điền -아서 hoặc -니까)",
          answer: "니까",
          note: "Giải thích: Vế sau là câu mệnh lệnh (-세요) nên bắt buộc dùng -(으)니까."
        },
        {
          question: "지금 회사에 가_______ 길이에요. (Điền -는 hoặc -은)",
          answer: "는",
          note: "Giải thích: Động từ 가다 kết hợp với -는 길이다."
        }
      ],
      translate: [
        {
          vi: "Ngày mai chẳng phải là ngày thi sao.",
          answerKo: "내일은 시험 날이잖아요.",
          note: "Gợi ý: Sử dụng cấu trúc giao tiếp -잖아요 với danh từ 시험 날."
        },
        {
          vi: "Tôi đến quán cà phê để vừa đọc sách vừa uống cà phê.",
          answerKo: "책도 읽을 겸 커피도 마실 겸 카페에 갔어요.",
          note: "Gợi ý: Sử dụng cấu trúc -(으)ㄹ 겸."
        }
      ]
    }
  },

  // =========================================================================
  // PHẦN 3: BỐN KỸ NĂNG (NGHE - NÓI - ĐỌC - VIẾT)
  // =========================================================================
  skills: {
    // 3.1 Nghe: Điền từ & Trắc nghiệm A/B/C/D
    listening: {
      fillBlank: {
        audioScript: "어제 도서관에서 한국어 숙제를 했어요.",
        displaySentence: "어제 ( ________ )에서 한국어 숙제를 했어요.",
        answer: "도서관",
        meaning: "Hôm qua tôi đã làm bài tập tiếng Hàn ở thư viện."
      },
      multipleChoice: {
        audioScript: "여자: 민수 씨, 어디에 가요? 남자: 머리가 아파서 약국에 가는 길이에요.",
        question: "Bạn nam (민수) vừa nói mình đang đi đâu?",
        options: [
          "A. 도서관 (Thư viện)",
          "B. 약국 (Hiệu thuốc)",
          "C. 우체국 (Bưu điện)",
          "D. 은행 (Ngân hàng)"
        ],
        correctIndex: 1,
        note: "Lưu ý từ khóa nghe được: '머리가 아파서 약국에 가는 길이에요' (Vì đau đầu nên đang trên đường tới hiệu thuốc)."
      }
    },

    // 3.2 Nói: Shadowing & Đặt câu theo cấu trúc với AI
    speaking: {
      shadowingList: [
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
      aiPrompts: [
        {
          structure: "V + -아/어 본 적이 있다 (Đã từng làm gì)",
          requiredToken: "적이 있",
          situation: "Hãy đặt một câu tiếng Hàn kể về món ăn Hàn Quốc bạn đã từng ăn hoặc nơi bạn đã từng đến.",
          sampleAnswer: "저는 불고기를 먹어 본 적이 있어요."
        },
        {
          structure: "V + -(으)려고 하다 (Dự định làm gì)",
          requiredToken: "려고",
          situation: "Hãy nói về dự định cuối tuần này của bạn bằng cấu trúc -(으)려고 하다.",
          sampleAnswer: "이번 주말에 친구하고 쇼핑하려고 해요."
        }
      ]
    },

    // 3.3 Đọc: Tích Đúng / Sai (O / X) chuẩn sách Tiếng Hàn Tổng Hợp
    reading: {
      title: "Bài đọc: 한국 대학생의 하루 (Một ngày của sinh viên đại học Hàn Quốc)",
      passage: "민지 씨는 한국 대학교에 다닙니다. 매일 아침 8시에 일어나서 학교에 갑니다. 오전에는 전공 수업을 듣고 점심에는 학생 식당에서 친구들과 같이 밥을 먹습니다. 오후에는 도서관에서 숙제를 하거나 아르바이트를 합니다. 저녁에는 집에 돌아와서 가족들과 이야기를 나눕니다.",
      statements: [
        {
          text: "1. 민지 씨는 매일 아침 9시에 일어납니다.",
          isTrue: false,
          explanation: "Sai (X): Trong bài ghi dậy lúc 8 giờ sáng (매일 아침 8시에 일어나서)."
        },
        {
          text: "2. 민지 씨는 점심에 학생 식당에서 식사를 합니다.",
          isTrue: true,
          explanation: "Đúng (O): Trong bài ghi '점심에는 학생 식당에서 친구들과 같이 밥을 먹습니다'."
        },
        {
          text: "3. 민지 씨는 오후에 항상 집에서 쉽니다.",
          isTrue: false,
          explanation: "Sai (X): Buổi chiều bạn ấy làm bài tập ở thư viện hoặc đi làm thêm."
        }
      ]
    },

    // 3.4 Viết: Giấy ô vuông, cấu trúc hô ứng, từ chỉ dùng trong văn viết
    writingGuide: {
      wongojiRules: [
        "Ô đầu tiên của mỗi đoạn văn luôn lùi vào 1 ô trống.",
        "Dấu chấm (.) và dấu phẩy (,) chiếm 1 ô riêng, đặt ở góc dưới bên trái của ô.",
        "Dấu cách giữa các từ (띄어쓰기) để trống 1 ô; nếu hết dòng mà đúng dấu cách thì bỏ qua ô cách ở đầu dòng mới.",
        "Số và chữ cái tiếng Anh viết 2 ký tự trong 1 ô vuông."
      ],
      correlativeStructures: [
        { pair: "왜냐하면 ~ -기 때문이다", meaning: "Sở dĩ... là vì..." },
        { pair: "비록 ~ -지만", meaning: "Mặc dù... nhưng..." },
        { pair: "첫째 ~, 둘째 ~, 마지막으로 ~", meaning: "Thứ nhất..., thứ hai..., cuối cùng là..." },
        { pair: "~에 따르면 ~ -(으)ㄴ/는다고 한다", meaning: "Theo như... thì nghe nói rằng..." }
      ],
      writtenOnlyWords: [
        { spoken: "나 / 저 (Tôi)", written: "나 (chỉ dùng 나, tuyệt đối không dùng 저)", note: "Lưu ý quan trọng khi viết bài luận TOPIK!" },
        { spoken: "너 (Bạn)", written: "당신 / 독자 (Không dùng 너)", note: "Tránh gọi người đọc là 너." },
        { spoken: "그리고 (Và)", written: "또한 / 아울러 / 및", note: "Dùng liên từ văn viết để tăng điểm từ vựng." },
        { spoken: "하지만 (Nhưng)", written: "그러나 / 반면에", note: "Thay thế 하지만 trong văn nghị luận." },
        { spoken: "-아요 / -어요", written: "-는다 / -ㄴ다 / -다", note: "Bắt buộc dùng đuôi trần thuật văn viết." }
      ]
    }
  }
};
