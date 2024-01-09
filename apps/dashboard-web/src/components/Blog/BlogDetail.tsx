import styles from './blog.module.css';

interface Props {
  title: string;
  date: string;
  content: string;
}

const BlogDetail = () => {
  return (
    <li className={styles.container}>
      <h1>{'유튜브 조회수 카운팅 기준은?'}</h1>
      <p className={styles.date}>{'2023-09-08 11:57'}</p>
      <div className={styles.contentDivision}>
        <p>
          안녕하세요! 영상 기획 어시스턴트 두디스입니다. 오늘은 유튜브 영상
          조회수와 노출수, 카운팅 기준에 대해 알려드리려고 합니다.
        </p>
        <br />
        <p>영상 조회수와 노출수.</p>
        <p>
          유튜브 채널을 운영한다면 반드시 이해하고 있어야 하는 기본적인
          지표인데요. 표면적으로는 이해가 어렵지 않은 용어들이죠. 그렇다면
          조회수와 노출수가 어떻게 집계 되고 있는지도 이해하고 계신가요? 오늘은
          유튜브에서 말하는 조회수와 노출수의 정의, 집계 기준과 관련 용어들까지
          개념을 정리해 드릴게요.
        </p>
        <h3>이 글을 읽으면 아래 내용을 이해할 수 있어요!</h3>
        <br />
        <p>1. 조회수와 집계 기준</p>
        <p>2. 노출수와 집계 기준</p>
        <p>3. 함께 묶어서 봐야하는 지표들</p>

        <h5>유튜브 영상 조회수와 집계 기준</h5>
        <br />
        <p>
          조회수는 동영상을 정상적으로 조회한 횟수입니다. 여기서 ‘정상적으로'는
          아래 두 가지 측정 기준을 충족한다는 의미의 전제인데요.
        </p>
        {/* 이미지 추가 */}
        <br />

        <h5>조회수 집계 기준</h5>
        <br />
        <p>1. 시청자가 재생 버튼을 클릭했는가</p>
        <p>2. 영상을 최소 30초 이상 시청했는가</p>
        <br />
        <p>
          내 유튜브 홈에 노출된 팬더 영상 썸네일을 클릭해서 30초 이상 시청했다면
          유효한 조회수로 집계되는 것이죠. (= 노출수+1 조회수+1)
        </p>
        <br />
        <p>
          또 하나 알아두셔야 할 것은 조회수의 의미입니다. 조회수는 가장 눈에 잘
          띄는 중요한 지표가 맞지만, 지표의 값보다는 그 값으로 얻을 수 있는
          인사이트가 무엇인가를 아는 것이 더 중요합니다. 조회수가 1회 올랐다는
          것은 한 사람이 내 영상의 재생 버튼을 클릭한 후 30초 이상 시청했다는
          것인데요. 시청자가 재생 버튼을 클릭한 후 일정 시간 시청하지 않으면
          품질이 낮은 조회수만 쌓이겠죠! 그렇기 때문에 피상적 수치보다는{' '}
          <b>
            시청 시간, 평균 시청 지속 시간 등 관련 지표를 함께 엮어 유의미한
            인사이트를 뽑아내는 것
          </b>
          이 중요합니다.
        </p>
        <h5>TIP</h5>
        <ol>
          <li>
            내가 재생 버튼을 클릭하기 이전에 자동 재생되는 영상은 조회수가
            집계되지 않아요.
          </li>
          <li>
            영상을 건너뛰더라도 총 시청시간이 30초 이상이라면 조회수가 집계돼요.
          </li>
          <li>내 영상을 내가 보는 경우, 조회수는 최대 3회까지만 집계돼요.</li>
          <li>영상에 삽입된 광고를 클릭 시 조회수가 집계돼요. (중복 집계 X)</li>
        </ol>

        <h5>유튜브 영상 노출수와 집계 기준</h5>

        <p>
          노출수는 유튜브 내에서 영상 썸네일이 시청자에게 표시된 횟수입니다.
          <br />말 그대로 ‘미리보기 이미지가 몇 번 보여졌는가'인데요. (썸네일 =
          미리보기 이미지)
        </p>
        {/* 이미지 추가 */}

        <h5>노출수 집계 기준</h5>
        <ul>
          <li>1. 썸네일이 1초 이상 표시되는가</li>
          <li>2. 썸네일의 50% 이상이 표시되는가</li>
        </ul>
        <br />
        <p>
          위 기준을 보니 ‘썸네일이 어떤 위치에서 노출됐는가'도 중요해보이죠?
          <br />
          유튜브 영상 노출수가 정상 집계되는 위치는 크게 5개 영역으로 볼 수
          있습니다.
        </p>
        <br />
        <ul>
          <li>1. 유튜브 홈</li>
          <li>2. 유튜브 검색 결과</li>
          <li>3. 유튜브 피드 (구독, 인기, 시청 기록, 나중에 볼 동영상)</li>
          <li>4. 시청중일 때 오른편에 위치한 ‘다음 동영상' 추천</li>
          <li>5. 재생 목록</li>
        </ul>
        <br />
        <p>
          즉, 노출수는 위 5개 영역에서 썸네일이 몇 번 표시되었는가를 보는
          지표입니다. 바꿔 말하면 노출수는 동영상의 도달 범위를 파악할 수 있는
          것이죠.
        </p>
        <br />
        <h5>TIP</h5>
        <ol>
          <li>
            노출수 집계 제외 위치: 외부 웹사이트, 외부 앱, 유튜브 모바일
            웹사이트, 영상 최종 화면
          </li>
          <li>
            조회수 &#60; 노출수로 생각하기 쉽지만 썸네일 노출 위치에 따라 조회수
            &#62; 노출수 통계가 나올 수도 있어요.
          </li>
          <li>내 영상을 내가 보는 경우, 조회수는 최대 3회까지만 집계돼요.</li>
          <li>영상에 삽입된 광고를 클릭 시 조회수가 집계돼요. (중복 집계 X)</li>
        </ol>
        <br />
        <br />

        <h5>함께 묶어서 봐야 하는 유튜브 콘텐츠 지표들</h5>

        <p>
          앞서 말씀드린 노출수, 조회수 모두 유튜브 스튜디오에서 확인하실 수
          있습니다. 그런데 이 외에 단번에 이해하기는 조금 어려운 용어들이 또 꽤
          보이죠.
        </p>
        <br />
        {/* 이미지 추가 */}
        <br />
        <p>
          노출수, 조회수와 더불어 같이 보면 좋은 지표들을 이해하기 쉽게 정리해
          드릴게요.
        </p>
        <br />
        <ul>
          <li>1. 노출 클릭률</li>
          <li>
            썸네일이 표시됐을 때, 시청자가 영상을 클릭한 비율 (썸네일 이미지,
            제목, 콘텐츠의 매력도를 파악할 수 있는 지표예요.)
          </li>
          <li>2. 평균 조회율</li>
          <li>영상 조회당 평균 시청률</li>
          <li>3. 시청 시간</li>
          <li>시청자가 내 동영상을 시청하는데 소비한 시간</li>
          <li>4. 구독자 시청 시간</li>
          <li>구독자가 내 동영상을 시청하는데 소비한 시간</li>
          <li>5. 평균 시청 지속 시간</li>
          <li>
            시청 시간을 조회수로 나눈 값 (조회당 평균 시청 시간을 알 수 있어요.
            조회당 평균 시청 시간이 높다면 시청자의 흥미를 끄는 좋은 영상이라고
            볼 수 있겠죠.)
          </li>
          <li>6. 재방문 시청자수</li>
          <li>
            내 채널을 시청한 적이 있고 선택한 기간 안에 재방문한 시청자 수
          </li>
          <li>7. 순 시청자수</li>
          <li>
            중복값을 제거한 추정 시청자 수 (한 사람이 컴퓨터와 휴대기기를 번갈아
            사용하거나, 영상을 여러 번 시청하더라도 순 시청자 한 명으로
            집계돼요.)
          </li>
        </ul>
        <br />
        <br />
        <p>
          유튜브는 현재 공개된 기준 외에 더 까다로운 필터링 기준을 많이 가지고
          있습니다. 하지만 각 지표를 계산하는 방법은 명확히 이야기 해주지
          않습니다. 집계 기준을 공개할 경우 의도적으로 조작하여 악용할 여지가
          많아지기 때문이죠.
        </p>
        <p>
          그보다는 유튜브가 어떤 목표를 가지고 플랫폼을 운영하는지를 이해한다면
          채널이나 영상을 분석할 때 조금은 덜 어렵게 느껴지실거예요.
        </p>
        <br />
        <p>
          두디스에서 확실히 말씀드릴 수 있는 것은 유튜브에서 ‘인간이 의도적으로
          시청한 콘텐츠인가’, ‘사용자가 유튜브 플랫폼에 머무는 시간이 얼마나
          되는가'를 핵심으로 보고 있다는 사실입니다.
        </p>
        <p>
          여러분도{' '}
          <b>
            ‘어떻게 해야 시청자들이 나의 채널에 더 오래 머물 수 있을 것인가’
          </b>
          를 중점으로 고민해보시면 어떨까요?
        </p>
      </div>
      <a href="https://dothis.kr/">
        유튜브 영상 기획 서비스, 두디스(DOTHIS) 출시가 되었습니다! 지금 접속해서
        무료로 체험하세요.
      </a>
    </li>
  );
};

export default BlogDetail;
