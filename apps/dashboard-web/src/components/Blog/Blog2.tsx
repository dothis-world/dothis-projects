import styles from './blog.module.css';

const Blog2 = () => {
  return (
    <li className={styles.container}>
      <h1>{'초보 유튜버라면 꼭 챙겨야 하는 유튜브 검색엔진 최적화 (SEO)'}</h1>
      <p className={styles.date}>{'2023.10.24. 01:51'}</p>
      <div className={styles.contentDivision}>
        <p>
          안녕하세요! 영상 기획 어시스턴트 두디스입니다.
          <br />
          오늘은 어쩌면 많은 유튜버들이 간과하고 있을 ‘검색 유입'에 대해
          이야기해보려고 합니다.
        </p>
        <br />
        <p>
          내 유튜브 채널을 많은 시청자들에게 노출시키고 싶은데, 광고 말고는
          방법을 모르겠는 사람 혹은 유튜브 SEO가 무엇인지 모르는 사람이라면 꼭
          읽어보세요. 채널 운영의 방향성이 보일 거예요.
          <br />
        </p>
        <br />
        <h3>이 글을 읽으면 아래 내용을 이해할 수 있어요!</h3>
        <br />
        <p>1. 유튜브 SEO의 필요성 (+검색 시장에서 구글을 제친 유튜브)</p>
        <p>2. 유튜브 SEO에서 가장 중요한 재료</p>
        <br />

        <h5>1. 유입 경로 분석 먼저!</h5>
        <br />
        <p>
          지금 이 글을 읽고 있는 여러분, 유튜브 스튜디오 둘러본 적 있으신가요?
          <br />
          유튜브 스튜디오는 내 채널을 관리하고 성장시키는데 큰 도움이 되는 채널
          분석 도구입니다.
          <br />
          유튜브 스튜디오를 보지 않고 채널을 운영한다는 것은 초행길을 내비게이션
          없이 운전하는 것과 같다고 할 수 있어요.
          <br />
          스튜디오를 통해서 볼 수 있는 데이터도 상당히 많은데요.
          <br />
          오늘 우리가 챙겨봐야 할 것은 ‘시청자가 내 동영상을 어떻게 찾는가'를
          보여주는 트래픽 소스 데이터입니다.
          <br />
          시청자들이 나의 채널을 어떤 경로로 방문하는지 빠르게 체크할 수 있죠.
          <br />
          과연 내 채널에서 가장 순위가 높은 유입 경로는 어디일까요?
          <br />
          <br />
          혹시 유튜브 스튜디오에서 트래픽 소스를 한 번도 본 적 없는 초보
          유튜버라면 아래 링크 눌러서 글 읽어본 뒤에 이 글로 돌아오셔서 마저
          보시길 추천드립니다.
          <br />
          <a href="https://sithod.tistory.com/18">
            유튜브 스튜디오 데이터 뜯어보기 (1): 트래픽 소스 분석
          </a>
        </p>
        <h5>2. 나도 유튜브 SEO 해야 할까?</h5>
        <br />
        <p>
          내 채널 유입 경로에서 가장 높은 순위를 차지하는 소스가 무엇인지 확인해
          보셨나요?
          <br />
          아마 이 글을 보고 계시는 여러분 중 대다수는 ‘Youtube 검색’이 트래픽
          소스의 가장 많은 비율을 차지할 겁니다.
          <br />
          트래픽 소스는 시청자의 유입 경로를 의미해요.
          <br />그 중{' '}
          <b>
            유튜브 검색 항목은 유튜브 플랫폼 내부에서 특정 검색어를 입력해
            여러분의 채널, 영상으로 들어오는 경로
          </b>
          를 말하고요.
          <br />
          <br />
          자, 유튜브 검색 엔진에 ‘드립 커피 내리는 방법’을 한 번 검색해 볼게요.
          <br />
          <br />
          <img src={'/images/blog/blog-2-1.png'} alt="2-1" />
          <br />
          <br />
          검색 결과 페이지에는 ‘드립커피'와 ‘방법' 키워드를 다루는 영상들이 쭈욱
          나열되어 보입니다.
          <br />
          뉴스, 카페 알바 브이로그, 예능 프로그램, 각종 플레이리스트 채널까지
          채널의 성격을 가리지 않고 제가 검색한 키워드를 중심으로 결과를
          띄워주죠.
          <br />
          <br />
          여기서 마음에 드는 영상을 클릭해서 시청하면 그 채널의 유입 경로 중
          유튜브 검색 지표가 +1 올라가는 겁니다.
          <br />
          <br />
          검색 결과 영상들의 조회 수를 한번 볼까요?
          <br />
          1만 이하부터 100만 이상까지 다양하네요.
          <br />
          <br />
          아니 그런데 100만 조회 수 영상은 검색 결과 상단에 노출되는 게 당연한
          것 같은데, 1만 이하 조회 수의 영상들은 뭘까요? 어떻게 인기 동영상과
          함께 결과 페이지에서 노출되고 있는 걸까요?
          <br />
          그저 운과 타이밍으로 되는 걸까요?
          <br />
          <br />
          아니죠. 이때 필요한 게 바로 유튜브 SEO입니다.
          <br />
          <br />
        </p>
        <h5>3. 구글을 제친 검색 엔진, 유튜브</h5>
        <p>
          <br />
          <br />
          <img src={'/images/blog/blog-2-2.png'} alt="2-2" />
          <br />
          <br />
          위 그래프는 '나스미디어'에서 2022년에 조사한 정보 검색 이용 채널
          분포에 대한 비교 그래프입니다.
          <br />
          실제로 유튜브를 정보 검색 채널로서 활용하는 비율이 빠르게 높아지고
          있어요.
          <br />
          네이버, 구글과 어깨를 나란히 하는 검색 엔진으로서 단단히 뿌리를 내리고
          있죠.
          <br />
          <br />
          여기까지 보고 나니 이제 우리가 신경 써야 할 지점이 무엇인지
          확실해졌죠?
          <br />
          SEO, 즉 여러분의 영상을 검색 결과에 노출시켜야 합니다!
        </p>
        <h5>4. 유튜브 SEO가 정확히 뭔가요?</h5>
        <br />
        <p>
          유튜브 SEO는 유튜브 검색 엔진에 특정 키워드를 검색했을 때 내 영상이
          상위에 노출될 수 있도록 최적화하는 작업을 말합니다.
          <br />
          <br />
          어떻게 해야 상위 노출이 될 수 있냐고요?
          <br />
          유튜브 알고리즘이 영상을 이해하고 분류하는 데 도움을 주는 메타데이터를
          잘 만져야 해요.
          <br />
          메타데이터는 쉽게 말하면 영상 제목, 설명(Description)처럼 영상을
          설명할 수 있는 정보를 뜻하는데요.
          <br />이 영역에 핵심 키워드와 연관 키워드를 적절히 배치하면 내 영상이
          검색 결과에서 노출될 확률이 높아지죠.
          <br />
          <br />
          <ul>
            <li>1. 영상 제목</li>
            <li>2. 설명(Description)</li>
            <li>3. 오디오 대본(Script)</li>
            <li>5. 썸네일</li>
            <li>6. 자체 자막 삽입</li>
          </ul>
          <br />
          유튜브는 이렇게 6개의 영역에 들어갈 키워드와 문구로 영상을 이해합니다.
          <br />
          당연히 내가 전하고자 하는 주제의 핵심 키워드 선정이 매우 중요하겠죠?
        </p>
        <br />
        <h5>5. 유튜브 SEO 키워드는 어떻게 선정하나요?</h5>
        <br />
        <p>
          내가 정확히 타겟으로 잡고 있는 키워드를 떠올려 보세요.
          <br />
          다소 경쟁률이 낮은 키워드도 있을 것이고, 모두가 원하는 경쟁률이 아주
          높은 키워드도 있을 텐데요.
          <br />
          모두에게 인기가 많은 키워드를 선택할 경우, 내 영상을 상단에 노출시키는
          것이 많이 어려워지겠죠.
          <br />
          그래서 무턱대고 원하는 키워드를 입력하기보다는 키워드의 검색량과
          콘텐츠 개수를 함께 놓고 적절한 키워드를 선택해야 합니다.
          <br />
          <br />
          <img src={'/images/blog/blog-2-3.jpg'} alt="2-3" />
          <br />
          <br />
          예를 들어 검색량이 높은데 콘텐츠 수가 적은 키워드의 경우에는 경쟁
          강도가 낮은 키워드이기 때문에 한번 도전해 볼만한 거죠.
          <br />
          <br />
          그런데 인기 검색어를 참고하고, 연관 검색어를 찾아보고, 경쟁 강도를
          따져보고, 주제에 부합한 핵심 키워드를 선정하는 과정은 생각보다 품이
          많이 들어갑니다.
          <br />
          그래서 빠르게 검증된 공식을 찾고 싶을 때는 원하는 주제에서 좋은 성과를
          내고 있는 영상의 키워드와 문구들을 참고하기도 하는데요.
          <br />
          <b>가장 좋은 방법은 역시 도구를 이용하는 겁니다.</b>
          <br />
          조금 더 정확한 키워드 분석 데이터를 확인할 수 있거든요.
          <br />
          <br />
          어떤 도구를 사용해야 빠르고 확실하게 핵심 키워드를 도출할 수 있을까요?
          <br />
          이 도구들에 대한 자세한 내용은 2편으로 다시 돌아와서 알려 드릴게요.
          <br />
          <br />
          부디 오늘 이 글이 유튜브 SEO의 필요성을 느낄 수 있는 계기가 됐길
          바라요! 여러분의 유튜브 성장 과정을 돕는 두디스였습니다.
        </p>
      </div>
      <br />
      <br />
      <p>
        유튜브 영상 기획 서비스, 두디스(DOTHIS) 출시가 되었습니다! 지금 접속해서
        무료로 체험하세요.
        <br />
        <a href="https://dothis.kr/">https://dothis.kr/</a>
      </p>
    </li>
  );
};

export default Blog2;
