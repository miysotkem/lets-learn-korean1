/* ==========================================================================
   DỮ LIỆU BÀI HỌC: GIÁO TRÌNH TIẾNG HÀN TỔNG HỢP QUYỂN 2, QUYỂN 3, QUYỂN 4
   - Không dùng ảnh minh họa từ vựng
   - Đầy đủ 3 phần cho mỗi chủ đề: Từ vựng theo cụm, Ngữ pháp + Dịch câu, 4 Kỹ năng
   ========================================================================== */

const KOREAN_CURRICULUM = [
  /* ======================= QUYỂN 2 (SƠ CẤP 2) ======================= */
  {
    id: "q2-bai2",
    book: "Quyển 2 (Sơ cấp 2)",
    code: "Quyển 2 - Bài 2",
    titleVi: "Sở thích",
    titleKo: "취미",
    vocabChunks: [
      {
        ko: "스트레스를 풀다",
        vi: "Giải tỏa căng thẳng",
        breakdown: "스트레스 (căng thẳng) + 를 + 풀다 (tháo gỡ, giải tỏa)",
        exampleKo: "저는 주말마다 등산을 하면서 스트레스를 풀어요.",
        exampleVi: "Mỗi cuối tuần tôi leo núi để giải tỏa căng thẳng.",
        importantNote: "Lưu ý: Không dùng '스트레스를 버리다', cụm tự nhiên của người Hàn là '스트레스를 풀다' hoặc '스트레스가 쌓이다' (tích tụ căng thẳng)."
      },
      {
        ko: "동호회에 가입하다",
        vi: "Gia nhập câu lạc bộ sở thích",
        breakdown: "동호회 (hội cùng sở thích/CLB) + 에 + 가입하다 (gia nhập)",
        exampleKo: "사진을 잘 찍고 싶어서 사진 동호회에 가입했어요.",
        exampleVi: "Vì muốn chụp ảnh đẹp nên tôi đã gia nhập câu lạc bộ nhiếp ảnh.",
        importantNote: "Lưu ý phát âm: '가입하다' đọc nối âm thành [가이파다]."
      },
      {
        ko: "악기를 연주하다",
        vi: "Chơi nhạc cụ / Biểu diễn nhạc cụ",
        breakdown: "악기 (nhạc cụ) + 를 + 연주하다 (biểu diễn, chơi nhạc)",
        exampleKo: "제 취미는 피아노나 기타 같은 악기를 연주하는 거예요.",
        exampleVi: "Sở thích của tôi là chơi các nhạc cụ như piano hay guitar.",
        importantNote: "Lưu ý biến âm: '악기' đọc căng âm thành [악끼]."
      },
      {
        ko: "취미 생활을 즐기다",
        vi: "Tận hưởng cuộc sống có sở thích",
        breakdown: "취미 생활 (sinh hoạt sở thích) + 을 + 즐기다 (tận hưởng)",
        exampleKo: "바쁘더라도 가끔은 여유롭게 취미 생활을 즐기세요.",
        exampleVi: "Dù bận rộn nhưng thỉnh thoảng hãy thảnh thơi tận hưởng sở thích của mình nhé.",
        importantNote: "Lưu ý: '즐기다' luôn đi với tiểu từ tân ngữ '을/를'."
      }
    ],
    grammar: [
      {
        pattern: "V-(으)ㄹ 수 있다 / 없다",
        meaning: "Có thể / Không thể làm gì (Năng lực hoặc khả năng)",
        explanation: "Gắn sau động từ để diễn tả năng lực bản thân hoặc điều kiện khách quan cho phép hay không.",
        caution: "Động từ có patchim + 을 수 있다 (읽을 수 있다); không patchim hoặc patchim ㄹ + ㄹ 수 있다 (갈 수 있다, 만들 수 있다). Chữ '수' luôn đọc căng thành [쑤].",
        examples: [
          { ko: "저는 한국 노래를 부를 수 있습니다.", vi: "Tôi có thể hát bài hát tiếng Hàn." },
          { ko: "오늘 약속이 있어서 모임에 갈 수 없어요.", vi: "Hôm nay tôi có hẹn nên không thể đến buổi họp mặt." }
        ]
      },
      {
        pattern: "V-(으)러 가다 / 오다",
        meaning: "Đi / Đến để làm gì (Chỉ mục đích di chuyển)",
        explanation: "Diễn tả mục đích của hành động di chuyển (luôn kết hợp với động từ chuyển động như 가다, 오다, 다니다).",
        caution: "KHÔNG được chia thì quá khứ hay tương lai ở trước '-(으)러', chỉ chia thì ở động từ '가다/오다' phía sau (예: 먹으러 갔어요 - ĐÚNG; 먹었으러 갔어요 - SAI).",
        examples: [
          { ko: "친구와 같이 영화를 보러 영화관에 갔어요.", vi: "Tôi đã đi đến rạp chiếu phim cùng bạn để xem phim." },
          { ko: "한국어를 배우러 한국에 왔습니다.", vi: "Tôi đã đến Hàn Quốc để học tiếng Hàn." }
        ]
      }
    ],
    translationExercises: [
      {
        vi: "Cuối tuần tôi thường đi đến công viên để chụp ảnh.",
        hint: "주말에 (cuối tuần), 공원 (công viên), 사진을 찍다 (chụp ảnh)",
        answerKo: "주말에 보통 공원에 사진을 찍으러 가요.",
        note: "'찍다' có patchim 'ㄱ' nên đi với '-으러 가요'."
      },
      {
        vi: "Em trai tôi có thể chơi đàn guitar rất giỏi.",
        hint: "남동생 (em trai), 기타를 치다 (chơi guitar), 아주 잘 (rất giỏi)",
        answerKo: "제 남동생은 기타를 아주 잘 칠 수 있어요.",
        note: "'치다' không có patchim nên gắn '-ㄹ 수 있어요'."
      }
    ],
    skills: {
      listening: {
        dictation: {
          title: "Bài 1: Nghe đoạn hội thoại về sở thích và điền cụm từ còn thiếu",
          audioScript: "제 취미는 여행입니다. 방학 때마다 친구들과 같이 새로운 곳에 여행을 가러 계획을 세웁니다.",
          segments: [
            "제 취미는 여행입니다. 방학 때마다 친구들과 같이 새로운 곳에 ",
            { blank: "여행을 가러", hint: "Đi du lịch để..." },
            " ",
            { blank: "계획을 세웁니다", hint: "Lập kế hoạch" },
            "."
          ]
        },
        comprehension: {
          title: "Bài 2: Nghe hội thoại và trả lời câu hỏi kiểm tra thông tin",
          audioScript: "남자: 유진 씨, 주말에 보통 뭐 해요? 여자: 저는 수영 동호회에 가입해서 토요일마다 수영장에 가요. 스트레스를 풀 수 있어서 정말 좋아요.",
          question: "Tại sao bạn nữ (유진) lại thích đi bơi vào cuối tuần?",
          options: [
            "A. Vì gần nhà (집에서 가까워서)",
            "B. Vì có thể giải tỏa căng thẳng (스트레스를 풀 수 있어서)",
            "C. Vì học phí rẻ (수업료가 싸서)",
            "D. Vì gặp được nhiều người nổi tiếng (유명한 사람을 만날 수 있어서)"
          ],
          correctIndex: 1,
          explanation: "Bạn nữ nói rõ: '스트레스를 풀 수 있어서 정말 좋아요.' (Vì có thể giải tỏa căng thẳng nên rất thích)."
        }
      },
      speaking: {
        shadowing: [
          {
            ko: "시간이 있을 때마다 음악을 들으면서 책을 읽어요.",
            vi: "Mỗi khi có thời gian tôi vừa nghe nhạc vừa đọc sách.",
            tip: "Đọc nối âm '있을 때마다' -> [이쓸 때마다], '책을 읽어요' -> [채글 일거요]."
          },
          {
            ko: "다음 주에 사진 동호회 회원들과 출사를 가기로 했어요.",
            vi: "Tuần sau tôi đã hẹn đi chụp ảnh ngoại cảnh cùng các thành viên CLB nhiếp ảnh.",
            tip: "Nhấn nhẹ vào cụm '출사를 가기로 했어요' để tạo ngữ điệu tự nhiên."
          }
        ],
        aiPrompt: {
          structure: "제 취미는 [Sở thích]입니다. 시간이 있을 때 [Hành động]-(으)러 가요 / -(으)ㄹ 수 있어요.",
          meaning: "Sở thích của tôi là [...]. Khi có thời gian tôi đi để [...] / có thể [...].",
          sampleAnswer: "제 취미는 등산입니다. 주말마다 산에 사진을 찍으러 가요.",
          aiOpeningKo: "안녕하세요! 취미에 대해 이야기해 볼까요? '-(으)러 가다'나 '-(으)ㄹ 수 있다'를 사용해서 말해 보세요!",
          aiOpeningVi: "Xin chào! Cùng trò chuyện về sở thích bằng cấu trúc '-(으)러 가다' hoặc '-(으)ㄹ 수 있다' nhé!"
        }
      },
      reading: {
        title: "Đọc đoạn văn sau và tích Đúng (O) hoặc Sai (X)",
        passage: "저는 어렸을 때부터 그림 그리는 것을 좋아했습니다. 그래서 대학교에 들어간 후에 미술 동호회에 가입했습니다. 동호회 회원들과 매주 일요일에 공원에 그림을 그리러 갑니다. 요즘은 유화도 그릴 수 있게 되어서 정말 기쁩니다.",
        statements: [
          {
            text: "글쓴이는 대학교에 들어가기 전에 미술 동호회에 가입했습니다. (Người viết gia nhập CLB mỹ thuật trước khi vào đại học.)",
            isTrue: false,
            proof: "Đoạn văn ghi: '대학교에 들어간 후에 미술 동호회에 가입했습니다.' (Sau khi vào đại học mới gia nhập)."
          },
          {
            text: "글쓴이는 일요일마다 공원에 그림을 그리러 갑니다. (Mỗi Chủ nhật người viết đi đến công viên để vẽ tranh.)",
            isTrue: true,
            proof: "Câu thứ 3 ghi: '매주 일요일에 공원에 그림을 그리러 갑니다.'"
          }
        ]
      },
      writing: {
        topicTitle: "Đề luyện viết (Quyển 2): Viết đoạn văn (120~180 chữ) giới thiệu sở thích giúp bạn giải tỏa căng thẳng",
        requiredStructures: ["~기 때문이다 (bởi vì)", "~(으)ㄹ 수 있다 (có thể)", "đuôi văn viết ~는다 / ~다"],
        sampleEssay: "나는 스트레스를 받을 때마다 자전거를 탄다. 한강 공원에서 시원한 바람을 맞으며 자전거를 타면 기분이 좋아지기 때문이다. 주말에는 친구와 함께 멀리 여행을 갈 수도 있다."
      }
    }
  },

  {
    id: "q2-bai11",
    book: "Quyển 2 (Sơ cấp 2)",
    code: "Quyển 2 - Bài 11",
    titleVi: "Cuộc hẹn",
    titleKo: "약속",
    vocabChunks: [
      {
        ko: "약속 시간을 미루다",
        vi: "Hoãn / Lùi thời gian hẹn",
        breakdown: "약속 시간 (giờ hẹn) + 을 + 미루다 (trì hoãn, dời lại)",
        exampleKo: "갑자기 회의가 생겨서 약속 시간을 한 시간 미뤘어요.",
        exampleVi: "Vì đột nhiên có cuộc họp nên tôi đã lùi giờ hẹn lại 1 tiếng.",
        importantNote: "Lưu ý: '약속을 취소하다' là hủy hẹn hoàn toàn, còn '미루다' là dời sang lúc khác."
      },
      {
        ko: "길이 막히다",
        vi: "Tắc đường / Kẹt xe",
        breakdown: "길 (đường) + 이 + 막히다 (bị chặn, bị tắc)",
        exampleKo: "퇴근 시간이라서 시내 중심가의 길이 많이 막혀요.",
        exampleVi: "Vì là giờ tan tầm nên đường ở khu trung tâm thành phố rất tắc.",
        importantNote: "Lưu ý phát âm: '막히다' bật hơi phụ âm 'ㄱ+ㅎ' thành [마키다]."
      },
      {
        ko: "약속을 지키다",
        vi: "Giữ lời hứa / Đúng hẹn",
        breakdown: "약속 (lời hứa, cuộc hẹn) + 을 + 지키다 (giữ gìn, tuân thủ)",
        exampleKo: "한국 사회에서는 약속 시간을 잘 지키는 것이 매우 중요해요.",
        exampleVi: "Trong xã hội Hàn Quốc việc giữ đúng giờ hẹn vô cùng quan trọng.",
        importantNote: "Lưu ý trái nghĩa: Không giữ hẹn là '약속을 어기다'."
      }
    ],
    grammar: [
      {
        pattern: "V-(으)ㄹ게요",
        meaning: "Sẽ... (Biểu thị sự hứa hẹn hoặc ý chí của người nói với người nghe)",
        explanation: "Dùng khi người nói hứa sẽ làm một việc gì đó cho người nghe hoặc thông báo hành động ngay lập tức.",
        caution: "Chủ ngữ BẮT BUỘC là ngôi thứ nhất (저/나/우리) và KHÔNG dùng trong câu hỏi. Không dùng với tính từ.",
        examples: [
          { ko: "다음부터는 절대 늦지 않을게요.", vi: "Từ lần sau tôi nhất định sẽ không đến muộn nữa." },
          { ko: "도착하면 바로 연락할게요.", vi: "Khi nào đến nơi tôi sẽ liên lạc ngay." }
        ]
      },
      {
        pattern: "A/V-(으)ㄴ/는데",
        meaning: "Nhưng mà / Vì... nên... (Dẫn nhập bối cảnh cho vế sau)",
        explanation: "Dùng để nêu hoàn cảnh, lý do nhẹ nhàng hoặc sự tương phản trước khi đưa ra đề nghị, câu hỏi ở vế sau.",
        caution: "Động từ + -는데 (가는데, 먹는데); Tính từ có patchim + -은데 (작은데), không patchim + -는데 (바쁜데); Danh từ + -인데.",
        examples: [
          { ko: "지금 길이 많이 막히는데 지하철을 타고 오세요.", vi: "Bây giờ đường đang tắc lắm nên bạn hãy đi tàu điện ngầm đến nhé." },
          { ko: "내일 시간이 있는데 같이 영화 볼까요?", vi: "Ngày mai tôi có thời gian, chúng ta cùng xem phim nhé?" }
        ]
      }
    ],
    translationExercises: [
      {
        vi: "Vì trời đang mưa nên tôi sẽ đi taxi đến.",
        hint: "비가 오다 (trời mưa), 택시를 타다 (đi taxi)",
        answerKo: "지금 비가 오는데 택시를 타고 갈게요.",
        note: "Vế 1 nêu bối cảnh dùng '-는데', vế 2 hứa hẹn hành động dùng '-(으)ㄹ게요'."
      }
    ],
    skills: {
      listening: {
        dictation: {
          title: "Bài 1: Nghe tin nhắn thoại xin lỗi vì đến muộn và điền từ",
          audioScript: "미안해요, 수진 씨. 지금 버스를 탔는데 길이 너무 막혀요. 십 분쯤 늦을 것 같아요.",
          segments: [
            "미안해요, 수진 씨. 지금 버스를 탔는데 ",
            { blank: "길이 너무 막혀요", hint: "Đường rất tắc" },
            ". 십 분쯤 늦을 것 같아요."
          ]
        },
        comprehension: {
          title: "Bài 2: Nghe hội thoại và chọn thông tin chính xác",
          audioScript: "남자: 지영 씨, 오늘 저녁 6시에 식당 앞에서 만날까요? 여자: 죄송해요. 오늘 야근을 해야 하는데 약속 시간을 7시로 미뤄도 될까요? 남자: 네, 괜찮아요. 그럼 7시에 봐요.",
          question: "Hai người quyết định gặp nhau lúc mấy giờ?",
          options: [
            "A. 6 giờ tối (저녁 6시)",
            "B. 6 giờ 30 tối (저녁 6시 30분)",
            "C. 7 giờ tối (저녁 7시)",
            "D. Ngày mai (내일)"
          ],
          correctIndex: 2,
          explanation: "Bạn nữ xin lùi giờ hẹn sang 7 giờ ('7시로 미뤄도 될까요?') và bạn nam đã đồng ý."
        }
      },
      speaking: {
        shadowing: [
          {
            ko: "죄송하지만 약속 시간을 조금만 미룰 수 있을까요?",
            vi: "Xin lỗi nhưng chúng ta có thể lùi giờ hẹn lại một chút được không ạ?",
            tip: "Đọc liền mạch '미룰 수 있을까요' -> [미룰 쑤 이쓸까요]."
          }
        ],
        aiPrompt: {
          structure: "지금 [Lý do]-(으)ㄴ/는데 [Hành động]-(으)ㄹ게요.",
          meaning: "Bây giờ vì [Lý do] nên tôi sẽ [Hành động].",
          sampleAnswer: "지금 길이 많이 막히는데 지하철로 갈아탈게요.",
          aiOpeningKo: "여보세요? 약속 시간이 다 됐는데 어디쯤 왔어요? 상황을 설명하고 대답해 보세요!",
          aiOpeningVi: "Alo? Đến giờ hẹn rồi mà bạn đang ở đâu thế? Hãy giải thích tình huống bằng '-(으)ㄴ/는데' và '-(으)ㄹ게요' nhé!"
        }
      },
      reading: {
        title: "Đọc tin nhắn sau và tích Đúng (O) hoặc Sai (X)",
        passage: "민호 씨, 저 흐엉이에요. 오늘 오후 3시에 도서관 앞에서 만나기로 했는데, 갑자기 교수님과 상담이 생겼어요. 정말 미안해요. 혹시 내일 같은 시간에 만나면 안 될까요? 내일은 제가 꼭 일찍 나가서 기다릴게요.",
        statements: [
          {
            text: "흐엉 씨는 오늘 오후 3시에 교수님과 상담이 있습니다. (Hương có buổi tư vấn với giáo sư lúc 3h chiều nay.)",
            isTrue: true,
            proof: "Đoạn văn nêu rõ lý do hoãn hẹn lúc 3h chiều nay là vì đột nhiên có buổi tư vấn với giáo sư."
          },
          {
            text: "흐엉 씨는 내일 도서관에 늦게 갈 것입니다. (Ngày mai Hương sẽ đến thư viện muộn.)",
            isTrue: false,
            proof: "Câu cuối hứa: '내일은 제가 꼭 일찍 나가서 기다릴게요.' (Ngày mai nhất định sẽ ra sớm đợi)."
          }
        ]
      },
      writing: {
        topicTitle: "Đề luyện viết: Viết đoạn văn ngắn nêu tầm quan trọng của việc giữ đúng giờ hẹn",
        requiredStructures: ["~는 반면에 (trái lại)", "그러므로 (do đó)", "đuôi văn viết ~다 / ~이다"],
        sampleEssay: "약속을 잘 지키는 사람은 신뢰를 얻는 반면에 자주 늦는 사람은 믿음을 잃는다. 그러므로 부득이한 일이 생기면 미리 연락해서 양해를 구해야 한다."
      }
    }
  },

  /* ======================= QUYỂN 3 (TRUNG CẤP 1) ======================= */
  {
    id: "q3-bai1",
    book: "Quyển 3 (Trung cấp 1)",
    code: "Quyển 3 - Bài 1",
    titleVi: "Cuộc sống trường học",
    titleKo: "학교생활",
    vocabChunks: [
      {
        ko: "수강 신청을 하다",
        vi: "Đăng ký môn học / Đăng ký tín chỉ",
        breakdown: "수강 신청 (đăng ký học phần) + 을 + 하다",
        exampleKo: "인기 있는 교양 과목은 수강 신청을 하기가 하늘의 별 따기예요.",
        exampleVi: "Các môn đại cương nổi tiếng thì việc đăng ký tín chỉ khó như hái sao trên trời.",
        importantNote: "Lưu ý cụm thành ngữ đi kèm: '하늘의 별 따기' (khó như hái sao trên trời - rất hay gặp trong Quyển 3)."
      },
      {
        ko: "장학금을 받다",
        vi: "Nhận học bổng",
        breakdown: "장학금 (tiền học bổng) + 을 + 받다 (nhận)",
        exampleKo: "이번 학기에 성적이 많이 올라서 장학금을 받게 되었어요.",
        exampleVi: "Học kỳ này thành tích tăng lên nhiều nên tôi đã được nhận học bổng.",
        importantNote: "Lưu ý phát âm: '장학금' đọc biến âm căng thành [장학끔]."
      },
      {
        ko: "전공을 살리다",
        vi: "Phát huy chuyên ngành / Làm đúng chuyên ngành",
        breakdown: "전공 (chuyên ngành) + 을 + 살리다 (làm sống dậy, phát huy)",
        exampleKo: "졸업한 후에 제 전공을 살려서 통역사로 일하고 싶습니다.",
        exampleVi: "Sau khi tốt nghiệp tôi muốn phát huy chuyên ngành của mình để làm phiên dịch viên.",
        importantNote: "Lưu ý: '전공을 살리다' (làm đúng chuyên ngành) trái nghĩa với '전공을 바꾸다' (đổi chuyên ngành)."
      },
      {
        ko: "발표를 준비하다",
        vi: "Chuẩn bị bài thuyết trình",
        breakdown: "발표 (phát biểu, thuyết trình) + 를 + 준비하다",
        exampleKo: "조별 과제를 잘하기 위해 팀원들과 밤늦게까지 발표를 준비했어요.",
        exampleVi: "Để làm tốt bài tập nhóm tôi đã chuẩn bị thuyết trình cùng các thành viên đến khuya.",
        importantNote: "Lưu ý từ vựng: '조별 과제' = bài tập nhóm (rất đặc trưng ở đại học Hàn Quốc)."
      }
    ],
    grammar: [
      {
        pattern: "A/V-기 때문에",
        meaning: "Vì / Bởi vì (Nhấn mạnh nguyên nhân mang tính khách quan, rõ ràng)",
        explanation: "Dùng nhiều trong văn viết, thuyết trình hoặc giải thích lý do trang trọng hơn '-아/어서'.",
        caution: "Có thể kết hợp với thì quá khứ '-았/었기 때문에' (khác với '-아/어서' không chia quá khứ). Với danh từ dùng 'N이기 때문에' hoặc 'N 때문에'.",
        examples: [
          { ko: "한국 문화를 깊이 이해하고 싶기 때문에 한국학과를 선택했습니다.", vi: "Vì muốn hiểu sâu sắc văn hóa Hàn Quốc nên tôi đã chọn khoa Hàn Quốc học." },
          { ko: "어제 밤을 새웠기 때문에 오늘 수업 시간에 너무 졸렸어요.", vi: "Vì hôm qua thức trắng đêm nên giờ học hôm nay tôi buồn ngủ quá." }
        ]
      },
      {
        pattern: "V-(으)면서",
        meaning: "Vừa... vừa... (Hai hành động diễn ra đồng thời)",
        explanation: "Diễn tả một chủ thể thực hiện cùng lúc hai hành động hoặc mang hai trạng thái song song.",
        caution: "Chủ ngữ của hai vế BẮT BUỘC phải giống nhau. Nếu hai chủ ngữ khác nhau phải dùng '-(으)ㄴ/는 반면에' hoặc '-(으)ㄴ/는 동안에'.",
        examples: [
          { ko: "요즘 대학교에 다니면서 아르바이트도 하고 있어요.", vi: "Dạo này tôi vừa đi học đại học vừa đi làm thêm nữa." },
          { ko: "교수님의 설명을 들으면서 중요한 내용을 필기했습니다.", vi: "Tôi vừa nghe giảng của giáo sư vừa ghi chép nội dung quan trọng." }
        ]
      }
    ],
    translationExercises: [
      {
        vi: "Vì muốn nhận học bổng nên học kỳ này tôi vừa học hành chăm chỉ vừa chuẩn bị thuyết trình.",
        hint: "장학금을 받다, 이번 학기에 (học kỳ này), 열심히 공부하다",
        answerKo: "장학금을 받고 싶기 때문에 이번 학기에 열심히 공부하면서 발표를 준비해요.",
        note: "Kết hợp '-기 때문에' (lý do) ở vế đầu và '-(으)면서' (hành động đồng thời) ở vế sau."
      }
    ],
    skills: {
      listening: {
        dictation: {
          title: "Bài 1: Nghe chia sẻ của sinh viên năm nhất và điền cụm từ còn thiếu",
          audioScript: "대학교에 입학한 지 벌써 한 달이 지났습니다. 처음에는 수강 신청을 하는 것이 어려웠지만 선배들이 도와주셔서 잘 해결했습니다.",
          segments: [
            "대학교에 입학한 지 벌써 한 달이 지났습니다. 처음에는 ",
            { blank: "수강 신청을 하는", hint: "Việc đăng ký tín chỉ" },
            " 것이 어려웠지만 선배들이 도와주셔서 ",
            { blank: "잘 해결했습니다", hint: "Đã giải quyết ổn thỏa" },
            "."
          ]
        },
        comprehension: {
          title: "Bài 2: Nghe hội thoại và chọn đáp án đúng",
          audioScript: "여자: 민수 씨, 졸업 후에 무슨 일을 하고 싶어요? 남자: 저는 경제학을 전공했는데, 전공을 살려서 무역 회사에 취직하고 싶어요. 그래서 요즘 영어 공부도 하면서 자격증을 따고 있어요.",
          question: "Bạn nam (민수) đang làm gì để chuẩn bị xin việc?",
          options: [
            "A. Đang đi du lịch nước ngoài (해외여행을 가고 있다)",
            "B. Vừa học tiếng Anh vừa lấy chứng chỉ (영어 공부도 하면서 자격증을 따고 있다)",
            "C. Đang đổi chuyên ngành sang văn học (문학으로 전공을 바꾸고 있다)",
            "D. Đang nghỉ bảo lưu kết quả học tập (휴학을 하고 있다)"
          ],
          correctIndex: 1,
          explanation: "Bạn nam nói: '그래서 요즘 영어 공부도 하면서 자격증을 따고 있어요.'"
        }
      },
      speaking: {
        shadowing: [
          {
            ko: "전공을 살려서 사회에 도움이 되는 일을 하고 싶습니다.",
            vi: "Tôi muốn phát huy chuyên ngành của mình để làm công việc có ích cho xã hội.",
            tip: "Ngắt nhịp rõ sau '전공을 살려서' để thể hiện sự tự tin khi phỏng vấn."
          }
        ],
        aiPrompt: {
          structure: "[Lý do]-기 때문에 [Hành động 1]-(으)면서 [Hành động 2]-고 있어요.",
          meaning: "Vì [Lý do] nên tôi đang vừa [Hành động 1] vừa [Hành động 2].",
          sampleAnswer: "전공을 살리고 싶기 때문에 학교에 다니면서 한국어 자격증을 준비하고 있어요.",
          aiOpeningKo: "대학생활은 어때요? '-기 때문에'와 '-(으)면서'를 넣어서 요즘 어떻게 지내는지 말해 주세요!",
          aiOpeningVi: "Cuộc sống học tập dạo này thế nào? Hãy dùng '-기 때문에' và '-(으)면서' để chia sẻ nhé!"
        }
      },
      reading: {
        title: "Đọc đoạn văn sau và tích Đúng (O) hoặc Sai (X)",
        passage: "한국의 대학생들은 학기가 시작되기 전에 인터넷으로 직접 수강 신청을 합니다. 자신이 듣고 싶은 과목과 시간표를 스스로 짤 수 있기 때문에 매우 편리합니다. 그러나 인기 있는 수업은 몇 초 만에 마감되기도 해서 학생들이 긴장하면서 신청합니다.",
        statements: [
          {
            text: "한국 대학생들은 교수님이 정해 주신 시간표대로만 수업을 듣습니다. (Sinh viên Hàn chỉ học theo thời khóa biểu giáo sư sắp sẵn.)",
            isTrue: false,
            proof: "Đoạn văn ghi sinh viên tự đăng ký và tự xếp thời khóa biểu ('스스로 짤 수 있기 때문에')."
          },
          {
            text: "인기 있는 과목은 아주 짧은 시간 안에 신청이 끝날 수 있습니다. (Môn học nổi tiếng có thể hết chỗ chỉ trong thời gian rất ngắn.)",
            isTrue: true,
            proof: "Câu cuối ghi: '인기 있는 수업은 몇 초 만에 마감되기도 해서...' (Có thể đóng đăng ký chỉ sau vài giây)."
          }
        ]
      },
      writing: {
        topicTitle: "Đề luyện viết (Quyển 3): Viết đoạn văn (150~200 chữ) về mục tiêu học tập trong học kỳ này",
        requiredStructures: ["왜냐하면 ~기 때문이다", "~뿐만 아니라 ~도", "đuôi văn viết ~는다 / ~ㄴ다"],
        sampleEssay: "이번 학기에 나는 장학금을 받는 것이 목표이다. 왜냐하면 부모님의 부담을 덜어 드리고 싶기 때문이다. 이를 위해 전공 수업뿐만 아니라 교양 수업도 열심히 들으며 복습을 철저히 한다."
      }
    }
  },

  /* ======================= QUYỂN 4 (TRUNG CẤP 2) ======================= */
  {
    id: "q4-bai1",
    book: "Quyển 4 (Trung cấp 2)",
    code: "Quyển 4 - Bài 1",
    titleVi: "Kinh tế & Tiêu dùng",
    titleKo: "경제와 소비",
    vocabChunks: [
      {
        ko: "충동구매를 하다",
        vi: "Mua sắm bốc đồng / Mua theo cảm hứng",
        breakdown: "충동 (xung động, bốc đồng) + 구매 (mua sắm) + 를 + 하다",
        exampleKo: "세일 기간에는 필요 없는 물건까지 충동구매를 하게 돼서 후회할 때가 많아요.",
        exampleVi: "Vào mùa giảm giá tôi hay mua sắm bốc đồng cả những món không cần thiết nên nhiều lúc rất hối hận.",
        importantNote: "Lưu ý từ vựng mở rộng: '과소비' (tiêu dùng quá mức), '합리적인 소비' (tiêu dùng hợp lý)."
      },
      {
        ko: "가계부를 쓰다",
        vi: "Viết sổ thu chi gia đình / Ghi chép chi tiêu",
        breakdown: "가계부 (sổ chi tiêu) + 를 + 쓰다 (viết)",
        exampleKo: "지출을 줄이기 위해 매일 스마트폰 앱으로 꼼꼼하게 가계부를 쓰고 있습니다.",
        exampleVi: "Để giảm chi tiêu tôi đang ghi chép sổ thu chi tỉ mỉ mỗi ngày bằng ứng dụng điện thoại.",
        importantNote: "Lưu ý: '수입' (thu nhập) và '지출' (chi tiêu) là cặp từ đối lập quan trọng trong Quyển 4."
      },
      {
        ko: "물가가 오르다",
        vi: "Vật giá leo thang / Giá cả tăng lên",
        breakdown: "물가 (vật giá) + 가 + 오르다 (tăng lên)",
        exampleKo: "요즘 물가가 너무 많이 올라서 외식하기가 부담스러워졌어요.",
        exampleVi: "Dạo này vật giá tăng cao quá nên việc đi ăn ngoài trở nên áp lực hơn.",
        importantNote: "Lưu ý phát âm: '물가' đọc biến âm căng thành [물까]."
      },
      {
        ko: "저축을 늘리다",
        vi: "Tăng khoản tiền tiết kiệm",
        breakdown: "저축 (tiết kiệm) + 을 + 늘리다 (làm tăng lên)",
        exampleKo: "내 집 마련을 목표로 불필요한 지출을 줄이고 저축을 늘리기로 결심했어요.",
        exampleVi: "Với mục tiêu mua được nhà riêng tôi đã quyết tâm giảm chi tiêu không cần thiết và tăng tiết kiệm.",
        importantNote: "Lưu ý phân biệt: '늘다' (tự tăng lên - nội động từ) vs '늘리다' (làm cho tăng lên - ngoại động từ)."
      }
    ],
    grammar: [
      {
        pattern: "V-는 바람에",
        meaning: "Vì / Do... (Nguyên nhân bất ngờ dẫn đến kết quả tiêu cực)",
        explanation: "Diễn tả một sự việc xảy ra ngoài dự tính làm nguyên nhân trực tiếp gây ra kết quả không mong muốn ở vế sau.",
        caution: "Vế sau LUÔN là kết quả tiêu cực/bất lợi, KHÔNG dùng câu mệnh lệnh (-으세요) hay thỉnh dụ (-ㅂ시다) ở vế sau. Chỉ gắn sau động từ.",
        examples: [
          { ko: "인터넷 쇼핑몰에서 할인 행사를 하는 바람에 충동구매를 해 버렸어요.", vi: "Vì trang mua sắm trực tuyến tổ chức khuyến mãi nên tôi lỡ mua sắm bốc đồng mất rồi." },
          { ko: "지갑을 집에 두고 나오는 바람에 점심을 못 먹었습니다.", vi: "Vì để quên ví ở nhà mà đi ra ngoài nên tôi đã không ăn được bữa trưa." }
        ]
      },
      {
        pattern: "A/V-다 보면",
        meaning: "Nếu cứ làm gì đó mãi thì sẽ... (Nhận ra kết quả hoặc thay đổi qua quá trình)",
        explanation: "Diễn tả việc lặp đi lặp lại hoặc duy trì một hành động trong thời gian dài sẽ dẫn đến một kết quả hay trạng thái mới.",
        caution: "Không chia thì quá khứ trước '-다 보면'. Chủ ngữ hai vế thường giống nhau (trừ trường hợp nói về chân lý chung).",
        examples: [
          { ko: "매일 가계부를 쓰다 보면 자신의 소비 습관을 정확히 파악할 수 있어요.", vi: "Nếu cứ viết sổ chi tiêu mỗi ngày thì bạn sẽ nắm bắt chính xác thói quen tiêu dùng của bản thân." },
          { ko: "계획 없이 카드를 쓰다 보면 월말에 카드값이 감당하기 어려워집니다.", vi: "Nếu cứ quẹt thẻ không kế hoạch thì cuối tháng tiền thẻ sẽ trở nên khó gánh nổi." }
        ]
      }
    ],
    translationExercises: [
      {
        vi: "Vì vật giá leo thang quá nhiều nên tôi đã quyết định tăng tiết kiệm.",
        hint: "물가가 너무 많이 오르다, 저축을 늘리기로 하다",
        answerKo: "물가가 너무 많이 오르는 바람에 저축을 늘리기로 했어요.",
        note: "Nguyên nhân khách quan gây áp lực nên dùng '-는 바람에'."
      },
      {
        vi: "Nếu cứ ghi chép sổ chi tiêu đều đặn thì có thể giảm được mua sắm bốc đồng.",
        hint: "꾸준히 가계부를 쓰다, 충동구매를 줄일 수 있다",
        answerKo: "꾸준히 가계부를 쓰다 보면 충동구매를 줄일 수 있어요.",
        note: "Dùng '-다 보면' diễn tả kết quả đạt được sau quá trình duy trì thói quen."
      }
    ],
    skills: {
      listening: {
        dictation: {
          title: "Bài 1: Nghe bản tin kinh tế tiêu dùng và điền cụm từ còn thiếu",
          audioScript: "최근 물가가 급격히 오르는 바람에 합리적인 소비를 하려는 사람들이 늘고 있습니다. 특히 할인 쿠폰을 활용하거나 가계부를 쓰는 습관이 인기를 끌고 있습니다.",
          segments: [
            "최근 ",
            { blank: "물가가 급격히 오르는 바람에", hint: "Vì vật giá tăng đột ngột" },
            " 합리적인 소비를 하려는 사람들이 늘고 있습니다. 특히 할인 쿠폰을 활용하거나 ",
            { blank: "가계부를 쓰는", hint: "Viết sổ chi tiêu" },
            " 습관이 인기를 끌고 있습니다."
          ]
        },
        comprehension: {
          title: "Bài 2: Nghe hội thoại và chọn đáp án đúng",
          audioScript: "여자: 준수 씨, 요즘 왜 그렇게 아껴 써요? 남자: 지난주에 스마트폰이 고장 나는 바람에 예상치 못하게 큰돈을 썼거든요. 그래서 이번 달에는 외식을 줄이고 가계부를 쓰면서 지출을 관리하고 있어요.",
          question: "Tại sao bạn nam (준수) lại tiết kiệm chi tiêu trong tháng này?",
          options: [
            "A. Vì muốn mua ô tô mới (새 차를 사고 싶어서)",
            "B. Vì điện thoại hỏng nên đã tiêu một khoản tiền lớn ngoài dự tính (스마트폰이 고장 나는 바람에 큰돈을 써서)",
            "C. Vì sắp đi du học (유학을 갈 예정이라서)",
            "D. Vì bị mất ví tiền (지갑을 잃어버려서)"
          ],
          correctIndex: 1,
          explanation: "Bạn nam giải thích: '지난주에 스마트폰이 고장 나는 바람에 예상치 못하게 큰돈을 썼거든요.'"
        }
      },
      speaking: {
        shadowing: [
          {
            ko: "불필요한 충동구매를 줄이다 보면 자연스럽게 저축이 늘어나게 됩니다.",
            vi: "Nếu cứ giảm bớt việc mua sắm bốc đồng không cần thiết thì tiền tiết kiệm sẽ tự nhiên tăng lên.",
            tip: "Nhấn vào từ nối '-다 보면' và ngắt nhịp nhẹ trước '자연스럽게'."
          }
        ],
        aiPrompt: {
          structure: "[Sự việc]-는 바람에 [Hậu quả] / [Thói quen]-다 보면 [Kết quả].",
          meaning: "Luyện tập cấu trúc trung cấp Quyển 4 về thói quen tiêu dùng.",
          sampleAnswer: "세일을 많이 하는 바람에 옷을 너무 많이 샀어요. 앞으로 가계부를 쓰다 보면 돈을 아낄 수 있을 거예요.",
          aiOpeningKo: "요즘 소비 습관은 어때요? '-는 바람에' 또는 '-다 보면'을 활용해서 쇼핑 경험을 이야기해 보세요!",
          aiOpeningVi: "Thói quen chi tiêu dạo này của bạn thế nào? Hãy thử dùng '-는 바람에' hoặc '-다 보면' để kể nhé!"
        }
      },
      reading: {
        title: "Đọc đoạn văn nghị luận ngắn và tích Đúng (O) hoặc Sai (X)",
        passage: "현대 사회에서는 신용카드와 간편 결제 시스템이 발달하면서 현금 없이도 쉽게 물건을 살 수 있게 되었다. 그러나 돈이 나가는 것을 직접 눈으로 확인하기 어렵기 때문에 자칫하면 과소비로 이어지기 쉽다. 따라서 소비를 하기 전에 그 물건이 정말 필요한지 다시 한번 생각해 보는 습관이 필요하다.",
        statements: [
          {
            text: "간편 결제 시스템의 발달은 과소비를 완전히 막아 주었다. (Sự phát triển của thanh toán tiện lợi đã ngăn chặn hoàn toàn tiêu dùng quá mức.)",
            isTrue: false,
            proof: "Đoạn văn nêu ngược lại: dễ dẫn đến tiêu dùng quá mức ('과소비로 이어지기 쉽다')."
          },
          {
            text: "물건을 사기 전에 꼭 필요한 물건인지 생각해 보는 것이 좋다. (Trước khi mua đồ nên suy nghĩ xem món đồ đó có thực sự cần thiết không.)",
            isTrue: true,
            proof: "Câu cuối khẳng định: '그 물건이 정말 필요한지 다시 한번 생각해 보는 습관이 필요하다.'"
          }
        ]
      },
      writing: {
        topicTitle: "Đề luyện viết (Quyển 4 - TOPIK 쓰기): Viết đoạn văn (200~250 chữ) bàn về phương pháp tiêu dùng hợp lý",
        requiredStructures: ["비록 ~(으)ㄹ지라도 ~ (아/어)도", "~뿐만 아니라 ~도", "그러므로"],
        sampleEssay: "합리적인 소비를 위해서는 먼저 수입과 지출을 정확히 파악해야 한다. 비록 가계부를 매일 쓰는 것이 귀찮을지라도 꾸준히 기록하다 보면 불필요한 지출을 줄일 수 있다. 또한 물건을 구매하기 전에 필요한 것인지 고민하는 태도도 중요하다. 그러므로 계획적인 소비 습관을 기르는 것이 바람직하다."
      }
    }
  }
];

