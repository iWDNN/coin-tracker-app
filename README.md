# coin-tracker-app

-

- Libaries

  - styled-components
  - react-router-dom # 6.4~
  - framer-motion
  - react-hook-form
  - react-query
  - recoil

    - createBrowserRouter
    - Link : 특정 조건 없이 클릭해서 보내는 링크
    - useNavigate : 유저가 로그인하여 리다이렉트해야 할 경우는, 어떤 페이지에 접근햇는데 권한이 없어서 이동시킬 때
    - useParams : 주소 파라미터 값 가져오는 훅
    - outlet: 스크린 하나당 자식을 보여줄 경우
    - useOutletContext : outlet으로 보낸 데이터
    - url을 통해서 작업을 하는 이유 : 새로고침 했을 경우 유저가 그자리에서 시작될수 있게 만들어 주는 편의성

- api link

  - 코인전체 : https://api.coinpaprika.com/v1/coins
  - ~~코인아이콘 : https://cryptoicon-api.vercel.app/api/icon/{코인심볼} api server down~~
  - 코인아이콘 : https://cryptocurrencyliveprices.com/img/${coin.symbol.toLowerCase()}.png
  - 코인정보 : https://api.coinpaprika.com/v1/coins/{coinId}
  - 코인가격 : https://api.coinpaprika.com/v1/tickers/{coinId}

- 루트 스크린

  - 네비게이션 바

    - 홈 라우터
    - 크립토 라우터
      - 베스트 크립토
      - 변동폭?
      - 거래량?

  - 홈 스크린

    - 검색창
      - 메인창에서 react-query로 데이터 받아오기. (캐시 저장)
      - 받아온 데이터로. 검색 regExp로 해야할듯 3글자 이상부터 검색..?

  - 검색 결과 스크린

  - 크립토 스크린
