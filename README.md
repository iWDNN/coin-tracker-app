# coin-tracker-app

- Libaries

  - styled-components
  - react-router-dom # 6.4~
  - framer-motion
  - react-hook-form
    - createBrowserRouter
    - Link : 특정 조건 없이 클릭해서 보내는 링크
    - useNavigate : 유저가 로그인하여 리다이렉트해야 할 경우는, 어떤 페이지에 접근햇는데 권한이 없어서 이동시킬 때
    - useParams : 주소 파라미터 값 가져오는 훅
    - outlet: 스크린 하나당 자식을 보여줄 경우
    - useOutletContext : outlet으로 보낸 데이터
    - url을 통해서 작업을 하는 이유 : 새로고침 했을 경우 유저가 그자리에서 시작될수 있게 만들어 주는 편의성
  - react-query
  - recoil
  - react-uuid
  - apex-chart

- api link

  - 코인전체 : https://api.coinpaprika.com/v1/coins
  - ~~코인아이콘 : https://cryptoicon-api.vercel.app/api/icon/{코인심볼} api server down~~
  - 코인아이콘 : https://cryptocurrencyliveprices.com/img/${coin.symbol.toLowerCase()}.png
  - 코인정보 : https://api.coinpaprika.com/v1/coins/{coinId}
  - 코인가격 : https://api.coinpaprika.com/v1/tickers/{coinId}
  - ohlcv임시 : https://ohlcv-api.nomadcoders.workers.dev/?coinId={coinId}

- 루트 스크린

  - 홈 스크린

    - \*북마크리스트
    - \*최근검색어리스트
    - 검색창
      - 메인창에서 react-query로 데이터 받아오기. (캐시 저장)
      - 받아온 데이터로. 검색 regExp로 해야할듯 3글자 이상부터 검색..?

  - 검색 결과 스크린

    - Cryptos.tsx

  - 크립토 순위 스크린
  - 새로운 크립토 스크린
  - 거래량 많은 크립토 스크린
  - \*크립토 비교 스크린

  - ~~크립토 스크린~~

- pricedata

  - beta_value : 베타(β)는 전체 시장(일반적으로 S&P 500)과 비교하여 보안 또는 포트폴리오 의 변동성 또는 체계적 위험 을 측정한 것입니다. 베타가 1.0보다 높은 주식은 S&P 500보다 변동성이 더 큰 것으로 해석할 수 있습니다.
  - circulating_supply : 유통량
  - market_cap : 총시가
  - ath : ALL TIME HIGH 가장 높았던 가격
  - hardware-wallet : 하드웨어 지갑(월렛)이란 콜드 월렛이라고도 부르며, 간단히 말해 플래시 드라이브 타입의 기기와 같은 하드웨어 형식의 암호화폐 지갑으로 오프라인으로 암호화폐 자금과 NFT를 보관할 수 있는 지갑입니다. 하드웨어 지갑의 예시로는 렛져(Ledger)와 트레저(Trezor)가 있습니다.

- ~~searchInput 유효성검사하기~~
- searchlist onBlur와 리스트 클릭의 문제
- logo 이미지 유틸 함수 서버에러응답처리
- link state 보내기
- css 규칙에 맞게 작성
- 스타일드 컴포넌트 모두 네이밍 다시 작성

- 애니메이션
  - 네비게이션 바 - 이름호버
  - 로딩
  -

https://api.coinpaprika.com/v1/tickers?quotes=USD
