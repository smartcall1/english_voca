/* 호주 Foundation–Year 2의 학습 방향을 참고해 자체 선정한 50일 어휘 과정.
 * 공식 필수 어휘 목록이 아니며, 선정 근거와 활용 방법은 curriculum-notes.md 참조.
 * 각 행: 영어 | 한국어 뜻 | 직접 작성한 영어 예문 | 예문 번역 | 선택적 유형.
 */
window.CURRICULUM = (() => {
  const blocks = [
`첫 만남과 인사
hello|안녕|Hello, my friend.|안녕, 내 친구야.
goodbye|잘 가|Goodbye, see you tomorrow.|잘 가, 내일 만나.
please|부탁할 때 쓰는 말|Help me, please.|나를 도와줘.
thanks|고마워|Thanks for the pencil.|연필을 줘서 고마워.
sorry|미안해|Sorry, I dropped your book.|미안해, 네 책을 떨어뜨렸어.
yes|응; 네|Yes, I can help.|응, 내가 도와줄 수 있어.
no|아니; 아니요|No, that is not mine.|아니, 그건 내 것이 아니야.
name|이름|My name is Sam.|내 이름은 샘이야.
friend|친구|This is my friend.|이 아이는 내 친구야.
teacher|선생님|Our teacher is kind.|우리 선생님은 친절해.
welcome|환영해|Welcome to our class!|우리 반에 온 걸 환영해!
good morning|좋은 아침이야|Good morning, everyone!|모두 좋은 아침이야!|phrase`,
`나와 너, 우리
I|나는|I like books.|나는 책을 좋아해.
you|너는; 너를|You can sit here.|너는 여기 앉아도 돼.
he|그는|He has a red hat.|그 아이는 빨간 모자를 갖고 있어.
she|그녀는|She likes to draw.|그 아이는 그림 그리기를 좋아해.
we|우리는|We play together.|우리는 함께 놀아.
they|그들은|They are my friends.|그 아이들은 내 친구들이야.
it|그것은|It is a little dog.|그건 작은 개야.
my|나의|This is my bag.|이것은 내 가방이야.
your|너의|Is this your hat?|이것은 네 모자니?
our|우리의|This is our classroom.|이곳은 우리 교실이야.
me|나를; 나에게|Come with me.|나와 함께 가자.
us|우리를; 우리에게|Please help us.|우리를 도와주세요.`,
`교실 보물 찾기
school|학교|I walk to school.|나는 학교에 걸어가.
classroom|교실|Our classroom is bright.|우리 교실은 밝아.
desk|책상|My book is on the desk.|내 책은 책상 위에 있어.
chair|의자|Sit on this chair.|이 의자에 앉아.
book|책|Open your book.|네 책을 펴.
pencil|연필|I write with a pencil.|나는 연필로 글씨를 써.
crayon|크레용|This crayon is blue.|이 크레용은 파란색이야.
paper|종이|Draw on the paper.|종이에 그림을 그려.
bag|가방|Put it in your bag.|그것을 네 가방에 넣어.
rubber|지우개|Use the rubber to fix it.|지우개로 그것을 고쳐.
ruler|자|The ruler is long.|그 자는 길어.
glue|풀|Use a little glue.|풀을 조금 써.`,
`선생님 말씀 듣기
listen|듣다|Listen to the story.|이야기를 들어.
look|보다|Look at the board.|칠판을 봐.
sit|앉다|Sit beside me.|내 옆에 앉아.
stand|서다|Stand on the mat.|매트 위에 서.
read|읽다|Read this word.|이 단어를 읽어.
write|쓰다|Write your name.|네 이름을 써.
draw|그리다|Draw a little cat.|작은 고양이를 그려.
say|말하다|Say hello to Ben.|벤에게 안녕이라고 말해.
show|보여 주다|Show me your picture.|네 그림을 보여 줘.
open|열다|Open the box.|상자를 열어.
close|닫다|Close the door gently.|문을 살살 닫아.
line up|줄을 서다|Line up at the door.|문 앞에 줄을 서.|phrase`,
`함께 하는 수업
ask|묻다|Ask the teacher.|선생님께 여쭤봐.
answer|대답하다|Answer the question.|질문에 대답해.
help|돕다|Can you help me?|나를 도와줄 수 있니?
try|해 보다|Try one more time.|한 번 더 해 봐.
start|시작하다|Start at the top.|맨 위에서 시작해.
stop|멈추다|Stop at the line.|선에서 멈춰.
wait|기다리다|Wait for your turn.|네 차례를 기다려.
share|나누다|Share the blocks.|블록을 나눠 써.
turn|차례|It is your turn.|네 차례야.
pair|한 쌍; 두 개의 짝|Two socks make a pair.|양말 두 짝이 한 쌍을 이뤄.
group|모둠|Join our group.|우리 모둠에 들어와.
together|함께|Let us read together.|우리 함께 읽자.`,
`색깔 마법사
colour|색깔|What colour is it?|이건 무슨 색이니?
red|빨간색|The apple is red.|그 사과는 빨간색이야.
blue|파란색|My bag is blue.|내 가방은 파란색이야.
yellow|노란색|The sun looks yellow.|해가 노랗게 보여.
green|초록색|The leaf is green.|그 잎은 초록색이야.
orange|주황색|My crayon is orange.|내 크레용은 주황색이야.
purple|보라색|She has a purple hat.|그 아이는 보라색 모자를 갖고 있어.
pink|분홍색|The flower is pink.|그 꽃은 분홍색이야.
brown|갈색|The dog is brown.|그 개는 갈색이야.
black|검은색|The cat is black.|그 고양이는 검은색이야.
white|흰색|The paper is white.|그 종이는 흰색이야.
grey|회색|The cloud is grey.|그 구름은 회색이야.`,
`숫자 열두 보물
one|하나|I have one pencil.|나는 연필 한 자루를 갖고 있어.
two|둘|There are two birds.|새 두 마리가 있어.
three|셋|I can see three cats.|고양이 세 마리가 보여.
four|넷|We need four chairs.|우리는 의자 네 개가 필요해.
five|다섯|Give me five blocks.|블록 다섯 개를 줘.
six|여섯|There are six eggs.|달걀 여섯 개가 있어.
seven|일곱|I am seven years old.|나는 일곱 살이야.
eight|여덟|Count eight shells.|조개껍데기 여덟 개를 세어 봐.
nine|아홉|We have nine cups.|우리에게 컵 아홉 개가 있어.
ten|열|I can count to ten.|나는 열까지 셀 수 있어.
eleven|열하나|There are eleven ducks.|오리 열한 마리가 있어.
twelve|열둘|We need twelve plates.|우리는 접시 열두 개가 필요해.`,
`모양과 크기
shape|모양|What shape is this?|이것은 무슨 모양이니?
circle|동그라미|Draw a circle.|동그라미를 그려.
square|정사각형|This tile is a square.|이 타일은 정사각형이야.
triangle|삼각형|A triangle has three sides.|삼각형에는 변이 세 개 있어.
rectangle|직사각형|The door is a rectangle.|그 문은 직사각형이야.
oval|타원|The egg looks like an oval.|그 달걀은 타원처럼 생겼어.
big|큰|That is a big box.|저것은 큰 상자야.
small|작은|This is a small cup.|이것은 작은 컵이야.
long|긴|The rope is long.|그 밧줄은 길어.
short|짧은|My pencil is short.|내 연필은 짧아.
tall|키가 큰; 높은|That tree is tall.|저 나무는 키가 커.
round|둥근|The ball is round.|그 공은 둥글어.`,
`내 마음 말하기
happy|행복한|I feel happy today.|나는 오늘 행복해.
sad|슬픈|He feels sad.|그 아이는 슬퍼해.
angry|화가 난|I feel angry, so I take a breath.|나는 화가 나서 숨을 한 번 쉬어.
scared|무서워하는|The puppy is scared.|그 강아지는 무서워해.
excited|신이 난|We are excited to play.|우리는 놀 생각에 신이 나.
tired|피곤한|I feel tired after school.|나는 학교가 끝나면 피곤해.
hungry|배고픈|I am hungry now.|나는 지금 배가 고파.
thirsty|목마른|I am thirsty after running.|나는 달린 뒤에 목이 말라.
calm|차분한|I feel calm here.|나는 여기에서 마음이 차분해.
worried|걱정하는|I am worried about my dog.|나는 내 개가 걱정돼.
proud|자랑스러워하는|I am proud of my picture.|나는 내 그림이 자랑스러워.
kind|친절한|Be kind to your friends.|친구들에게 친절하게 대해.`,
`놀이터 모험
play|놀다|Come and play with us.|와서 우리와 놀자.
run|달리다|Run to the tree.|나무까지 달려가.
jump|뛰어오르다|I can jump high.|나는 높이 뛰어오를 수 있어.
hop|한 발로 뛰다|Hop on one foot.|한 발로 뛰어 봐.
skip|깡충깡충 뛰다|We skip along the path.|우리는 길을 따라 깡충깡충 뛰어가.
climb|오르다|Climb the steps carefully.|계단을 조심해서 올라가.
slide|미끄럼틀|The slide is yellow.|그 미끄럼틀은 노란색이야.
swing|그네|I sit on the swing.|나는 그네에 앉아.
ball|공|Pass me the ball.|내게 공을 보내 줘.
catch|잡다|Catch the soft ball.|부드러운 공을 잡아.
throw|던지다|Throw the ball to me.|내게 공을 던져.
playground|놀이터|We meet at the playground.|우리는 놀이터에서 만나.`,
`우리 가족
family|가족|My family eats together.|우리 가족은 함께 밥을 먹어.
mum|엄마|Mum reads with me.|엄마는 나와 함께 책을 읽어.
dad|아빠|Dad makes breakfast.|아빠가 아침밥을 만들어.
sister|언니; 누나; 여동생|My sister is little.|내 여동생은 어려.
brother|형; 오빠; 남동생|My brother likes football.|내 남동생은 축구를 좋아해.
baby|아기|The baby is asleep.|아기가 잠들어 있어.
grandma|할머니|Grandma grows flowers.|할머니는 꽃을 기르셔.
grandpa|할아버지|Grandpa tells a story.|할아버지는 이야기를 들려주셔.
aunt|이모; 고모; 숙모|My aunt has a cat.|우리 이모는 고양이를 키워.
uncle|삼촌; 외삼촌; 이모부|My uncle lives nearby.|우리 삼촌은 가까이 사셔.
cousin|사촌|I play with my cousin.|나는 사촌과 놀아.
parent|부모|A parent is waiting outside.|부모님 한 분이 밖에서 기다리고 계셔.`,
`우리 집 둘러보기
home|집; 가정|I am going home.|나는 집에 가고 있어.
house|집; 주택|Our house has a garden.|우리 집에는 정원이 있어.
room|방|This room is warm.|이 방은 따뜻해.
kitchen|부엌|Mum is in the kitchen.|엄마는 부엌에 계셔.
bathroom|욕실|The bathroom is upstairs.|욕실은 위층에 있어.
bedroom|침실|My bedroom is small.|내 침실은 작아.
door|문|Please shut the door.|문을 닫아 줘.
window|창문|Look through the window.|창문으로 밖을 봐.
floor|바닥|The toy is on the floor.|장난감이 바닥에 있어.
wall|벽|There is a picture on the wall.|벽에 그림이 있어.
roof|지붕|A bird is on the roof.|새 한 마리가 지붕 위에 있어.
stairs|계단|Walk slowly on the stairs.|계단에서는 천천히 걸어.`,
`씻고 쉬는 시간
bed|침대|My teddy is on the bed.|내 곰 인형은 침대 위에 있어.
pillow|베개|This pillow is soft.|이 베개는 부드러워.
blanket|담요|I need a warm blanket.|나는 따뜻한 담요가 필요해.
lamp|등; 스탠드|Turn on the lamp.|등을 켜.
toy|장난감|Put your toy away.|장난감을 치워.
shelf|선반|The books are on the shelf.|책들은 선반 위에 있어.
soap|비누|Wash your hands with soap.|비누로 손을 씻어.
towel|수건|Use a clean towel.|깨끗한 수건을 써.
toothbrush|칫솔|My toothbrush is blue.|내 칫솔은 파란색이야.
toothpaste|치약|Put toothpaste on the brush.|칫솔에 치약을 묻혀.
shower|샤워|I have a shower at night.|나는 밤에 샤워를 해.
toilet|화장실; 변기|May I go to the toilet?|화장실에 가도 될까요?`,
`내 몸 알아보기
head|머리|Put your hands on your head.|손을 머리 위에 올려.
face|얼굴|Wash your face.|얼굴을 씻어.
eye|눈|Close one eye.|한쪽 눈을 감아.
ear|귀|Point to your ear.|네 귀를 가리켜.
nose|코|My nose is cold.|내 코가 차가워.
mouth|입|Open your mouth.|입을 벌려.
tooth|이; 치아|I have a wobbly tooth.|흔들리는 이가 하나 있어.
arm|팔|Raise one arm.|팔 하나를 들어.
hand|손|Hold my hand.|내 손을 잡아.
finger|손가락|Point with your finger.|손가락으로 가리켜.
leg|다리|Bend your leg.|다리를 굽혀.
foot|발|Stand on one foot.|한 발로 서.`,
`옷 입고 출발
shirt|셔츠|My shirt has a pocket.|내 셔츠에는 주머니가 있어.
shorts|반바지|I wear shorts in summer.|나는 여름에 반바지를 입어.
trousers|긴 바지|These trousers are warm.|이 긴 바지는 따뜻해.
dress|원피스|Her dress is green.|그 아이의 원피스는 초록색이야.
skirt|치마|This skirt has flowers on it.|이 치마에는 꽃무늬가 있어.
jumper|스웨터|Put on your jumper.|스웨터를 입어.
jacket|재킷; 겉옷|Take your jacket.|네 겉옷을 챙겨.
sock|양말 한 짝|I found one sock.|양말 한 짝을 찾았어.
shoe|신발 한 짝|My shoe is wet.|내 신발 한 짝이 젖었어.
hat|모자|Wear your hat outside.|밖에서는 모자를 써.
uniform|교복|My school uniform is blue.|우리 교복은 파란색이야.
pyjamas|잠옷|I put on my pyjamas.|나는 잠옷을 입어.`,
`아침 식탁
breakfast|아침 식사|Breakfast is ready.|아침밥이 준비됐어.
bread|빵|I have some bread.|나는 빵을 조금 먹어.
toast|토스트|The toast is warm.|토스트가 따뜻해.
egg|달걀|Dad cooks an egg.|아빠가 달걀을 요리해.
milk|우유|There is milk in my cup.|내 컵에는 우유가 있어.
water|물|Drink some water.|물을 좀 마셔.
cereal|시리얼|I have cereal for breakfast.|나는 아침으로 시리얼을 먹어.
yoghurt|요구르트|I like plain yoghurt.|나는 플레인 요구르트를 좋아해.
butter|버터|Spread butter on the toast.|토스트에 버터를 발라.
cup|컵|This is my cup.|이것은 내 컵이야.
bowl|그릇|Put the cereal in a bowl.|시리얼을 그릇에 담아.
spoon|숟가락|Eat with a spoon.|숟가락으로 먹어.`,
`도시락과 저녁
lunch|점심 식사|We eat lunch at school.|우리는 학교에서 점심을 먹어.
dinner|저녁 식사|Dinner is on the table.|저녁밥이 식탁 위에 있어.
lunchbox|도시락통|My lunchbox is in my bag.|내 도시락통은 가방 안에 있어.
sandwich|샌드위치|I have a cheese sandwich.|나는 치즈 샌드위치를 먹어.
rice|밥; 쌀|We eat rice for dinner.|우리는 저녁에 밥을 먹어.
pasta|파스타|The pasta is hot.|파스타가 뜨거워.
soup|수프|I like pumpkin soup.|나는 호박 수프를 좋아해.
cheese|치즈|Put cheese in the sandwich.|샌드위치에 치즈를 넣어.
chicken|닭; 닭고기|We have chicken for dinner.|우리는 저녁에 닭고기를 먹어.
plate|접시|Put it on your plate.|그것을 네 접시에 놓아.
fork|포크|Use your fork.|포크를 써.
knife|칼|This table knife is blunt.|이 식탁용 칼은 날이 무뎌.`,
`과일과 채소 가게
apple|사과|This apple is crunchy.|이 사과는 아삭아삭해.
banana|바나나|Peel the banana.|바나나 껍질을 벗겨.
pear|배|The pear is sweet.|그 배는 달아.
grape|포도 한 알|This grape is green.|이 포도알은 초록색이야.
strawberry|딸기|I picked a strawberry.|나는 딸기 한 개를 땄어.
watermelon|수박|We share a watermelon.|우리는 수박을 나눠 먹어.
carrot|당근|The rabbit eats a carrot.|토끼가 당근을 먹어.
potato|감자|This potato is muddy.|이 감자에는 흙이 묻어 있어.
tomato|토마토|Slice the tomato.|토마토를 썰어.
peas|완두콩|The peas are green.|완두콩은 초록색이야.
broccoli|브로콜리|I like broccoli with rice.|나는 밥과 브로콜리를 함께 먹는 것을 좋아해.
pumpkin|호박|We make pumpkin soup.|우리는 호박 수프를 만들어.`,
`하루를 보내는 동작
wake|잠에서 깨다|I wake up early.|나는 일찍 일어나.
sleep|자다|I sleep in my bed.|나는 내 침대에서 자.
wash|씻다|Wash your hands before lunch.|점심을 먹기 전에 손을 씻어.
brush|솔로 닦다|Brush your teeth.|이를 닦아.
wear|입다; 착용하다|I wear a hat outside.|나는 밖에서 모자를 써.
eat|먹다|We eat together.|우리는 함께 먹어.
drink|마시다|I drink water.|나는 물을 마셔.
cook|요리하다|We cook dinner together.|우리는 함께 저녁밥을 만들어.
clean|청소하다; 닦다|Clean the table.|식탁을 닦아.
tidy|정리하다|Tidy your room.|네 방을 정리해.
pack|짐을 싸다|Pack your school bag.|책가방을 챙겨.
rest|쉬다|Let us rest in the shade.|그늘에서 쉬자.`,
`어디에 숨었을까
in|안에|The toy is in the box.|장난감은 상자 안에 있어.
on|위에|The cup is on the table.|컵은 식탁 위에 있어.
under|아래에|The cat is under the chair.|고양이는 의자 아래에 있어.
over|너머로; 위로|The bird flies over the house.|새가 집 위로 날아가.
behind|뒤에|I am behind the tree.|나는 나무 뒤에 있어.
between|사이에|The ball is between the shoes.|공은 신발들 사이에 있어.
beside|옆에|Sit beside your friend.|친구 옆에 앉아.
near|가까이에|The park is near our house.|공원은 우리 집 가까이에 있어.
far|멀리|The mountain is far away.|그 산은 멀리 있어.
inside|안쪽에|It is warm inside.|안쪽은 따뜻해.
outside|바깥에|Let us play outside.|밖에서 놀자.
around|주위에; 둘레로|We walk around the pond.|우리는 연못 둘레를 걸어.`,
`우리 마을 탐험
town|마을|Our town has a library.|우리 마을에는 도서관이 있어.
street|거리|Our street is quiet.|우리 거리는 조용해.
park|공원|We walk in the park.|우리는 공원에서 걸어.
library|도서관|I borrow books from the library.|나는 도서관에서 책을 빌려.
shop|가게|The shop is open.|그 가게는 문을 열었어.
supermarket|슈퍼마켓|We buy food at the supermarket.|우리는 슈퍼마켓에서 먹을 것을 사.
hospital|병원|The ambulance goes to the hospital.|구급차가 병원으로 가.
station|역|We wait at the station.|우리는 역에서 기다려.
pool|수영장|We swim at the pool.|우리는 수영장에서 수영해.
centre|센터; 중심지|There is a sports centre nearby.|가까이에 스포츠 센터가 있어.
bakery|빵집|The bakery smells lovely.|빵집에서 좋은 냄새가 나.
post office|우체국|We post a letter at the post office.|우리는 우체국에서 편지를 부쳐.|phrase`,
`탈것을 타고
car|자동차|We travel in a car.|우리는 자동차를 타고 이동해.
bus|버스|The bus stops here.|버스는 여기에서 멈춰.
train|기차|The train is long.|그 기차는 길어.
bike|자전거|I ride my bike in the park.|나는 공원에서 자전거를 타.
scooter|킥보드|My scooter has two wheels.|내 킥보드는 바퀴가 두 개야.
boat|배|The boat floats on the water.|배가 물 위에 떠 있어.
plane|비행기|The plane is in the sky.|비행기가 하늘에 있어.
tram|노면전차|We ride a tram in the city.|우리는 도시에서 노면전차를 타.
truck|트럭|The truck carries boxes.|트럭이 상자들을 실어 날라.
wheel|바퀴|This wheel goes round.|이 바퀴는 빙글빙글 돌아.
ticket|표; 승차권|I have a train ticket.|나는 기차표가 있어.
ride|타다|Can you ride a bike?|자전거를 탈 수 있니?`,
`마을을 돕는 사람들
doctor|의사|The doctor checks my ears.|의사 선생님이 내 귀를 살펴보셔.
nurse|간호사|The nurse is kind.|간호사 선생님은 친절해.
dentist|치과 의사|The dentist checks my teeth.|치과 의사 선생님이 내 이를 살펴보셔.
firefighter|소방관|The firefighter helps people.|소방관은 사람들을 도와.
police|경찰|The police help keep people safe.|경찰은 사람들이 안전하게 지내도록 도와.
farmer|농부|The farmer grows food.|농부는 먹을 것을 길러.
builder|건축 일을 하는 사람|The builder makes a wall.|건축 일을 하는 사람이 벽을 만들어.
driver|운전사|The driver stops the bus.|운전사가 버스를 멈춰.
baker|제빵사|The baker makes bread.|제빵사는 빵을 만들어.
librarian|사서|The librarian helps me find a book.|사서 선생님이 책을 찾도록 도와주셔.
vet|수의사|The vet checks our dog.|수의사 선생님이 우리 개를 진찰해.
neighbour|이웃|Our neighbour has a garden.|우리 이웃에게는 정원이 있어.`,
`가게에서 부탁하기
buy|사다|We buy apples.|우리는 사과를 사.
sell|팔다|They sell fresh bread.|그 가게에서는 갓 만든 빵을 팔아.
pay|돈을 내다|We pay at the counter.|우리는 계산대에서 돈을 내.
money|돈|Keep your money in your purse.|돈을 네 작은 가방에 넣어 둬.
coin|동전|I found a coin.|나는 동전을 찾았어.
dollar|달러|This costs one dollar.|이것은 1달러야.
price|가격|What is the price?|가격이 얼마니?
change|거스름돈|Here is your change.|여기 거스름돈이 있어요.
basket|바구니|Put the apples in the basket.|사과를 바구니에 넣어.
list|목록|Check the shopping list.|장 볼 목록을 확인해.
fresh|신선한|These berries are fresh.|이 베리들은 신선해.
food|음식|We have enough food.|우리에게는 음식이 충분히 있어.`,
`몸이 아플 때
body|몸|My body needs rest.|내 몸은 휴식이 필요해.
hurt|아프다; 다치게 하다|My knee hurts.|내 무릎이 아파.
sick|아픈|I feel sick today.|나는 오늘 몸이 아파.
well|건강한|I feel well again.|나는 다시 건강해졌어.
pain|통증|Tell an adult about the pain.|아픈 곳을 어른에게 말해.
cough|기침하다|Cover your mouth when you cough.|기침할 때 입을 가려.
sneeze|재채기하다|I sneeze into my elbow.|나는 팔꿈치 안쪽으로 입을 가리고 재채기해.
fever|열; 발열|The child has a fever.|그 아이는 열이 있어.
medicine|약|An adult gives me my medicine.|어른이 내게 약을 주셔.
bandage|붕대|The nurse puts on a bandage.|간호사 선생님이 붕대를 감아 주셔.
knee|무릎|I bent my knee.|나는 무릎을 굽혔어.
elbow|팔꿈치|My elbow is on the table.|내 팔꿈치가 식탁 위에 있어.`,
`안전하게 다니기
safe|안전한|This is a safe place to wait.|이곳은 안전하게 기다릴 수 있는 곳이야.
danger|위험|Keep away from danger.|위험한 곳에서 떨어져 있어.
careful|조심하는|Be careful on the steps.|계단에서 조심해.
road|도로|Hold an adult's hand near the road.|도로 근처에서는 어른의 손을 잡아.
crossing|횡단보도|We wait at the crossing.|우리는 횡단보도에서 기다려.
traffic|차들의 통행|Watch the traffic with an adult.|어른과 함께 차들이 다니는 것을 살펴봐.
helmet|헬멧|Wear a helmet on your bike.|자전거를 탈 때는 헬멧을 써.
seatbelt|안전벨트|Fasten your seatbelt.|안전벨트를 매.
sunscreen|자외선 차단제|Put on sunscreen before going out.|밖에 나가기 전에 자외선 차단제를 발라.
shade|그늘|Let us sit in the shade.|그늘에 앉자.
adult|어른|Ask a trusted adult for help.|믿을 수 있는 어른에게 도움을 청해.
lost|길을 잃은; 잃어버린|I am lost and need help.|나는 길을 잃어서 도움이 필요해.`,
`운동장에서 한 판
sport|운동; 스포츠|What sport do you like?|너는 어떤 운동을 좋아하니?
team|팀|We are on the same team.|우리는 같은 팀이야.
game|게임; 경기|Let us play a game.|우리 게임을 하자.
goal|골; 목표|She scores a goal.|그 아이가 골을 넣어.
kick|발로 차다|Kick the ball gently.|공을 살살 차.
hit|치다|Hit the ball with the bat.|방망이로 공을 쳐.
bat|방망이|Hold the bat with two hands.|두 손으로 방망이를 잡아.
swim|수영하다|I swim with an adult nearby.|나는 어른이 가까이 있는 곳에서 수영해.
race|달리기 시합; 경주|The race starts soon.|달리기 시합이 곧 시작돼.
win|이기다|Our team hopes to win.|우리 팀은 이기고 싶어 해.
score|점수|What is the score?|점수가 어떻게 되니?
practice|연습|A little practice helps.|조금씩 연습하면 도움이 돼.`,
`노래와 미술 시간
music|음악|We listen to music.|우리는 음악을 들어.
song|노래|This song is fun.|이 노래는 재미있어.
sing|노래하다|Sing with me.|나와 함께 노래하자.
dance|춤추다|We dance to the music.|우리는 음악에 맞춰 춤을 춰.
clap|박수 치다|Clap your hands.|손뼉을 쳐.
drum|북|Tap the drum softly.|북을 살살 두드려.
bell|종|I can hear a bell.|종소리가 들려.
beat|박자|Clap to the beat.|박자에 맞춰 박수를 쳐.
paint|물감으로 그리다|Paint a blue sky.|파란 하늘을 물감으로 그려.
picture|그림|Tell me about your picture.|네 그림 이야기를 해 줘.
scissors|가위|Use the scissors carefully.|가위를 조심해서 써.
make|만들다|We make a paper bird.|우리는 종이 새를 만들어.`,
`오늘과 내일
day|하루; 낮|It is a sunny day.|햇살이 밝은 날이야.
night|밤|We see stars at night.|우리는 밤에 별을 봐.
morning|아침|I read in the morning.|나는 아침에 책을 읽어.
afternoon|오후|We play in the afternoon.|우리는 오후에 놀아.
evening|저녁|The sky is pink this evening.|오늘 저녁 하늘은 분홍빛이야.
today|오늘|Today is a school day.|오늘은 학교에 가는 날이야.
tomorrow|내일|We will visit Grandma tomorrow.|우리는 내일 할머니를 뵈러 갈 거야.
yesterday|어제|It rained yesterday.|어제 비가 왔어.
week|한 주|There are seven days in a week.|한 주는 7일이야.
weekend|주말|We visit the park at the weekend.|우리는 주말에 공원에 가.
clock|시계|Look at the clock.|시계를 봐.
time|시간|It is time for lunch.|점심 먹을 시간이야.`,
`일주일과 날씨
Monday|월요일|We go to school on Monday.|우리는 월요일에 학교에 가.
Tuesday|화요일|I have music on Tuesday.|나는 화요일에 음악 수업이 있어.
Wednesday|수요일|Wednesday comes after Tuesday.|수요일은 화요일 다음이야.
Thursday|목요일|We read together on Thursday.|우리는 목요일에 함께 책을 읽어.
Friday|금요일|Friday is before the weekend.|금요일은 주말 전날이야.
Saturday|토요일|We play in the park on Saturday.|우리는 토요일에 공원에서 놀아.
Sunday|일요일|I visit my cousin on Sunday.|나는 일요일에 사촌을 만나러 가.
weather|날씨|What is the weather like?|날씨가 어떠니?
sunny|햇살이 밝은|It is sunny outside.|밖에 햇살이 밝아.
rainy|비가 오는|Wear your boots on a rainy day.|비 오는 날에는 장화를 신어.
cloudy|구름이 낀|It is cloudy today.|오늘은 구름이 끼었어.
windy|바람이 부는|It is too windy for my hat.|바람이 너무 불어서 모자가 날아가겠어.`,
`계절의 문을 열어요
season|계절|What is your favourite season?|네가 가장 좋아하는 계절은 뭐니?
spring|봄|Flowers grow in spring.|봄에는 꽃들이 자라.
summer|여름|Summer days can be hot.|여름날은 더울 수 있어.
autumn|가을|Some leaves change colour in autumn.|가을에는 어떤 나뭇잎들이 색깔을 바꿔.
winter|겨울|I wear a jumper in winter.|나는 겨울에 스웨터를 입어.
hot|뜨거운; 더운|The sand is hot.|모래가 뜨거워.
cold|차가운; 추운|My hands are cold.|내 손이 차가워.
warm|따뜻한|The blanket keeps me warm.|담요가 나를 따뜻하게 해 줘.
cool|시원한|The water feels cool.|물이 시원하게 느껴져.
rain|비|The rain waters the garden.|비가 정원에 물을 줘.
wind|바람|The wind moves the leaves.|바람이 나뭇잎을 움직여.
rainbow|무지개|I can see a rainbow.|무지개가 보여.`,
`씨앗의 작은 정원
tree|나무|A bird sits in the tree.|새가 나무에 앉아 있어.
leaf|나뭇잎|This leaf is green.|이 나뭇잎은 초록색이야.
seed|씨앗|Put the seed in the soil.|씨앗을 흙에 심어.
flower|꽃|The flower has pink petals.|그 꽃에는 분홍색 꽃잎이 있어.
root|뿌리|The root grows down into the soil.|뿌리가 흙 속으로 내려가며 자라.
stem|줄기|The stem holds up the flower.|줄기가 꽃을 받쳐 줘.
soil|흙|The soil feels damp.|흙이 촉촉해.
garden|정원|We have a small garden.|우리는 작은 정원이 있어.
grass|풀; 잔디|The grass is green.|잔디가 초록색이야.
grow|자라다|Plants need water to grow.|식물은 자라려면 물이 필요해.
plant|식물|This plant has big leaves.|이 식물은 잎이 커.
branch|나뭇가지|A nest is on the branch.|나뭇가지에 둥지가 있어.`,
`호주 동물 탐험
kangaroo|캥거루|The kangaroo has strong legs.|캥거루는 다리가 튼튼해.
koala|코알라|The koala rests in a tree.|코알라가 나무에서 쉬고 있어.
wombat|웜뱃|The wombat digs a burrow.|웜뱃이 굴을 파.
possum|포섬|A possum comes out at night.|포섬은 밤에 밖으로 나와.
emu|에뮤|The emu runs on long legs.|에뮤는 긴 다리로 달려.
kookaburra|쿠카버라|The kookaburra sounds like it is laughing.|쿠카버라의 소리는 웃는 것처럼 들려.
cockatoo|코카투 앵무새|A cockatoo sits on the fence.|코카투 앵무새가 울타리에 앉아 있어.
wallaby|왈라비|The wallaby eats grass.|왈라비는 풀을 먹어.
echidna|가시두더지|The echidna has sharp spines.|가시두더지는 뾰족한 가시가 있어.
platypus|오리너구리|A platypus swims in the creek.|오리너구리가 개울에서 헤엄쳐.
dingo|딩고|A dingo is a wild dog.|딩고는 야생 개야.
lizard|도마뱀|The lizard rests on a rock.|도마뱀이 바위 위에서 쉬어.`,
`가까이 만나는 동물
dog|개|The dog wags its tail.|개가 꼬리를 흔들어.
cat|고양이|The cat sleeps on the chair.|고양이가 의자에서 자.
rabbit|토끼|The rabbit has long ears.|토끼는 귀가 길어.
bird|새|The bird has two wings.|새에게는 날개가 두 개 있어.
fish|물고기|The fish swims in the pond.|물고기가 연못에서 헤엄쳐.
horse|말|The horse runs across the field.|말이 들판을 가로질러 달려.
cow|소|The cow eats grass.|소가 풀을 먹어.
sheep|양|The sheep has thick wool.|양은 털이 두꺼워.
pig|돼지|The pig rolls in the mud.|돼지가 진흙에서 뒹굴어.
duck|오리|A duck swims past us.|오리 한 마리가 우리 곁을 헤엄쳐 지나가.
bee|벌|The bee visits a flower.|벌이 꽃으로 날아와.
ant|개미|An ant carries a crumb.|개미 한 마리가 빵 부스러기를 날라.`,
`바다 동물 친구들
whale|고래|The whale comes up for air.|고래는 숨을 쉬려고 물 위로 올라와.
dolphin|돌고래|The dolphin leaps out of the water.|돌고래가 물 밖으로 뛰어올라.
shark|상어|The shark swims through the sea.|상어가 바다를 헤엄쳐 가.
turtle|거북|The turtle has a shell.|거북은 등딱지가 있어.
crab|게|The crab walks sideways.|게는 옆으로 걸어.
octopus|문어|An octopus has eight arms.|문어는 팔이 여덟 개야.
jellyfish|해파리|We watch the jellyfish without touching it.|우리는 해파리를 만지지 않고 바라봐.
penguin|펭귄|The penguin dives into the water.|펭귄이 물속으로 뛰어들어.
seal|물범|The seal rests on a rock.|물범이 바위 위에서 쉬어.
shell|껍데기; 조개껍데기|I found a shell on the beach.|나는 해변에서 조개껍데기를 찾았어.
fin|지느러미|A fish uses its fin to move.|물고기는 지느러미를 사용해서 움직여.
tail|꼬리|The fish moves its tail.|물고기가 꼬리를 움직여.`,
`강과 산 너머로
river|강|The river flows past the town.|강이 마을을 지나 흘러.
creek|개울|A small creek runs through the park.|작은 개울이 공원을 가로질러 흘러.
lake|호수|The lake is still today.|오늘 호수는 잔잔해.
beach|해변|We build a sandcastle on the beach.|우리는 해변에서 모래성을 쌓아.
ocean|대양; 바다|The ocean looks blue.|바다는 파랗게 보여.
island|섬|Water is all around the island.|섬은 사방이 물로 둘러싸여 있어.
mountain|산|There is snow on the mountain.|산에 눈이 있어.
hill|언덕|We walk up the hill.|우리는 언덕을 걸어 올라가.
forest|숲|Many trees grow in the forest.|숲에는 많은 나무가 자라.
rock|바위; 돌|This rock is smooth.|이 돌은 매끄러워.
sand|모래|The sand feels soft.|모래가 부드럽게 느껴져.
mud|진흙|My boots are covered in mud.|내 장화에 진흙이 잔뜩 묻었어.`,
`작은 과학자의 눈
see|보다; 보이다|I can see a tiny ant.|아주 작은 개미가 보여.
hear|듣다; 들리다|Can you hear the birds?|새 소리가 들리니?
smell|냄새를 맡다|Smell the fresh bread.|갓 만든 빵 냄새를 맡아 봐.
taste|맛보다|Taste this piece of apple.|이 사과 조각을 맛봐.
touch|만지다|Touch the soft fabric.|부드러운 천을 만져 봐.
notice|알아차리다|Did you notice the new leaf?|새로 난 잎을 알아봤니?
watch|지켜보다|Watch the seed grow.|씨앗이 자라는 모습을 지켜봐.
count|세다|Count the shells.|조개껍데기를 세어 봐.
compare|비교하다|Compare the two leaves.|나뭇잎 두 장을 비교해 봐.
sort|분류하다|Sort the buttons by colour.|단추들을 색깔에 따라 나눠 봐.
measure|측정하다|Measure the desk with a ruler.|자로 책상을 재어 봐.
predict|예측하다|Predict which toy will float.|어느 장난감이 뜰지 예상해 봐.`,
`재료와 느낌 실험
wood|나무 재료; 목재|This table is made of wood.|이 식탁은 나무로 만들었어.
metal|금속|The spoon is made of metal.|이 숟가락은 금속으로 만들었어.
plastic|플라스틱|This tub is made of plastic.|이 통은 플라스틱으로 만들었어.
glass|유리|The window is made of glass.|이 창문은 유리로 만들었어.
fabric|천|This fabric feels soft.|이 천은 부드럽게 느껴져.
soft|부드러운|The teddy is soft.|곰 인형은 부드러워.
hard|딱딱한|The rock is hard.|돌은 딱딱해.
rough|거친|The bark feels rough.|나무껍질은 거칠게 느껴져.
smooth|매끄러운|This stone is smooth.|이 돌은 매끄러워.
heavy|무거운|The big box is heavy.|큰 상자는 무거워.
wet|젖은|My shoes are wet.|내 신발이 젖었어.
dry|마른|These socks are dry.|이 양말들은 말라 있어.`,
`하늘과 우주 관찰
sun|해|The sun gives us light.|해는 우리에게 빛을 줘.
moon|달|The moon looks round tonight.|오늘 밤 달은 둥글게 보여.
star|별|I see a bright star.|밝은 별 하나가 보여.
planet|행성|Earth is a planet.|지구는 행성이야.
space|우주|An astronaut travels into space.|우주 비행사가 우주로 여행해.
Earth|지구|We all live on Earth.|우리는 모두 지구에 살아.
sky|하늘|The sky is blue.|하늘이 파래.
rocket|로켓|The rocket lifts off.|로켓이 발사돼.
astronaut|우주 비행사|The astronaut wears a spacesuit.|우주 비행사는 우주복을 입어.
light|빛|Light comes through the window.|창문으로 빛이 들어와.
dark|어두운|The room is dark at night.|밤에는 방이 어두워.
shadow|그림자|My shadow moves with me.|내 그림자가 나와 함께 움직여.`,
`자연을 지키는 약속
rubbish|쓰레기|Put the rubbish in the bin.|쓰레기를 쓰레기통에 넣어.
bin|쓰레기통|The bin is beside the door.|쓰레기통은 문 옆에 있어.
recycle|재활용하다|We recycle clean paper.|우리는 깨끗한 종이를 재활용해.
reuse|다시 사용하다|We reuse this bag.|우리는 이 가방을 다시 써.
reduce|줄이다|We try to reduce waste.|우리는 쓰레기를 줄이려고 노력해.
save|아끼다; 구하다|Turn off the tap to save water.|물을 아끼려면 수도꼭지를 잠가.
protect|보호하다|We protect the little plants.|우리는 작은 식물들을 보호해.
nature|자연|We learn about nature outside.|우리는 밖에서 자연을 배워.
habitat|서식지|A pond is a habitat for frogs.|연못은 개구리의 서식지야.
litter|버려진 쓰레기|There is litter beside the path.|길 옆에 버려진 쓰레기가 있어.
healthy|건강한|A healthy tree has room to grow.|건강한 나무에는 자랄 공간이 있어.
environment|환경|We care for our environment.|우리는 우리 환경을 돌봐.`,
`내가 원하는 것을 말해요
be|이다; 되다|I want to be a good friend.|나는 좋은 친구가 되고 싶어.
have|가지고 있다|I have a new book.|나는 새 책이 있어.
do|하다|What do you do after school?|학교가 끝난 뒤에 무엇을 하니?
go|가다|Let us go to the park.|공원에 가자.
come|오다|Come and sit with me.|와서 나와 함께 앉자.
get|받다; 가져오다|Get your bag, please.|네 가방을 가져와 줘.
give|주다|Give the book to Mia.|미아에게 책을 줘.
take|가지고 가다|Take your hat with you.|네 모자를 가지고 가.
want|원하다|I want to read this book.|나는 이 책을 읽고 싶어.
need|필요하다|Plants need water.|식물은 물이 필요해.
like|좋아하다|I like drawing animals.|나는 동물 그리기를 좋아해.
love|사랑하다; 아주 좋아하다|I love my family.|나는 우리 가족을 사랑해.`,
`비교하고 가리켜요
this|이것; 이|This is my drawing.|이것은 내 그림이야.
that|저것; 저|That tree is very tall.|저 나무는 아주 키가 커.
these|이것들; 이|These are my shoes.|이것들은 내 신발이야.
those|저것들; 저|Those birds are noisy.|저 새들은 시끄러워.
here|여기에|Put your bag here.|가방을 여기에 놓아.
there|거기에; 저기에|My friend is over there.|내 친구가 저기에 있어.
all|모두|All the children can join.|모든 아이들이 참여할 수 있어.
some|조금; 몇몇|I would like some water.|물을 좀 마시고 싶어요.
more|더 많은|We need more paper.|우리는 종이가 더 필요해.
less|더 적은|Use less glue this time.|이번에는 풀을 더 적게 써.
same|같은|We have the same bag.|우리는 같은 가방을 갖고 있어.
different|다른|These leaves are different.|이 나뭇잎들은 서로 달라.`,
`궁금한 것을 물어요
who|누구|Who is at the door?|문 앞에 누가 있니?
what|무엇|What is in the box?|상자 안에 무엇이 있니?
where|어디|Where is my pencil?|내 연필은 어디에 있니?
when|언제|When do we eat lunch?|우리는 언제 점심을 먹니?
why|왜|Why is the leaf yellow?|그 잎은 왜 노란색이니?
how|어떻게|How do you make it?|그것을 어떻게 만드니?
which|어느 것|Which book would you like?|어느 책이 좋겠니?
can|할 수 있다|Can you help me read this?|이것을 읽도록 도와줄 수 있니?
will|앞으로 할 것이다|I will help you.|내가 너를 도와줄게.
must|반드시 해야 한다|We must follow the safety rules.|우리는 안전 규칙을 지켜야 해.
may|해도 된다; 일지도 모른다|May I sit here?|여기에 앉아도 될까요?
again|다시|Please say that again.|그 말을 다시 해 주세요.`,
`이야기를 이어 주는 말
and|그리고|I have a pencil and a book.|나는 연필과 책이 있어.
but|하지만|I am tired, but I am happy.|나는 피곤하지만 행복해.
because|왜냐하면; 때문에|I wear a hat because it is sunny.|햇살이 밝아서 나는 모자를 써.
so|그래서|It is raining, so we stay inside.|비가 와서 우리는 안에 있어.
if|만약에|If you need help, ask me.|도움이 필요하면 내게 부탁해.
before|전에|Wash your hands before you eat.|먹기 전에 손을 씻어.
after|후에|We play after lunch.|우리는 점심을 먹은 후에 놀아.
first|먼저; 첫 번째|First, put soil in the pot.|먼저 화분에 흙을 넣어.
next|다음에; 다음의|Next, add a seed.|다음으로 씨앗을 넣어.
last|마지막의|This is the last page.|이것은 마지막 쪽이야.
then|그런 다음|Then, give the seed some water.|그런 다음 씨앗에 물을 조금 줘.
finally|마지막으로; 마침내|Finally, the flower opens.|마침내 꽃이 피어.`,
`나도 이야기 작가
story|이야기|Tell me a story.|이야기를 들려줘.
character|등장인물|The main character is a rabbit.|주인공은 토끼야.
setting|이야기의 배경|The setting is a forest.|이야기의 배경은 숲이야.
beginning|시작 부분|At the beginning, the bird is lost.|처음에는 새가 길을 잃었어.
middle|가운데 부분|In the middle, the bird finds a map.|중간에는 새가 지도를 찾아.
ending|결말|The story has a happy ending.|그 이야기는 행복하게 끝나.
problem|문제|The broken bridge is a problem.|망가진 다리가 문제야.
solution|해결책|The friends find a solution.|친구들이 해결책을 찾아.
author|작가|The author writes the story.|작가는 이야기를 써.
title|제목|What is the title of the book?|그 책의 제목은 무엇이니?
page|쪽; 페이지|Turn to the next page.|다음 쪽을 펼쳐.
sentence|문장|Write one sentence about the cat.|그 고양이에 대해 한 문장을 써.`,
`상상 나라로 출발
adventure|모험|Our adventure begins today.|우리 모험은 오늘 시작돼.
treasure|보물|The friends find a treasure chest.|친구들이 보물 상자를 찾아.
map|지도|Follow the path on the map.|지도에 있는 길을 따라가.
castle|성|The castle stands on a hill.|성이 언덕 위에 서 있어.
dragon|용|The friendly dragon shares its fruit.|친절한 용은 과일을 나눠 줘.
fairy|요정|The fairy has tiny wings.|요정에게는 아주 작은 날개가 있어.
giant|거인|The giant has enormous shoes.|거인은 신발이 아주 커.
hero|영웅|The hero helps the lost bird.|영웅이 길 잃은 새를 도와.
magic|마법|The story has a magic door.|이야기에는 마법의 문이 나와.
brave|용감한|The brave child asks for help.|용감한 아이가 도움을 청해.
journey|여정; 여행|Their journey takes three days.|그들의 여행에는 3일이 걸려.
imagine|상상하다|Imagine a tree made of books.|책으로 만든 나무를 상상해 봐.`,
`모험을 움직이는 말
carry|나르다|Carry the basket with two hands.|두 손으로 바구니를 들어 날라.
pull|당기다|Pull the little wagon.|작은 수레를 당겨.
push|밀다|Push the door gently.|문을 살살 밀어.
lift|들어 올리다|Lift the lid carefully.|뚜껑을 조심해서 들어 올려.
drop|떨어뜨리다|Do not drop the cup.|컵을 떨어뜨리지 마.
pick|고르다; 따다|Pick a book to read.|읽을 책을 골라.
build|만들다; 짓다|We build a bridge with blocks.|우리는 블록으로 다리를 만들어.
break|깨지다; 부수다|Be careful not to break the model.|모형이 망가지지 않도록 조심해.
find|찾다|Can you find the blue shell?|파란 조개껍데기를 찾을 수 있니?
hide|숨다; 숨기다|The rabbit likes to hide.|토끼는 숨는 것을 좋아해.
move|움직이다|Move the chair a little.|의자를 조금 옮겨.
walk|걷다|Walk with me along the path.|나와 함께 길을 따라 걷자.`,
`더 자세하게 말해요
fast|빠른; 빠르게|That bird flies fast.|저 새는 빠르게 날아.
slow|느린|The snail is slow.|달팽이는 느려.
loud|소리가 큰|The drum is loud.|북소리가 커.
quiet|조용한|Please be quiet in this room.|이 방에서는 조용히 해 줘.
bright|밝은|The stars are bright tonight.|오늘 밤 별들이 밝아.
dull|칙칙한; 흐릿한|The sky is a dull grey.|하늘이 칙칙한 회색이야.
easy|쉬운|This puzzle is easy for me.|이 퍼즐은 나에게 쉬워.
difficult|어려운|This word is difficult to spell.|이 단어는 철자를 쓰기 어려워.
empty|빈|The basket is empty.|바구니가 비어 있어.
full|가득 찬|The box is full of books.|상자에 책이 가득해.
favourite|가장 좋아하는|This is my favourite story.|이것은 내가 가장 좋아하는 이야기야.
special|특별한|Today is a special day.|오늘은 특별한 날이야.`,
`생각하는 힘 키우기
learn|배우다|We learn something new each day.|우리는 매일 새로운 것을 배워.
think|생각하다|Think about what might happen.|무슨 일이 일어날지 생각해 봐.
know|알다|I know the answer.|나는 답을 알아.
remember|기억하다|Remember to bring your hat.|모자 가져오는 것을 기억해.
forget|잊다|I sometimes forget a word.|나는 가끔 단어를 잊어버려.
understand|이해하다|I understand the story now.|나는 이제 그 이야기를 이해해.
explain|설명하다|Explain how your toy works.|네 장난감이 어떻게 움직이는지 설명해 봐.
choose|선택하다|Choose the best place for the plant.|그 식물에 가장 좋은 자리를 골라.
check|확인하다|Check your work carefully.|네가 한 것을 꼼꼼히 확인해.
mistake|실수|It is okay to make a mistake.|실수해도 괜찮아.
idea|생각; 아이디어|I have an idea for a game.|나는 게임에 대한 생각이 있어.
reason|이유|Give a reason for your choice.|네가 선택한 이유를 말해 봐.`,
`모험가의 마지막 축제
celebrate|축하하다|We celebrate what we have learnt.|우리는 배운 것들을 함께 기념해.
finish|끝내다|I can finish this puzzle.|나는 이 퍼즐을 완성할 수 있어.
success|성공|Finishing the story is a success.|이야기를 끝까지 쓴 것은 성공이야.
effort|노력|Your effort helps you learn.|네 노력이 배우는 데 도움이 돼.
improve|나아지다; 향상시키다|I improve with practice.|나는 연습하면서 나아져.
patient|참을성 있는|Be patient while your friend thinks.|친구가 생각하는 동안 차분히 기다려 줘.
fair|공평한|Everyone gets a fair turn.|모두에게 공평하게 차례가 돌아가.
honest|정직한|Be honest about what happened.|무슨 일이 있었는지 솔직하게 말해.
promise|약속하다|I promise to take care of the book.|그 책을 소중히 다루겠다고 약속해.
invite|초대하다|We invite our friends to the picnic.|우리는 친구들을 소풍에 초대해.
thank|감사하다|I thank my friend for helping.|나는 친구가 도와준 것에 고마워해.
smile|미소 짓다|We smile at each other.|우리는 서로 보며 미소 지어.`,
  ];
  return blocks.map((block, index) => {
    const [title, ...rows] = block.split('\n');
    return {
      day: index + 1,
      title,
      region: Math.floor(index / 10),
      words: rows.map(row => {
        const [en, ko, example, exampleKo, type = 'word'] = row.split('|');
        return { en, ko, example, exampleKo, type };
      })
    };
  });
})();