/* KIẾN THỨC CỐ ĐỊNH CHO KỸ NĂNG VIẾT (GIẤY Ô VUÔNG + HÔ ỨNG + VĂN VIẾT) */
const WRITING_HANDBOOK = {
  wongojiRules: [
    {
      title: "1. Quy tắc lùi đầu dòng (들여쓰기)",
      content: "Khi bắt đầu bài viết hoặc xuống dòng sang đoạn văn mới, BẮT BUỘC bỏ trống ô đầu tiên (1 ô vuông) rồi mới viết từ ô thứ 2.",
      important: true
    },
    {
      title: "2. Quy tắc dấu cách (띄어쓰기)",
      content: "Mỗi dấu cách chiếm đúng 1 ô vuông. LƯU Ý QUAN TRỌNG: Nếu dấu cách rơi đúng vào ô đầu tiên của dòng mới thì KHÔNG bỏ trống ô đó mà viết chữ ngay từ ô đầu tiên!",
      important: true
    },
    {
      title: "3. Dấu chấm (.) và Dấu phẩy (,)",
      content: "Viết vào góc dưới bên trái của 1 ô vuông riêng. Sau dấu chấm/phẩy KHÔNG bỏ trống thêm ô cách nào (trừ khi kết thúc đoạn văn).",
      important: true
    },
    {
      title: "4. Dấu chấm hỏi (?) và Dấu chấm than (!)",
      content: "Viết ở chính giữa 1 ô vuông riêng, và BẮT BUỘC bỏ trống 1 ô bên cạnh trước khi viết tiếp. Không đặt dấu câu ở ô đầu tiên của dòng mới (nếu hết dòng thì viết chung vào ô cuối cùng với chữ trước đó).",
      important: true
    },
    {
      title: "5. Cách viết số và chữ cái Latin",
      content: "Số có 1 chữ số viết 1 ô. Số có 2 chữ số (ví dụ: 20, 15) hoặc chữ cái tiếng Anh viết ghép 2 ký tự vào chung 1 ô vuông.",
      important: true
    }
  ],
  correlativeStructures: [
    {
      pattern: "비록 ~(으)ㄹ지라도 ~ (아/어)도",
      meaning: "Dù cho... đi chăng nữa thì vẫn...",
      exampleKo: "비록 한국어 공부가 힘들지라도 포기하지 않을 것이다.",
      exampleVi: "Dù việc học tiếng Hàn có vất vả đi chăng nữa thì tôi cũng sẽ không bỏ cuộc."
    },
    {
      pattern: "왜냐하면 ~기 때문이다",
      meaning: "Sở dĩ như vậy là bởi vì...",
      exampleKo: "나는 아침을 꼭 먹는다. 왜냐하면 건강에 좋기 때문이다.",
      exampleVi: "Tôi nhất định ăn sáng. Bởi vì điều đó tốt cho sức khỏe."
    },
    {
      pattern: "~뿐만 아니라 ~도",
      meaning: "Không chỉ... mà còn...",
      exampleKo: "그는 노래를 잘할 뿐만 아니라 춤도 잘 춘다.",
      exampleVi: "Anh ấy không chỉ hát hay mà còn nhảy đẹp."
    },
    {
      pattern: "~는 반면에",
      meaning: "Trong khi... / Trái lại thì...",
      exampleKo: "형은 성격이 활발한 반면에 동생은 조용하다.",
      exampleVi: "Anh trai tính cách hoạt bát trong khi em trai lại trầm tính."
    }
  ],
  writtenVsSpoken: [
    { spoken: "저는 / 나는 (Tôi)", written: "나는 (Luôn dùng '나', KHÔNG dùng '저' trong văn nghị luận/miêu tả chung)" },
    { spoken: "우리 나라 (Đất nước chúng ta)", written: "우리나라 (Viết liền không cách)" },
    { spoken: "-아요 / -어요 / -습니다 (Đuôi câu nói)", written: "-는다 / -ㄴ다 (Động từ), -다 (Tính từ), -이다 (Danh từ)" },
    { spoken: "그래서 (Vì vậy - văn nói)", written: "따라서 / 그러므로 (Do đó, vì thế)" },
    { spoken: "그런데 / 하지만 (Nhưng)", written: "그러나 / 반면에 (Tuy nhiên / Ngược lại)" },
    { spoken: "진짜 / 너무 (Rất, quá - khẩu ngữ)", written: "매우 / 대단히 / 몹시 (Rất, vô cùng - trang trọng)" }
  ]
};
