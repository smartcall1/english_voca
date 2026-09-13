// 10편의 4컷 이야기를 각각 5일 동안 읽고, 듣고, 다시 말하며 복습합니다.
// 그림에는 글자를 넣지 않아 대사를 크게 표시하고 음성으로 들을 수 있습니다.
// Day 1부터 Day 50까지 매일매일 새로운 소제목과 4컷 대사, 이야기 요약이 제공됩니다.
window.COMICS = [
  {
    "id": 1,
    "title": "새 교실, 새 친구",
    "range": [
      1,
      5
    ],
    "image": "assets/comic-01.png",
    "panels": [
      {
        "en": "Hello! Welcome to our classroom.",
        "ko": "안녕(hello)! 우리 교실에 온 걸 환영해(welcome).",
        "alt": "교실 문에서 Luca가 새로 온 Aiden을 반갑게 맞이한다."
      },
      {
        "en": "Please help me! I dropped my bag.",
        "ko": "도와줘(please)! 가방을 떨어뜨렸어.",
        "alt": "Aiden의 가방에서 물건이 쏟아져 당황한다."
      },
      {
        "en": "My name is Luca. Here is your book, friend!",
        "ko": "내 이름(name)은 Luca야. 여기 책이야, 친구(friend)야!",
        "alt": "Luca가 책을 건네며 다정하게 돕는다."
      },
      {
        "en": "Thanks! We are good friends now.",
        "ko": "고마워(thanks)! 우리는 이제 좋은 친구(friend)야.",
        "alt": "두 친구가 책상에 앉아 웃으며 그림을 그린다."
      }
    ],
    "daily": {
      "1": {
        "title": "새 교실, 반가운 첫 인사",
        "story": "교실 문이 열리고 Aiden과 Luca가 처음 만나 반갑게 인사를 나눠요.",
        "panels": [
          {
            "en": "Hello! Welcome to our classroom.",
            "ko": "안녕(hello)! 우리 교실에 온 걸 환영해(welcome).",
            "alt": "교실 문에서 Luca가 새로 온 Aiden을 반갑게 맞이한다."
          },
          {
            "en": "Please help me! I dropped my bag.",
            "ko": "도와줘(please)! 가방을 떨어뜨렸어.",
            "alt": "Aiden의 가방에서 물건이 쏟아져 당황한다."
          },
          {
            "en": "My name is Luca. Here is your book, friend!",
            "ko": "내 이름(name)은 Luca야. 여기 책이야, 친구(friend)야!",
            "alt": "Luca가 책을 건네며 다정하게 돕는다."
          },
          {
            "en": "Thanks! We are good friends now.",
            "ko": "고마워(thanks)! 우리는 이제 좋은 친구(friend)야.",
            "alt": "두 친구가 책상에 앉아 웃으며 그림을 그린다."
          }
        ],
        "image": "assets/comic-01.png"
      },
      "2": {
        "title": "너와 나, 우리의 책상",
        "story": "Luca와 Aiden이 서로의 자리를 안내하며 우리 물건들을 챙겨요.",
        "panels": [
          {
            "en": "You can sit here. I am happy to meet you!",
            "ko": "너(you)는 여기 앉아. 나(I)는 너를 만나서 기뻐!",
            "alt": "Luca가 Aiden에게 의자를 가리키며 웃는다."
          },
          {
            "en": "Look! My pencils fell. Can you help me?",
            "ko": "봐! 내(my) 연필들이 떨어졌어. 나(me)를 도와줄래?",
            "alt": "바닥에 떨어진 연필을 가리킨다."
          },
          {
            "en": "He helps us, and our koala helps too!",
            "ko": "그(he)가 우리(us)를 돕고, 우리(our) 코알라도 도와!",
            "alt": "Aiden과 Luca가 바닥에서 함께 물건을 줍는다."
          },
          {
            "en": "We are together. They look so happy!",
            "ko": "우리(we)는 함께 있어. 그들(they)도 무척 행복해 보여!",
            "alt": "둘이 나란히 앉아 함께 그림을 완성한다."
          }
        ],
        "image": "assets/comic-02.png"
      },
      "3": {
        "title": "가방 속 교실 보물들",
        "story": "새 학용품들을 꺼내며 책과 연필, 크레용을 책상 위에 정리해요.",
        "panels": [
          {
            "en": "Welcome to our school and classroom!",
            "ko": "우리 학교(school)와 교실(classroom)에 온 걸 환영해!",
            "alt": "교실 문을 열고 활짝 웃으며 들어온다."
          },
          {
            "en": "Oh no! My bag dropped a pencil and a ruler.",
            "ko": "이런! 가방(bag)에서 연필(pencil)과 자(ruler)가 쏟아졌어.",
            "alt": "가방에서 학용품들이 쏟아진다."
          },
          {
            "en": "Here is your book and red rubber.",
            "ko": "여기 너의 책(book)과 빨간 지우개(rubber)가 있어.",
            "alt": "Luca가 지우개와 책을 정성껏 주워 준다."
          },
          {
            "en": "Sit on the chair at the desk, and draw on paper!",
            "ko": "책상(desk) 앞 의자(chair)에 앉아서 종이(paper)에 그리자!",
            "alt": "책상에 앉아 종이에 함께 크레용으로 그림을 그린다."
          }
        ],
        "image": "assets/comic-03.png"
      },
      "4": {
        "title": "선생님 말씀에 귀 기울여요",
        "story": "선생님의 안내에 따라 책을 펴고 멋진 그림을 그려요.",
        "panels": [
          {
            "en": "Open the door, look inside, and come in!",
            "ko": "문을 열고(open), 안을 보고(look), 들어오렴!",
            "alt": "교실 문을 열고 안을 들여다본다."
          },
          {
            "en": "Listen to me and do not drop your bag.",
            "ko": "내 말을 듣고(listen), 가방을 떨어뜨리지 않게 조심해.",
            "alt": "바닥의 짐을 보고 조심스레 귀를 기울인다."
          },
          {
            "en": "Sit down on your chair and read this book.",
            "ko": "의자에 앉아서(sit), 이 책을 읽으렴(read).",
            "alt": "책을 펼쳐서 함께 보며 미소 짓는다."
          },
          {
            "en": "Draw a friendly koala and write your name!",
            "ko": "다정한 코알라를 그리고(draw), 네 이름을 쓰렴(write)!",
            "alt": "종이에 코알라를 그리며 이름을 쓴다."
          }
        ],
        "image": "assets/comic-04.png"
      },
      "5": {
        "title": "함께 나누는 즐거운 수업",
        "story": "짝꿍과 함께 순서를 지키며 크레용을 나누어 써요.",
        "panels": [
          {
            "en": "Let us start our morning lesson together!",
            "ko": "우리 함께(together) 아침 수업을 시작하자(start)!",
            "alt": "교실에서 반갑게 인사하며 수업을 시작한다."
          },
          {
            "en": "Please help me! Can I ask for your hand?",
            "ko": "도와줘(help)! 손길을 물어봐도(ask) 될까?",
            "alt": "바닥에 쏟아진 연필을 보며 도움을 요청한다."
          },
          {
            "en": "Wait here! It is your turn to try.",
            "ko": "기다려(wait)! 이제 네가 해 볼(try) 차례(turn)야.",
            "alt": "친절하게 차례를 지키며 물건을 건넨다."
          },
          {
            "en": "We are a great pair! We share and play together.",
            "ko": "우리는 멋진 짝꿍(pair)! 함께(together) 나누고(share) 놀자.",
            "alt": "둘이 나란히 앉아 다정하게 크레용을 나눈다."
          }
        ],
        "image": "assets/comic-05.png"
      }
    }
  },
  {
    "id": 2,
    "title": "그네를 함께 타요",
    "range": [
      6,
      10
    ],
    "image": "assets/comic-02.png",
    "panels": [
      {
        "en": "Look at the bright red and blue swings!",
        "ko": "저 밝은 빨간색(red)과 파란색(blue) 그네를 봐!",
        "alt": "놀이터에서 그네를 가리키며 기뻐한다."
      },
      {
        "en": "I see green grass and a yellow slide.",
        "ko": "초록색(green) 잔디와 노란색(yellow) 미끄럼틀이 보여.",
        "alt": "그네 옆에서 기다리며 주변을 둘러본다."
      },
      {
        "en": "You wear a purple hat and pink shoes!",
        "ko": "너는 보라색(purple) 모자와 분홍색(pink) 신발을 신었네!",
        "alt": "그네에서 내리며 친구의 옷차림을 본다."
      },
      {
        "en": "We love every pretty colour in our playground!",
        "ko": "우리는 놀이터의 모든 예쁜 색깔(colour)이 좋아!",
        "alt": "둘이 함께 활짝 웃으며 즐겁게 뛰어논다."
      }
    ],
    "daily": {
      "6": {
        "title": "무지개 빛깔 놀이터",
        "story": "알록달록 고운 색깔의 놀이기구와 그네를 발견해요.",
        "panels": [
          {
            "en": "Look at the bright red and blue swings!",
            "ko": "저 밝은 빨간색(red)과 파란색(blue) 그네를 봐!",
            "alt": "놀이터에서 그네를 가리키며 기뻐한다."
          },
          {
            "en": "I see green grass and a yellow slide.",
            "ko": "초록색(green) 잔디와 노란색(yellow) 미끄럼틀이 보여.",
            "alt": "그네 옆에서 기다리며 주변을 둘러본다."
          },
          {
            "en": "You wear a purple hat and pink shoes!",
            "ko": "너는 보라색(purple) 모자와 분홍색(pink) 신발을 신었네!",
            "alt": "그네에서 내리며 친구의 옷차림을 본다."
          },
          {
            "en": "We love every pretty colour in our playground!",
            "ko": "우리는 놀이터의 모든 예쁜 색깔(colour)이 좋아!",
            "alt": "둘이 함께 활짝 웃으며 즐겁게 뛰어논다."
          }
        ],
        "image": "assets/comic-06.png"
      },
      "7": {
        "title": "하나, 둘, 셋! 숫자 세기",
        "story": "그네를 타며 하나부터 열까지 숫자를 세어 보아요.",
        "panels": [
          {
            "en": "Can I swing for one and two minutes?",
            "ko": "나 1분(one), 2분(two) 동안 그네 타도 될까?",
            "alt": "놀이터에서 그네를 타며 부탁한다."
          },
          {
            "en": "Count three, four, and five while you wait.",
            "ko": "기다리는 동안 3(three), 4(four), 5(five)를 세어 봐.",
            "alt": "옆쪽 대기선에서 손가락을 꼽으며 기다린다."
          },
          {
            "en": "Now six, seven, eight! Your turn is ready.",
            "ko": "이제 6(six), 7(seven), 8(eight)! 네 차례야.",
            "alt": "그네에서 내려 자리를 양보한다."
          },
          {
            "en": "Nine and ten! We both had so much fun!",
            "ko": "9(nine)와 10(ten)! 우리 둘 다 정말 재미있었어!",
            "alt": "그네 옆에서 서로를 마주보며 기뻐한다."
          }
        ],
        "image": "assets/comic-07.png"
      },
      "8": {
        "title": "크고 둥근 공과 네모 미끄럼틀",
        "story": "동그란 그네 줄과 커다란 놀이터 기구들의 모양을 관찰해요.",
        "panels": [
          {
            "en": "This is a big swing with long ropes!",
            "ko": "이건 긴(long) 줄이 달린 큰(big) 그네야!",
            "alt": "그네를 잡고 흔들며 신나게 웃는다."
          },
          {
            "en": "I will stand in this small circle shape.",
            "ko": "나는 이 작은(small) 동그라미(circle) 모양(shape) 안에 서 있을게.",
            "alt": "바닥에 그려진 동그라미 대기선에 선다."
          },
          {
            "en": "Now hold the tall poles with your hands.",
            "ko": "이제 키 큰(tall) 기둥을 두 손으로 잡아 봐.",
            "alt": "그네를 잡아주며 안전하게 태워 준다."
          },
          {
            "en": "Look at the round balls. We love playground shapes!",
            "ko": "저 둥근(round) 공들을 봐. 놀이터 모양(shape)들은 참 멋져!",
            "alt": "놀이터의 다양한 놀이기구를 보며 즐거워한다."
          }
        ],
        "image": "assets/comic-08.png"
      },
      "9": {
        "title": "신나고 뿌듯한 우리 마음",
        "story": "기다릴 땐 차분하게, 그네를 탈 땐 신나고 자랑스러워요.",
        "panels": [
          {
            "en": "I am so excited to ride this swing!",
            "ko": "나 이 그네를 타게 되어 정말 신나(excited)!",
            "alt": "그네를 타며 눈을 반짝인다."
          },
          {
            "en": "Do not be worried. I will stay calm here.",
            "ko": "걱정하지(worried) 마. 나는 여기서 차분하게(calm) 있을게.",
            "alt": "차분한 표정으로 기다려 주는 친구."
          },
          {
            "en": "You are so kind to give me your turn!",
            "ko": "나에게 차례를 양보해 주다니 너 참 착하다(kind)!",
            "alt": "그네에서 내리며 고마운 눈빛을 보낸다."
          },
          {
            "en": "We feel happy and proud after sharing!",
            "ko": "서로 나누고 나니 정말 행복하고(happy) 뿌듯해(proud)!",
            "alt": "둘이 나란히 서서 흐뭇한 미소를 짓는다."
          }
        ],
        "image": "assets/comic-09.png"
      },
      "10": {
        "title": "신나는 놀이터 대모험",
        "story": "그네를 타고 미끄럼틀을 타며 놀이터를 힘차게 달려요.",
        "panels": [
          {
            "en": "Let's play together in this playground!",
            "ko": "이 놀이터(playground)에서 함께 놀자(play)!",
            "alt": "놀이터 그네 앞에 서서 손짓한다."
          },
          {
            "en": "I can run, jump, and skip around!",
            "ko": "나는 달리고(run), 뛰고(jump), 깡충깡충 뛸(skip) 수 있어!",
            "alt": "옆에서 기다리며 신나게 몸을 움직인다."
          },
          {
            "en": "Now you can swing high into the air!",
            "ko": "이제 네가 하늘 높이 그네(swing)를 탈 차례야!",
            "alt": "친구에게 그네를 양보하며 밀어줄 준비를 한다."
          },
          {
            "en": "Catch this ball! We love our playground.",
            "ko": "이 공(ball)을 잡아(catch)! 우리 놀이터(playground)가 최고야.",
            "alt": "함께 공놀이를 하며 환하게 웃는다."
          }
        ],
        "image": "assets/comic-10.png"
      }
    }
  },
  {
    "id": 3,
    "title": "식탁 차리기 대작전",
    "range": [
      11,
      15
    ],
    "image": "assets/comic-03.png",
    "panels": [
      {
        "en": "Let us help our family set the table.",
        "ko": "우리 가족(family)을 위해 식탁 차리는 걸 돕자.",
        "alt": "주방에서 접시를 들고 식탁으로 향한다."
      },
      {
        "en": "Mum and dad will love this nice meal.",
        "ko": "엄마(mum)와 아빠(dad)가 이 맛있는 식사를 좋아하실 거야.",
        "alt": "조심조심 숟가락과 포크를 내려놓는다."
      },
      {
        "en": "Here is a small cup for baby sister.",
        "ko": "여기 어린 여동생(sister)을 위한 작은 컵이 있어.",
        "alt": "작은 컵을 식탁 한쪽에 놓는다."
      },
      {
        "en": "Our parents will smile when they see this!",
        "ko": "우리 부모님(parent)이 이걸 보시면 활짝 웃으실 거야!",
        "alt": "완성된 식탁을 보며 뿌듯하게 웃는다."
      }
    ],
    "daily": {
      "11": {
        "title": "우리 가족과 맛있는 식탁",
        "story": "엄마, 아빠, 동생을 생각하며 식탁을 차려요.",
        "panels": [
          {
            "en": "Let us help our family set the table.",
            "ko": "우리 가족(family)을 위해 식탁 차리는 걸 돕자.",
            "alt": "주방에서 접시를 들고 식탁으로 향한다."
          },
          {
            "en": "Mum and dad will love this nice meal.",
            "ko": "엄마(mum)와 아빠(dad)가 이 맛있는 식사를 좋아하실 거야.",
            "alt": "조심조심 숟가락과 포크를 내려놓는다."
          },
          {
            "en": "Here is a small cup for baby sister.",
            "ko": "여기 어린 여동생(sister)을 위한 작은 컵이 있어.",
            "alt": "작은 컵을 식탁 한쪽에 놓는다."
          },
          {
            "en": "Our parents will smile when they see this!",
            "ko": "우리 부모님(parent)이 이걸 보시면 활짝 웃으실 거야!",
            "alt": "완성된 식탁을 보며 뿌듯하게 웃는다."
          }
        ],
        "image": "assets/comic-11.png"
      },
      "12": {
        "title": "우리 집 부엌과 식탁 방",
        "story": "집 안 부엌에서 바닥을 조심하며 식탁을 정돈해요.",
        "panels": [
          {
            "en": "Our home and house are warm today.",
            "ko": "오늘 우리 집(home, house)은 참 따뜻해.",
            "alt": "주방 문을 열고 식탁으로 걸어온다."
          },
          {
            "en": "Walk across the kitchen floor carefully.",
            "ko": "부엌(kitchen) 바닥(floor)을 조심조심 걸어가렴.",
            "alt": "쟁반을 들고 바닥을 보며 걷는다."
          },
          {
            "en": "Look out the window at the blue roof.",
            "ko": "창문(window) 밖 파란 지붕(roof)을 바라봐.",
            "alt": "창가 옆 식탁에 접시를 올린다."
          },
          {
            "en": "Open the door and call everyone to the table!",
            "ko": "문(door)을 열고 모두를 식탁으로 부르자!",
            "alt": "가족들을 부르며 손을 흔든다."
          }
        ],
        "image": "assets/comic-12.png"
      },
      "13": {
        "title": "깨끗하게 손 씻고 밥 먹어요",
        "story": "식사 전 손을 씻고 식탁 위의 수건을 정리해요.",
        "panels": [
          {
            "en": "Wash your hands with soap before eating!",
            "ko": "밥 먹기 전에 비누(soap)로 손을 깨끗이 씻어!",
            "alt": "깨끗한 손으로 접시를 나른다."
          },
          {
            "en": "Dry your hands with this soft towel.",
            "ko": "이 부드러운 수건(towel)으로 손을 닦으렴.",
            "alt": "수건을 건네며 식탁을 정돈한다."
          },
          {
            "en": "Put the toy on the shelf, not on the table.",
            "ko": "장난감(toy)은 식탁 말고 선반(shelf)에 두자.",
            "alt": "식탁 위의 작은 인형을 옆으로 옮긴다."
          },
          {
            "en": "Now our dining space is clean and ready!",
            "ko": "이제 우리 식사 자리가 깨끗하고 준비되었어!",
            "alt": "말끔해진 식탁 앞에 서서 미소 짓는다."
          }
        ],
        "image": "assets/comic-13.png"
      },
      "14": {
        "title": "두 손으로 조심조심 날라요",
        "story": "눈으로 살피고 두 손으로 그릇을 꼭 잡아요.",
        "panels": [
          {
            "en": "Use both hands to carry the bowl.",
            "ko": "두 손(hand)으로 그릇을 꼭 잡고 날라.",
            "alt": "두 손으로 조심스럽게 그릇을 받쳐 든다."
          },
          {
            "en": "Keep your eyes on the table and watch your feet.",
            "ko": "눈(eye)으로 식탁을 보고 발(foot)밑을 잘 살펴.",
            "alt": "발걸음을 살피며 조심스럽게 걷는다."
          },
          {
            "en": "Smile with your face and open your mouth!",
            "ko": "얼굴(face) 가득 웃고 입(mouth)을 벌려 맛있는 걸 먹자!",
            "alt": "접시를 식탁에 올려놓는다."
          },
          {
            "en": "Good arms and fingers make great helpers!",
            "ko": "튼튼한 팔(arm)과 손가락(finger) 덕분에 잘 도왔어!",
            "alt": "두 손을 털며 뿌듯하게 웃는다."
          }
        ],
        "image": "assets/comic-14.png"
      },
      "15": {
        "title": "단정한 옷 입고 식사 준비",
        "story": "소매를 걷고 앞치마를 두른 뒤 식탁을 차려요.",
        "panels": [
          {
            "en": "Wear a clean shirt and tidy shorts.",
            "ko": "깨끗한 셔츠(shirt)와 단정한 반바지(shorts)를 입어.",
            "alt": "옷을 정돈하고 식탁으로 다가온다."
          },
          {
            "en": "Do not spill soup on your school uniform!",
            "ko": "학교 교복(uniform)에 수프를 흘리지 않게 조심해.",
            "alt": "소매를 걷어올리며 그릇을 둔다."
          },
          {
            "en": "Take off your hat and wear your slippers.",
            "ko": "모자(hat)를 벗고 편한 신발(shoe)을 신으렴.",
            "alt": "신발을 편히 신고 의자를 당긴다."
          },
          {
            "en": "We are dressed up and ready for breakfast!",
            "ko": "옷을 잘 챙겨 입고 아침 식사 준비 끝!",
            "alt": "단정한 차림으로 식탁 앞에 앉는다."
          }
        ],
        "image": "assets/comic-15.png"
      }
    }
  },
  {
    "id": 4,
    "title": "잠자기 전 베개 요새",
    "range": [
      16,
      20
    ],
    "image": "assets/comic-04.png",
    "panels": [
      {
        "en": "Eat your breakfast with bread and toast.",
        "ko": "빵(bread)과 토스트(toast)로 아침(breakfast)을 먹자.",
        "alt": "방 안에서 따뜻한 간식을 챙겨 온다."
      },
      {
        "en": "Here is a boiled egg and a cup of milk.",
        "ko": "여기 삶은 달걀(egg)과 우유(milk) 한 컵(cup)이 있어.",
        "alt": "베개 요새 옆에 쟁반을 놓는다."
      },
      {
        "en": "Pour sweet cereal into the big bowl.",
        "ko": "달콤한 시리얼(cereal)을 큰 그릇(bowl)에 담으렴.",
        "alt": "그릇에 담긴 간식을 나눠 먹는다."
      },
      {
        "en": "Use your spoon and drink fresh water!",
        "ko": "숟가락(spoon)을 쓰고 시원한 물(water)도 마셔!",
        "alt": "요새 안에서 든든하게 먹고 웃는다."
      }
    ],
    "daily": {
      "16": {
        "title": "아침 식탁의 든든한 빵과 우유",
        "story": "맛있는 빵과 달걀, 우유를 먹으며 요새 놀이를 준비해요.",
        "panels": [
          {
            "en": "Eat your breakfast with bread and toast.",
            "ko": "빵(bread)과 토스트(toast)로 아침(breakfast)을 먹자.",
            "alt": "방 안에서 따뜻한 간식을 챙겨 온다."
          },
          {
            "en": "Here is a boiled egg and a cup of milk.",
            "ko": "여기 삶은 달걀(egg)과 우유(milk) 한 컵(cup)이 있어.",
            "alt": "베개 요새 옆에 쟁반을 놓는다."
          },
          {
            "en": "Pour sweet cereal into the big bowl.",
            "ko": "달콤한 시리얼(cereal)을 큰 그릇(bowl)에 담으렴.",
            "alt": "그릇에 담긴 간식을 나눠 먹는다."
          },
          {
            "en": "Use your spoon and drink fresh water!",
            "ko": "숟가락(spoon)을 쓰고 시원한 물(water)도 마셔!",
            "alt": "요새 안에서 든든하게 먹고 웃는다."
          }
        ],
        "image": "assets/comic-16.png"
      },
      "17": {
        "title": "맛있는 샌드위치 비밀 간식",
        "story": "베개 요새 안에서 먹을 특별한 저녁 샌드위치를 만들어요.",
        "panels": [
          {
            "en": "Let us make a sandwich for our lunchbox.",
            "ko": "도시락(lunchbox)에 넣을 샌드위치(sandwich)를 만들자.",
            "alt": "베개 요새로 간식을 나른다."
          },
          {
            "en": "Put cheese and chicken on the plate.",
            "ko": "접시(plate) 위에 치즈(cheese)와 닭고기(chicken)를 얹으렴.",
            "alt": "접시를 조심스럽게 건넨다."
          },
          {
            "en": "Be careful with the fork and knife.",
            "ko": "포크(fork)와 나이프(knife)를 쓸 때는 조심해.",
            "alt": "식기를 안전하게 정리한다."
          },
          {
            "en": "Our fortress dinner is delicious and warm!",
            "ko": "우리 요새의 저녁(dinner) 식사는 정말 맛있어!",
            "alt": "요새 안에서 함께 음식을 나누며 즐거워한다."
          }
        ],
        "image": "assets/comic-17.png"
      },
      "18": {
        "title": "달콤한 과일과 채소 바구니",
        "story": "사과와 바나나를 요새 보물로 숨겨 두고 나눠 먹어요.",
        "panels": [
          {
            "en": "Look at the red apple and sweet banana!",
            "ko": "빨간 사과(apple)와 달콤한 바나나(banana)를 봐!",
            "alt": "과일 바구니를 들고 요새 안으로 들어온다."
          },
          {
            "en": "We have sweet grapes and red strawberry.",
            "ko": "우리에게 달콤한 포도(grape)와 딸기(strawberry)가 있어.",
            "alt": "과일을 베개 위에 소복이 올려놓는다."
          },
          {
            "en": "Do you like crunchy carrot or potato?",
            "ko": "아삭한 당근(carrot)이나 감자(potato)도 좋아하니?",
            "alt": "친구에게 간식을 권한다."
          },
          {
            "en": "A juicy watermelon slice is our best treasure!",
            "ko": "달콤한 수박(watermelon) 한 조각이 우리의 최고 보물이야!",
            "alt": "과일을 함께 베어 물며 활짝 웃는다."
          }
        ],
        "image": "assets/comic-18.png"
      },
      "19": {
        "title": "잠들기 전 방 정리와 휴식",
        "story": "요새를 정리하고 씻은 뒤 편안하게 쉴 준비를 해요.",
        "panels": [
          {
            "en": "Wash your face and brush your teeth.",
            "ko": "얼굴을 씻고(wash) 이를 닦으렴(brush).",
            "alt": "방 안에서 잠잘 준비를 한다."
          },
          {
            "en": "Tidy up the room and clean the floor.",
            "ko": "방을 정돈하고(tidy) 바닥을 치우자(clean).",
            "alt": "베개와 이불을 차곡차곡 정리한다."
          },
          {
            "en": "Pack your bag before you go to sleep.",
            "ko": "잠자기(sleep) 전에 가방을 미리 챙겨(pack) 두렴.",
            "alt": "내일 가져갈 물건을 가방에 넣는다."
          },
          {
            "en": "Now we can rest and sleep in our cosy bed.",
            "ko": "이제 아늑한 침대에서 쉬고(rest) 잠들(sleep) 시간이야.",
            "alt": "폭신한 요새 안에서 편안하게 눕는다."
          }
        ],
        "image": "assets/comic-19.png"
      },
      "20": {
        "title": "베개 요새 안과 밖의 비밀",
        "story": "베개 밑, 담요 뒤에 숨은 코알라를 찾으며 공간을 익혀요.",
        "panels": [
          {
            "en": "Is our koala inside or outside the fort?",
            "ko": "우리 코알라가 요새 안(inside)에 있을까, 밖(outside)에 있을까?",
            "alt": "베개 요새 입구를 들여다본다."
          },
          {
            "en": "Look under the pillow and on the blanket!",
            "ko": "베개 아래(under)와 담요 위(on)를 살펴봐!",
            "alt": "베개를 들추며 보물을 찾는다."
          },
          {
            "en": "He is hiding behind the cushion, near me.",
            "ko": "방석 뒤(behind), 내 근처(near)에 숨어 있었네.",
            "alt": "쿠션 뒤에서 코알라 인형을 발견한다."
          },
          {
            "en": "We sit between the pillows and feel safe.",
            "ko": "우리는 베개들 사이(between)에 앉아 아늑함을 느껴.",
            "alt": "요새 속에서 서로 꼭 안고 웃는다."
          }
        ],
        "image": "assets/comic-20.png"
      }
    }
  },
  {
    "id": 5,
    "title": "달콤한 과일 가게",
    "range": [
      21,
      25
    ],
    "image": "assets/comic-05.png",
    "panels": [
      {
        "en": "Welcome to our busy town street and shop!",
        "ko": "활기찬 우리 마을(town) 거리(street)와 상점(shop)에 온 걸 환영해!",
        "alt": "가게 문을 열고 안으로 들어선다."
      },
      {
        "en": "We passed the library, bakery, and post office.",
        "ko": "도서관(library)과 빵집(bakery), 우체국(post office)을 지나왔어.",
        "alt": "가게 진열대 앞에서 장바구니를 든다."
      },
      {
        "en": "This market centre has everything we need.",
        "ko": "이 상점가 중심(centre)에는 필요한 게 다 있어.",
        "alt": "물건을 가리키며 가격표를 본다."
      },
      {
        "en": "Let's visit the park after shopping!",
        "ko": "장보고 나서 공원(park)에도 들르자!",
        "alt": "계산대 앞에서 활짝 웃는다."
      }
    ],
    "daily": {
      "21": {
        "title": "우리 마을 가게 골목 탐험",
        "story": "마을 거리의 상점과 빵집을 둘러보며 물건을 골라요.",
        "panels": [
          {
            "en": "Welcome to our busy town street and shop!",
            "ko": "활기찬 우리 마을(town) 거리(street)와 상점(shop)에 온 걸 환영해!",
            "alt": "가게 문을 열고 안으로 들어선다."
          },
          {
            "en": "We passed the library, bakery, and post office.",
            "ko": "도서관(library)과 빵집(bakery), 우체국(post office)을 지나왔어.",
            "alt": "가게 진열대 앞에서 장바구니를 든다."
          },
          {
            "en": "This market centre has everything we need.",
            "ko": "이 상점가 중심(centre)에는 필요한 게 다 있어.",
            "alt": "물건을 가리키며 가격표를 본다."
          },
          {
            "en": "Let's visit the park after shopping!",
            "ko": "장보고 나서 공원(park)에도 들르자!",
            "alt": "계산대 앞에서 활짝 웃는다."
          }
        ],
        "image": "assets/comic-21.png"
      },
      "22": {
        "title": "버스와 자전거 타고 시장으로",
        "story": "탈것을 타고 안전하게 상점에 도착해 장을 봐요.",
        "panels": [
          {
            "en": "We rode the green bus to the market.",
            "ko": "우리는 시장까지 초록 버스(bus)를 타고 왔어.",
            "alt": "가게 입구에 도착해 안을 본다."
          },
          {
            "en": "Show your ticket and watch the wheels roll.",
            "ko": "표(ticket)를 챙기고 바퀴(wheel)가 굴러가는 걸 봤지.",
            "alt": "장바구니를 챙기며 들어선다."
          },
          {
            "en": "Look at that cool bike and shiny scooter!",
            "ko": "저 멋진 자전거(bike)와 반짝이는 킥보드(scooter)를 봐!",
            "alt": "가게 안의 과일 상자를 살핀다."
          },
          {
            "en": "A safe ride makes our shopping fun!",
            "ko": "안전하게 타고(ride) 오니 장보기가 참 신나!",
            "alt": "원하는 과일을 골라 들고 웃는다."
          }
        ],
        "image": "assets/comic-22.png"
      },
      "23": {
        "title": "마을을 돕는 친절한 이웃들",
        "story": "빵을 굽는 제빵사와 채소를 가꾸는 농부 이웃에게 감사해요.",
        "panels": [
          {
            "en": "Our kind neighbour greeted us at the door.",
            "ko": "친절한 이웃(neighbour)이 문앞에서 인사해 주셨어.",
            "alt": "가게 점원에게 반갑게 인사한다."
          },
          {
            "en": "The baker baked fresh bread this morning.",
            "ko": "제빵사(baker) 아저씨가 오늘 아침 갓 구운 빵을 만드셨대.",
            "alt": "진열대의 바구니를 가리킨다."
          },
          {
            "en": "A friendly farmer grew these sweet apples.",
            "ko": "다정한 농부(farmer) 아저씨가 이 달콤한 사과를 키우셨어.",
            "alt": "사과를 골라 조심스레 담는다."
          },
          {
            "en": "Everyone in our community helps each other!",
            "ko": "우리 마을 사람들은 모두 서로를 도와줘!",
            "alt": "가게 주인과 눈을 맞추며 웃는다."
          }
        ],
        "image": "assets/comic-23.png"
      },
      "24": {
        "title": "장바구니에 담고 계산하기",
        "story": "신선한 음식을 고르고 동전으로 값을 치러요.",
        "panels": [
          {
            "en": "Check our shopping list and fill the basket.",
            "ko": "장보기 목록(list)을 확인하고 바구니(basket)를 채우자.",
            "alt": "목록을 보며 바구니에 담는다."
          },
          {
            "en": "We want to buy fresh food and ripe fruit.",
            "ko": "우리는 신선한(fresh) 음식(food)과 잘 익은 과일을 사고(buy) 싶어.",
            "alt": "과일의 신선함을 확인한다."
          },
          {
            "en": "What is the price? Count your coin and dollar.",
            "ko": "가격(price)이 얼마일까? 동전(coin)과 달러(dollar)를 세어 봐.",
            "alt": "지갑에서 동전을 꺼내 셈을 한다."
          },
          {
            "en": "Pay the money and take your change!",
            "ko": "돈(money)을 내고(pay), 거스름돈(change)을 챙기렴!",
            "alt": "거스름돈과 영수증을 챙기며 인사한다."
          }
        ],
        "image": "assets/comic-24.png"
      },
      "25": {
        "title": "건강하고 튼튼하게 장보기",
        "story": "감기에 걸리지 않게 비타민 과일을 골라 담아요.",
        "panels": [
          {
            "en": "Eat healthy food so your body stays well.",
            "ko": "몸(body)이 건강(well)하도록 좋은 음식을 먹자.",
            "alt": "가게 진열대에서 좋은 과일을 찾는다."
          },
          {
            "en": "Do not get sick with a cough or fever.",
            "ko": "기침(cough)이나 열(fever)로 아프지(sick) 않게 조심해.",
            "alt": "따뜻한 과일과 차를 살펴본다."
          },
          {
            "en": "This orange juice is good medicine for health!",
            "ko": "이 오렌지 주스는 건강에 아주 좋은 약(medicine)이야!",
            "alt": "음료를 바구니에 담는다."
          },
          {
            "en": "Now my knee and elbow feel strong and ready!",
            "ko": "이제 무릎(knee)과 팔꿈치(elbow)도 튼튼해진 기분이야!",
            "alt": "힘차게 걸으며 가게를 나선다."
          }
        ],
        "image": "assets/comic-25.png"
      }
    }
  },
  {
    "id": 6,
    "title": "시계탑 광장의 지도",
    "range": [
      26,
      30
    ],
    "image": "assets/comic-06.png",
    "panels": [
      {
        "en": "Be careful when you walk near the busy road!",
        "ko": "번화한 길(road) 근처를 걸을 때는 조심해야(careful) 해!",
        "alt": "광장 입구에서 좌우를 살핀다."
      },
      {
        "en": "Stay safe and use the pedestrian crossing.",
        "ko": "안전하게(safe) 횡단보도(crossing)를 이용하렴.",
        "alt": "신호등 불빛을 확인한다."
      },
      {
        "en": "Wait for an adult when there is danger.",
        "ko": "위험(danger)할 때는 어른(adult)과 함께 기다려.",
        "alt": "손을 잡고 신호를 기다린다."
      },
      {
        "en": "Wear sunscreen and stay in the cool shade!",
        "ko": "선크림(sunscreen)을 바르고 시원한 그늘(shade)에 서 있자!",
        "alt": "광장 벤치에서 지도를 펼친다."
      }
    ],
    "daily": {
      "26": {
        "title": "안전하게 건너는 시계탑 광장",
        "story": "신호등을 살피고 조심조심 광장 길을 건너요.",
        "panels": [
          {
            "en": "Be careful when you walk near the busy road!",
            "ko": "번화한 길(road) 근처를 걸을 때는 조심해야(careful) 해!",
            "alt": "광장 입구에서 좌우를 살핀다."
          },
          {
            "en": "Stay safe and use the pedestrian crossing.",
            "ko": "안전하게(safe) 횡단보도(crossing)를 이용하렴.",
            "alt": "신호등 불빛을 확인한다."
          },
          {
            "en": "Wait for an adult when there is danger.",
            "ko": "위험(danger)할 때는 어른(adult)과 함께 기다려.",
            "alt": "손을 잡고 신호를 기다린다."
          },
          {
            "en": "Wear sunscreen and stay in the cool shade!",
            "ko": "선크림(sunscreen)을 바르고 시원한 그늘(shade)에 서 있자!",
            "alt": "광장 벤치에서 지도를 펼친다."
          }
        ],
        "image": "assets/comic-26.png"
      },
      "27": {
        "title": "광장에서 펼치는 신나는 운동",
        "story": "광장 공터에서 축구공을 차며 팀워크를 다져요.",
        "panels": [
          {
            "en": "Our sport team is ready for a fun game!",
            "ko": "우리 스포츠(sport) 팀(team)이 신나는 경기(game) 준비를 마쳤어!",
            "alt": "광장 한가운데서 공을 찬다."
          },
          {
            "en": "Kick the ball hard and score a goal!",
            "ko": "공을 힘껏 차서(kick) 골(goal)을 넣어 점수(score)를 내자!",
            "alt": "공이 날아가는 곳을 바라본다."
          },
          {
            "en": "Run the race and practice every day.",
            "ko": "달리기 경주(race)를 하고 매일 연습(practice)하자.",
            "alt": "서로를 응원하며 달린다."
          },
          {
            "en": "We did our best! Both teams win today.",
            "ko": "최선을 다했어! 오늘 우리 모두가 승리자(win)야.",
            "alt": "하이파이브를 하며 함께 웃는다."
          }
        ],
        "image": "assets/comic-27.png"
      },
      "28": {
        "title": "광장에 울려 퍼지는 노래와 음악",
        "story": "시계탑 종소리에 맞추어 손뼉 치며 노래를 불러요.",
        "panels": [
          {
            "en": "Listen to the music and bell from the tower!",
            "ko": "시계탑에서 울리는 음악(music)과 종(bell)소리를 들어 봐!",
            "alt": "시계탑을 올려다보며 귀를 기울인다."
          },
          {
            "en": "Sing a happy song and clap your hands.",
            "ko": "즐거운 노래(song)를 부르고(sing) 손뼉을 쳐(clap) 보렴.",
            "alt": "박자에 맞추어 신나게 손뼉을 친다."
          },
          {
            "en": "Dance to the lively beat of the drum.",
            "ko": "북(drum)의 경쾌한 박자(beat)에 맞춰 춤을 춰(dance) 봐.",
            "alt": "리듬에 맞춰 깡충깡충 춤을 춘다."
          },
          {
            "en": "We can paint a bright picture of this day!",
            "ko": "오늘의 멋진 추억을 밝은 그림(picture)으로 그리자(paint)!",
            "alt": "스케치북에 광장 풍경을 그린다."
          }
        ],
        "image": "assets/comic-28.png"
      },
      "29": {
        "title": "시계탑 시계와 하루의 시간",
        "story": "시계탑의 큰 바늘을 보며 아침과 오후 시간을 확인해요.",
        "panels": [
          {
            "en": "What time does the town clock say today?",
            "ko": "오늘(today) 마을 시계(clock)가 몇 시(time)를 가리키고 있을까?",
            "alt": "시계탑의 시계를 올려다본다."
          },
          {
            "en": "It is afternoon now; evening will come soon.",
            "ko": "지금은 오후(afternoon)이고, 곧 저녁(evening)이 올 거야.",
            "alt": "지도를 보며 일정을 확인한다."
          },
          {
            "en": "We had fun yesterday, and more tomorrow!",
            "ko": "어제(yesterday)도 즐거웠고 내일(tomorrow)도 더 신날 거야!",
            "alt": "내일 갈 곳을 지도에 표시한다."
          },
          {
            "en": "A sunny day turns into a quiet night.",
            "ko": "햇살 가득한 낮(day)이 지나고 고요한 밤(night)이 와.",
            "alt": "붉게 물드는 노을을 바라본다."
          }
        ],
        "image": "assets/comic-29.png"
      },
      "30": {
        "title": "맑고 바람 부는 날씨 지도",
        "story": "맑은 날씨와 바람 부는 하늘을 보며 다음 탐험을 계획해요.",
        "panels": [
          {
            "en": "The weather is sunny and warm on Monday.",
            "ko": "월요일(Monday) 날씨(weather)는 맑고(sunny) 따뜻해.",
            "alt": "하늘을 올려다보며 날씨를 살핀다."
          },
          {
            "en": "It was rainy and cloudy on Friday.",
            "ko": "금요일(Friday)에는 비가 오고(rainy) 흐렸었지(cloudy).",
            "alt": "우산을 접고 지도를 펼친다."
          },
          {
            "en": "A windy breeze feels cool on the weekend.",
            "ko": "주말(weekend)에는 바람 부는(windy) 산들바람이 시원해.",
            "alt": "바람에 날리는 모자를 잡는다."
          },
          {
            "en": "Sunday is our favourite day for an adventure!",
            "ko": "일요일(Sunday)은 우리가 가장 좋아하는 모험의 날이야!",
            "alt": "새로운 탐험 지도를 가리키며 웃는다."
          }
        ],
        "image": "assets/comic-30.png"
      }
    }
  },
  {
    "id": 7,
    "title": "나비 정원의 비밀",
    "range": [
      31,
      35
    ],
    "image": "assets/comic-07.png",
    "panels": [
      {
        "en": "Spring brings warm rain and blooming flowers.",
        "ko": "봄(spring)은 따뜻한(warm) 비(rain)와 활짝 핀 꽃을 데려와.",
        "alt": "정원 입구에서 활짝 핀 꽃을 본다."
      },
      {
        "en": "Summer is hot, but autumn is cool and fresh.",
        "ko": "여름(summer)은 덥고(hot), 가을(autumn)은 시원해(cool).",
        "alt": "꽃길을 걸으며 나비를 찾는다."
      },
      {
        "en": "Winter is cold, but now a rainbow shines!",
        "ko": "겨울(winter)은 춥지만(cold), 지금은 무지개(rainbow)가 빛나!",
        "alt": "하늘에 뜬 고운 무지개를 가리킨다."
      },
      {
        "en": "Every season brings fresh beauty to our garden.",
        "ko": "모든 계절(season)마다 정원은 새롭게 아름다워져.",
        "alt": "정원 꽃밭 앞에서 활짝 웃는다."
      }
    ],
    "daily": {
      "31": {
        "title": "사계절이 피어나는 꽃 정원",
        "story": "따뜻한 봄바람과 무지개 아래 나비들을 만나요.",
        "panels": [
          {
            "en": "Spring brings warm rain and blooming flowers.",
            "ko": "봄(spring)은 따뜻한(warm) 비(rain)와 활짝 핀 꽃을 데려와.",
            "alt": "정원 입구에서 활짝 핀 꽃을 본다."
          },
          {
            "en": "Summer is hot, but autumn is cool and fresh.",
            "ko": "여름(summer)은 덥고(hot), 가을(autumn)은 시원해(cool).",
            "alt": "꽃길을 걸으며 나비를 찾는다."
          },
          {
            "en": "Winter is cold, but now a rainbow shines!",
            "ko": "겨울(winter)은 춥지만(cold), 지금은 무지개(rainbow)가 빛나!",
            "alt": "하늘에 뜬 고운 무지개를 가리킨다."
          },
          {
            "en": "Every season brings fresh beauty to our garden.",
            "ko": "모든 계절(season)마다 정원은 새롭게 아름다워져.",
            "alt": "정원 꽃밭 앞에서 활짝 웃는다."
          }
        ],
        "image": "assets/comic-31.png"
      },
      "32": {
        "title": "작은 씨앗에서 자란 커다란 나무",
        "story": "흙 속 뿌리와 줄기를 관찰하며 정원의 식물을 돌봐요.",
        "panels": [
          {
            "en": "Plant a tiny seed in the rich soil.",
            "ko": "기름진 흙(soil)에 작은 씨앗(seed)을 심으렴(plant).",
            "alt": "화분에 씨앗을 심고 물을 준다."
          },
          {
            "en": "Strong roots and a green stem will grow.",
            "ko": "튼튼한 뿌리(root)와 초록 줄기(stem)가 자라날(grow) 거야.",
            "alt": "줄기에서 싹이 트는 것을 관찰한다."
          },
          {
            "en": "Green leaves and colourful flowers cover the branch.",
            "ko": "초록 잎(leaf)과 고운 꽃(flower)이 가지(branch)를 덮어.",
            "alt": "무성해진 나뭇가지를 올려다본다."
          },
          {
            "en": "Our garden grass and trees look so healthy!",
            "ko": "우리 정원(garden)의 잔디(grass)와 나무(tree)들이 참 싱싱해!",
            "alt": "초록빛 가득한 정원을 보며 뿌듯해한다."
          }
        ],
        "image": "assets/comic-32.png"
      },
      "33": {
        "title": "호주 동물 캥거루와 코알라",
        "story": "나무 위 코알라와 풀밭의 캥거루 친구를 만나요.",
        "panels": [
          {
            "en": "Look! A friendly kangaroo is hopping near us.",
            "ko": "봐! 다정한 캥거루(kangaroo)가 우리 곁에서 뛰고 있어.",
            "alt": "풀밭을 뛰는 동물을 가리킨다."
          },
          {
            "en": "A sleepy koala hugs the tall tree branch.",
            "ko": "졸린 코알라(koala)가 높은 나뭇가지를 꼭 안고 있네.",
            "alt": "나무 위의 귀여운 코알라를 올려다본다."
          },
          {
            "en": "I see a cute wombat and a quick wallaby!",
            "ko": "귀여운 웜뱃(wombat)과 날쌘 왈라비(wallaby)도 보여!",
            "alt": "풀숲 사이를 지나가는 동물을 찾는다."
          },
          {
            "en": "Listen to the kookaburra laugh in the tree!",
            "ko": "나무에서 쿠카바라(kookaburra)가 웃는 소리를 들어 봐!",
            "alt": "새소리에 귀를 기울이며 미소 짓는다."
          }
        ],
        "image": "assets/comic-33.png"
      },
      "34": {
        "title": "다정한 동물 친구들의 합창",
        "story": "정원의 작은 새와 강아지, 꿀벌들의 소리를 들어요.",
        "panels": [
          {
            "en": "Our playful dog and gentle cat run together.",
            "ko": "장난꾸러기 개(dog)와 얌전한 고양이(cat)가 함께 뛰어.",
            "alt": "정원에서 뛰노는 동물들을 본다."
          },
          {
            "en": "A sweet bird sings, and a rabbit hops by.",
            "ko": "예쁜 새(bird)가 노래하고 토끼(rabbit)가 깡충 뛰어와.",
            "alt": "새에게 모이를 건네며 관찰한다."
          },
          {
            "en": "Busy bees visit the flowers, and ants march.",
            "ko": "바쁜 꿀벌(bee)이 꽃을 찾고 개미(ant)들이 줄지어 가.",
            "alt": "꽃 위의 작은 곤충을 들여다본다."
          },
          {
            "en": "Ducks swim in the pond like colourful fish.",
            "ko": "오리(duck)들이 연못에서 물고기(fish)처럼 헤엄쳐!",
            "alt": "연못가에서 손을 흔들며 웃는다."
          }
        ],
        "image": "assets/comic-34.png"
      },
      "35": {
        "title": "푸른 바다의 고래와 돌고래",
        "story": "정원 너머 바다에서 헤엄치는 바다 친구들을 상상해요.",
        "panels": [
          {
            "en": "A huge whale and a playful dolphin jump high!",
            "ko": "거대한 고래(whale)와 장난꾸러기 돌고래(dolphin)가 높이 뛰어!",
            "alt": "수평선 너머 바다를 바라본다."
          },
          {
            "en": "Look at the gentle turtle and red crab.",
            "ko": "온순한 바다거북(turtle)과 빨간 게(crab)를 보렴.",
            "alt": "모래사장의 바다 생물을 가리킨다."
          },
          {
            "en": "An octopus swims with tentacles and fins.",
            "ko": "문어(octopus)가 지느러미(fin)와 다리로 헤엄쳐 가.",
            "alt": "물속을 들여다보는 시늉을 한다."
          },
          {
            "en": "Collect pretty shells and watch penguin tails!",
            "ko": "예쁜 조개껍데기(shell)를 줍고 펭귄(penguin) 꼬리(tail)를 봐!",
            "alt": "소라 껍데기를 귀에 대며 웃는다."
          }
        ],
        "image": "assets/comic-35.png"
      }
    }
  },
  {
    "id": 8,
    "title": "반딧불이 숲의 모닥불",
    "range": [
      36,
      40
    ],
    "image": "assets/comic-08.png",
    "panels": [
      {
        "en": "We walked past the quiet river and clear lake.",
        "ko": "우리는 고요한 강(river)과 맑은 호수(lake)를 지나왔어.",
        "alt": "캠프장에 도착해 짐을 푼다."
      },
      {
        "en": "Cross the rocky mountain and climb the green hill.",
        "ko": "바위산(mountain)을 건너고 초록 언덕(hill)을 올랐지.",
        "alt": "언덕 너머 풍경을 가리킨다."
      },
      {
        "en": "Set up our campsite deep in this forest!",
        "ko": "이 깊은 숲(forest)속에 우리 캠프장을 차리자!",
        "alt": "텐트를 치고 나뭇가지를 모은다."
      },
      {
        "en": "The sandy beach and island are far behind us.",
        "ko": "모래사장(beach, sand)과 섬(island)은 저 멀리 뒤에 있어.",
        "alt": "모닥불 가에 둘러앉는다."
      }
    ],
    "daily": {
      "36": {
        "title": "강과 호수를 지나 산과 숲으로",
        "story": "강물을 건너고 언덕을 넘어 숲속 캠프장에 도착해요.",
        "panels": [
          {
            "en": "We walked past the quiet river and clear lake.",
            "ko": "우리는 고요한 강(river)과 맑은 호수(lake)를 지나왔어.",
            "alt": "캠프장에 도착해 짐을 푼다."
          },
          {
            "en": "Cross the rocky mountain and climb the green hill.",
            "ko": "바위산(mountain)을 건너고 초록 언덕(hill)을 올랐지.",
            "alt": "언덕 너머 풍경을 가리킨다."
          },
          {
            "en": "Set up our campsite deep in this forest!",
            "ko": "이 깊은 숲(forest)속에 우리 캠프장을 차리자!",
            "alt": "텐트를 치고 나뭇가지를 모은다."
          },
          {
            "en": "The sandy beach and island are far behind us.",
            "ko": "모래사장(beach, sand)과 섬(island)은 저 멀리 뒤에 있어.",
            "alt": "모닥불 가에 둘러앉는다."
          }
        ],
        "image": "assets/comic-36.png"
      },
      "37": {
        "title": "작은 과학자의 눈으로 관찰해요",
        "story": "눈으로 보고, 귀로 듣고, 자연의 냄새를 맡아요.",
        "panels": [
          {
            "en": "I can see the bright sparks and hear the fire.",
            "ko": "밝은 불꽃을 보고(see), 타오르는 소리를 들어(hear).",
            "alt": "모닥불을 따뜻하게 바라본다."
          },
          {
            "en": "Smell the sweet pine wood in the night air.",
            "ko": "밤공기 속 솔향기를 맡아(smell) 보렴.",
            "alt": "숨을 깊이 들이쉬며 미소 짓는다."
          },
          {
            "en": "Notice the shadows and watch the embers glow.",
            "ko": "그림자를 알아채고(notice), 불씨를 지켜봐(watch).",
            "alt": "손을 쬐며 불꽃의 색을 살핀다."
          },
          {
            "en": "Count the shooting stars and compare their lights!",
            "ko": "별똥별을 세어(count) 보고, 그 빛을 비교해(compare) 봐!",
            "alt": "밤하늘을 가리키며 감탄한다."
          }
        ],
        "image": "assets/comic-37.png"
      },
      "38": {
        "title": "따뜻한 나무와 단단한 돌멩이",
        "story": "마른 나뭇가지와 차가운 쇠주전자의 느낌을 비교해요.",
        "panels": [
          {
            "en": "Dry wood burns warm and feels rough.",
            "ko": "마른(dry) 나무(wood)는 따뜻하게 타고 거칠거칠해(rough).",
            "alt": "장작을 모닥불에 넣는다."
          },
          {
            "en": "This metal kettle is hard, and water is wet.",
            "ko": "이 금속(metal) 주전자는 단단하고(hard), 물은 젖어(wet) 있어.",
            "alt": "따뜻한 찻주전자를 만진다."
          },
          {
            "en": "Sit on the soft blanket, away from heavy stones.",
            "ko": "무거운(heavy) 돌 대신 부드러운(soft) 담요 위에 앉으렴.",
            "alt": "담요를 무릎에 덮는다."
          },
          {
            "en": "Smooth pebbles keep the campfire safely in place.",
            "ko": "매끄러운(smooth) 자갈들이 모닥불을 안전하게 지켜 줘.",
            "alt": "모닥불 주변을 돌로 둘러싼다."
          }
        ],
        "image": "assets/comic-38.png"
      },
      "39": {
        "title": "밤하늘의 달과 반짝이는 별들",
        "story": "어두운 밤하늘 속 빛나는 달과 우주를 관찰해요.",
        "panels": [
          {
            "en": "The bright moon and stars light up the sky.",
            "ko": "밝은 달(moon)과 별(star)들이 하늘(sky)을 비춰.",
            "alt": "밤하늘의 달과 별을 올려다본다."
          },
          {
            "en": "Our Earth spins in wide and silent space.",
            "ko": "우리 지구(Earth)는 넓고 고요한 우주(space)에서 돌고 있어.",
            "alt": "별자리를 손으로 그려 본다."
          },
          {
            "en": "Look at the dark night and your dancing shadow.",
            "ko": "어두운(dark) 밤과 춤추는 그림자(shadow)를 봐.",
            "alt": "모닥불 빛에 비친 그림자를 본다."
          },
          {
            "en": "The warm campfire light keeps us cozy and happy.",
            "ko": "따스한 모닥불 빛(light)이 우리를 아늑하고 행복하게 해 줘.",
            "alt": "서로 기대어 밤하늘을 바라본다."
          }
        ],
        "image": "assets/comic-39.png"
      },
      "40": {
        "title": "자연을 아끼고 지키는 캠핑 약속",
        "story": "쓰레기를 줍고 모닥불을 완전히 꺼 숲을 지켜요.",
        "panels": [
          {
            "en": "Put all rubbish in the bin before we leave.",
            "ko": "떠나기 전에 모든 쓰레기(rubbish)를 통(bin)에 넣자.",
            "alt": "캠프장 주변 쓰레기를 줍는다."
          },
          {
            "en": "Recycle paper and reuse clean bottles.",
            "ko": "종이는 재활용하고(recycle) 병은 다시 써야(reuse) 해.",
            "alt": "분리수거 봉투를 정리한다."
          },
          {
            "en": "Protect nature and keep animal habitats safe.",
            "ko": "자연(nature)을 지키고(protect), 동물 보금자리(habitat)를 안전하게 해 주자.",
            "alt": "모닥불에 흙을 덮어 안전하게 끈다."
          },
          {
            "en": "We leave the forest clean, green, and healthy!",
            "ko": "우리는 숲을 깨끗하고 건강하게(healthy) 지켰어!",
            "alt": "깨끗해진 캠프장을 보며 활짝 웃는다."
          }
        ],
        "image": "assets/comic-40.png"
      }
    }
  },
  {
    "id": 9,
    "title": "별빛 관측소의 망원경",
    "range": [
      41,
      45
    ],
    "image": "assets/comic-09.png",
    "panels": [
      {
        "en": "I want to look through the big telescope!",
        "ko": "나는 큰 망원경을 들여다보고(look) 싶어(want)!",
        "alt": "망원경으로 다가가 눈을 댄다."
      },
      {
        "en": "Come here and take your turn to see stars.",
        "ko": "이리 와서(come) 별을 볼 차례를 가져(take) 보렴.",
        "alt": "친구에게 망원경 자리를 양보한다."
      },
      {
        "en": "I like the silver moon, and I love the night sky.",
        "ko": "나는 은빛 달이 좋고(like), 밤하늘을 정말 사랑해(love).",
        "alt": "망원경 너머로 빛나는 달을 본다."
      },
      {
        "en": "We have so many great dreams together tonight!",
        "ko": "오늘 밤 우리는 멋진 꿈들을 많이 가지게(have) 됐어!",
        "alt": "둘이 나란히 밤하늘을 보며 웃는다."
      }
    ],
    "daily": {
      "41": {
        "title": "내가 원하는 별빛 모험",
        "story": "망원경으로 별자리를 보며 가고 싶은 곳을 이야기해요.",
        "panels": [
          {
            "en": "I want to look through the big telescope!",
            "ko": "나는 큰 망원경을 들여다보고(look) 싶어(want)!",
            "alt": "망원경으로 다가가 눈을 댄다."
          },
          {
            "en": "Come here and take your turn to see stars.",
            "ko": "이리 와서(come) 별을 볼 차례를 가져(take) 보렴.",
            "alt": "친구에게 망원경 자리를 양보한다."
          },
          {
            "en": "I like the silver moon, and I love the night sky.",
            "ko": "나는 은빛 달이 좋고(like), 밤하늘을 정말 사랑해(love).",
            "alt": "망원경 너머로 빛나는 달을 본다."
          },
          {
            "en": "We have so many great dreams together tonight!",
            "ko": "오늘 밤 우리는 멋진 꿈들을 많이 가지게(have) 됐어!",
            "alt": "둘이 나란히 밤하늘을 보며 웃는다."
          }
        ],
        "image": "assets/comic-41.png"
      },
      "42": {
        "title": "이 별자리와 저 별자리의 차이",
        "story": "이쪽 별과 저쪽 별을 비교하며 별지도를 읽어요.",
        "panels": [
          {
            "en": "Look at this bright star and that faint one.",
            "ko": "이(this) 밝은 별과 저(that) 희미한 별을 보렴.",
            "alt": "별지도를 펼치고 하늘을 가리킨다."
          },
          {
            "en": "These stars are blue, but those are red!",
            "ko": "이(these) 별들은 푸른빛인데, 저(those) 별들은 붉은빛이야!",
            "alt": "망원경의 렌즈를 조절한다."
          },
          {
            "en": "Are their colours the same or different?",
            "ko": "별들의 색깔이 같은가요(same), 다른가요(different)?",
            "alt": "별의 색깔을 비교하며 관찰한다."
          },
          {
            "en": "All the stars here shine with special light.",
            "ko": "여기(here) 있는 모든(all) 별들이 특별한 빛으로 반짝여.",
            "alt": "별빛 관측소에서 환하게 웃는다."
          }
        ],
        "image": "assets/comic-42.png"
      },
      "43": {
        "title": "궁금증을 푸는 별빛 질문",
        "story": "별은 왜 빛날까? 언제 뜰까? 서로 질문을 나눠요.",
        "panels": [
          {
            "en": "Who can see the North Star tonight?",
            "ko": "오늘 밤 누가(who) 북극성을 찾을 수 있을까?",
            "alt": "망원경 앞 책을 넘기며 묻는다."
          },
          {
            "en": "Where is the Milky Way, and what is inside it?",
            "ko": "은하수는 어디(where)에 있고 그 안엔 무엇(what)이 있을까?",
            "alt": "은하수가 흐르는 하늘을 올려다본다."
          },
          {
            "en": "Why do stars twinkle, and when do they appear?",
            "ko": "별은 왜(why) 반짝이고 언제(when) 나타날까?",
            "alt": "호기심 가득한 눈으로 질문한다."
          },
          {
            "en": "We can learn how the universe moves and shines!",
            "ko": "우리는 우주가 어떻게(how) 빛나는지 알 수 있어(can)!",
            "alt": "서로의 대답에 고개를 끄덕인다."
          }
        ],
        "image": "assets/comic-43.png"
      },
      "44": {
        "title": "하나로 이어지는 별빛 이야기",
        "story": "별과 별을 선으로 연결하여 별자리 이야기를 만들어요.",
        "panels": [
          {
            "en": "First, find the three stars in a row.",
            "ko": "먼저(first), 나란히 늘어선 세 별을 찾아보자.",
            "alt": "하늘에서 세 개의 별을 찾는다."
          },
          {
            "en": "Next, connect them, and draw a flying horse.",
            "ko": "그다음(next), 별들을 연결해서(and) 날개 달린 말을 그려 봐.",
            "alt": "별지도 위에 선을 잇는다."
          },
          {
            "en": "Then, add the glowing tail because it is magical.",
            "ko": "그런 다음(then), 마법 같으니까(because) 빛나는 꼬리를 더해.",
            "alt": "상상의 날개를 펴며 웃는다."
          },
          {
            "en": "Finally, our star story is complete and bright!",
            "ko": "마침내(finally), 우리의 별자리 이야기가 완성됐어!",
            "alt": "완성된 별지도를 번쩍 들어 올린다."
          }
        ],
        "image": "assets/comic-44.png"
      },
      "45": {
        "title": "우리가 만든 별빛 동화",
        "story": "별자리 속 주인공의 모험을 동화로 적어 보아요.",
        "panels": [
          {
            "en": "Let's write a story about our brave koala character!",
            "ko": "우리의 용감한 코알라 주인공(character) 이야기(story)를 쓰자!",
            "alt": "노트에 글을 쓰기 시작한다."
          },
          {
            "en": "The setting is high on this starry mountain.",
            "ko": "배경(setting)은 별빛 가득한 이 높은 산이야.",
            "alt": "관측소 창밖 밤하늘을 적는다."
          },
          {
            "en": "He solves a big problem with a clever solution.",
            "ko": "주인공은 지혜로운 해결책(solution)으로 큰 문제(problem)를 풀어.",
            "alt": "이야기를 나누며 흥미진진해한다."
          },
          {
            "en": "Turn the page! Our ending is happy and bright.",
            "ko": "쪽(page)을 넘겨 봐! 우리 결말(ending)은 행복하고 눈부셔.",
            "alt": "이야기책을 덮으며 뿌듯하게 웃는다."
          }
        ],
        "image": "assets/comic-45.png"
      }
    }
  },
  {
    "id": 10,
    "title": "우정의 타임캡슐",
    "range": [
      46,
      50
    ],
    "image": "assets/comic-10.png",
    "panels": [
      {
        "en": "Our 50-day adventure was full of magic!",
        "ko": "우리의 50일 모험(adventure)은 마법(magic)으로 가득했어!",
        "alt": "지도를 펼치고 타임캡슐 상자를 든다."
      },
      {
        "en": "Follow this treasure map to the secret spot.",
        "ko": "비밀 장소로 가는 이 보물(treasure) 지도(map)를 따라가자.",
        "alt": "숲속 길을 가리키며 걷는다."
      },
      {
        "en": "We are brave heroes on a wonderful journey.",
        "ko": "우리는 멋진 여정(journey) 위의 용감한(brave) 영웅(hero)들이야.",
        "alt": "서로를 격려하며 언덕을 오른다."
      },
      {
        "en": "Imagine what we will remember in the future!",
        "ko": "미래에 우리가 무엇을 기억할지 상상해(imagine) 봐!",
        "alt": "캡슐을 묻을 땅 앞에 선다."
      }
    ],
    "daily": {
      "46": {
        "title": "용감한 탐험가의 상상 모험",
        "story": "지도와 보물상자를 챙겨 타임캡슐 묻을 곳을 찾아요.",
        "panels": [
          {
            "en": "Our 50-day adventure was full of magic!",
            "ko": "우리의 50일 모험(adventure)은 마법(magic)으로 가득했어!",
            "alt": "지도를 펼치고 타임캡슐 상자를 든다."
          },
          {
            "en": "Follow this treasure map to the secret spot.",
            "ko": "비밀 장소로 가는 이 보물(treasure) 지도(map)를 따라가자.",
            "alt": "숲속 길을 가리키며 걷는다."
          },
          {
            "en": "We are brave heroes on a wonderful journey.",
            "ko": "우리는 멋진 여정(journey) 위의 용감한(brave) 영웅(hero)들이야.",
            "alt": "서로를 격려하며 언덕을 오른다."
          },
          {
            "en": "Imagine what we will remember in the future!",
            "ko": "미래에 우리가 무엇을 기억할지 상상해(imagine) 봐!",
            "alt": "캡슐을 묻을 땅 앞에 선다."
          }
        ],
        "image": "assets/comic-46.png"
      },
      "47": {
        "title": "힘을 모아 보물 묻기",
        "story": "밀고 당기며 함께 땅을 파고 캡슐을 안전하게 묻어요.",
        "panels": [
          {
            "en": "Help me carry and lift the heavy box.",
            "ko": "무거운 상자를 들고(lift) 나르는(carry) 걸 도와줘.",
            "alt": "둘이 상자를 함께 들고 온다."
          },
          {
            "en": "Push the soil aside and dig a deep hole.",
            "ko": "흙을 옆으로 밀어내고(push) 깊은 구덩이를 파자.",
            "alt": "작은 삽으로 흙을 파낸다."
          },
          {
            "en": "Drop our memories inside and build a marker.",
            "ko": "우리 추억을 안에 넣고(drop) 표지석을 세우자(build).",
            "alt": "상자를 조심스럽게 구덩이에 넣는다."
          },
          {
            "en": "Walk softly and find the secret place later!",
            "ko": "살살 걷고(walk), 나중에 이 비밀 장소를 다시 찾자(find)!",
            "alt": "흙을 잘 덮고 주변을 정리한다."
          }
        ],
        "image": "assets/comic-47.png"
      },
      "48": {
        "title": "가장 특별하고 소중한 우리 추억",
        "story": "가장 좋아하는 사진과 물건들을 캡슐에 담았어요.",
        "panels": [
          {
            "en": "This bright drawing is my favourite gift.",
            "ko": "이 밝은(bright) 그림이 내가 가장 좋아하는(favourite) 선물이야.",
            "alt": "함께 그린 그림을 보여준다."
          },
          {
            "en": "Learning English was not difficult; it was easy!",
            "ko": "영어 배우기는 어렵지(difficult) 않고 쉬웠어(easy)!",
            "alt": "단어 카드를 보며 웃는다."
          },
          {
            "en": "The box is full of our special friendship.",
            "ko": "상자는 우리의 특별한(special) 우정으로 가득 찼어(full).",
            "alt": "상자를 소중하게 어루만진다."
          },
          {
            "en": "Listen to the quiet wind and remember this day.",
            "ko": "조용한(quiet) 바람 소리를 듣고 오늘을 기억하자.",
            "alt": "바람을 맞으며 서로를 바라본다."
          }
        ],
        "image": "assets/comic-48.png"
      },
      "49": {
        "title": "생각하고 깨달으며 자라난 마음",
        "story": "실수해도 괜찮아! 50일 동안 생각하는 힘이 쑥쑥 컸어요.",
        "panels": [
          {
            "en": "We learn so much when we think and try.",
            "ko": "생각하고(think) 도전할 때 우리는 많이 배워(learn).",
            "alt": "지도를 보며 그동안의 여정을 돌아본다."
          },
          {
            "en": "Do not worry about a mistake; choose to try again!",
            "ko": "실수(mistake)를 두려워 마. 다시 도전하기를 선택해(choose)!",
            "alt": "어깨를 토닥이며 응원한다."
          },
          {
            "en": "I remember every happy day and good idea.",
            "ko": "나는 모든 행복한 날과 좋은 생각(idea)을 기억해(remember).",
            "alt": "환한 표정으로 고개를 끄덕인다."
          },
          {
            "en": "Now we understand how to help our friends!",
            "ko": "이제 우리는 친구를 돕는 방법을 잘 이해해(understand)!",
            "alt": "서로 손을 마주 잡는다."
          }
        ],
        "image": "assets/comic-49.png"
      },
      "50": {
        "title": "모험가의 위대한 축제와 약속",
        "story": "50일간의 모든 여정을 끝내고 영원한 우정의 미소를 나눠요.",
        "panels": [
          {
            "en": "Today we celebrate our 50 days of success!",
            "ko": "오늘 우리는 50일의 성공(success)을 축하해(celebrate)!",
            "alt": "50일 완주 지도를 펼쳐 든다."
          },
          {
            "en": "We finish our journey with great effort and patience.",
            "ko": "엄청난 노력(effort)과 끈기로 모험을 끝마쳤어(finish)!",
            "alt": "완주 배지를 가슴에 달아 준다."
          },
          {
            "en": "I thank you, and I promise to be your friend forever.",
            "ko": "너에게 고마워(thank), 영원히 좋은 친구가 될 것을 약속해(promise).",
            "alt": "새끼손가락을 걸고 우정을 약속한다."
          },
          {
            "en": "Give a big smile! We are true little explorers!",
            "ko": "활짝 미소(smile)를 지어 봐! 우리는 진짜 작은 탐험가야!",
            "alt": "손을 번쩍 들고 환호하며 대단원의 막을 내린다."
          }
        ],
        "image": "assets/comic-50.png"
      }
    }
  }
];
