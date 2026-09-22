/**
 * ============================================================
 *  청첩장 설정 파일 (CONFIG)
 *  ------------------------------------------------------------
 *  이 파일에 있는 값만 바꾸면 청첩장 내용이 전부 바뀝니다.
 *  index.html / app.js / style.css 는 건드릴 필요 없습니다.
 *  전화번호·계좌번호처럼 민감한 정보도 여기 그대로 적으시면 됩니다
 *  (공개 저장소에 노출되는 점은 감수하기로 하신 내용 그대로 반영).
 * ============================================================
 */
window.CONFIG = {

  // ---------- 신랑/신부 ----------
  groom: {
    name: "〈신랑이름〉",
    phone: "〈신랑 전화번호〉", // 예: 010-1234-5678
  },
  bride: {
    name: "〈신부이름〉",
    phone: "〈신부 전화번호〉",
  },

  // ---------- 양가 부모님 ----------
  groomFather: { name: "〈신랑아버지〉", phone: "〈신랑아버지 전화번호〉" },
  groomMother: { name: "〈신랑어머니〉", phone: "〈신랑어머니 전화번호〉" },
  groomOrder: "장남", // 장남/차남/삼남 등

  brideFather: { name: "〈신부아버지〉", phone: "〈신부아버지 전화번호〉" },
  brideMother: { name: "〈신부어머니〉", phone: "〈신부어머니 전화번호〉" },
  brideOrder: "차녀", // 장녀/차녀/삼녀 등

  // ---------- 예식 일시 ----------
  // ISO 8601, 반드시 +09:00(한국시간) 유지
  weddingDateISO: "2026-12-12T12:00:00+09:00",
  weddingTimeLabel: "12:00 PM", // 히어로/the day 섹션에 표시되는 문구

  // ---------- 예식장 ----------
  venue: {
    name: "아젠토피오레 컨벤션",
    address: "제주특별자치도 제주시 서광로 112",
    hallInfo: "〈층·홀 정보〉", // 예: 3층 그랜드홀
    cityLabelEn: "Jeju", // 히어로 우측 상단 영문 지명
  },

  // ---------- 지도 ----------
  // 네이버/카카오 지도 "공유 > 퍼가기" iframe 주소를 넣으면 인터랙티브 지도로 전환됩니다.
  // 비워두면 map.jpg 자리표시자가 표시됩니다.
  mapEmbedUrl: "",
  kakaoMapLink: "", // 카카오맵 길찾기 URL
  naverMapLink: "", // 네이버지도 길찾기 URL
  parkingInfo: "〈주차 안내 문구를 입력하세요〉",
  transitInfo: "〈대중교통 안내 문구를 입력하세요〉",

  // ---------- 계좌번호 ----------
  accounts: {
    groom: [
      { bank: "〈은행명〉", number: "〈계좌번호〉", holder: "〈예금주〉" },
    ],
    bride: [
      { bank: "〈은행명〉", number: "〈계좌번호〉", holder: "〈예금주〉" },
    ],
  },

  // ---------- 사진 / 사운드 ----------
  // true로 바꾸면 아래 파일들을 실제로 불러옵니다. 파일은 /assets 폴더에 넣어주세요.
  photosReady: false,
  images: {
    hero: "assets/hero.jpg",
    middle: "assets/middle.jpg",
    gallery: ["assets/gallery-1.jpg", "assets/gallery-2.jpg", "assets/gallery-3.jpg"],
    map: "assets/map.jpg",
    filmFrame: "assets/film-frame.png", // 검은 35mm 필름 프레임 투명 PNG
    asterisk: "assets/asterisk.png",    // 버건디 별표 투명 PNG
    paperTexture: "assets/paper-texture.jpg", // 종이 질감 배경 (없어도 무방)
  },
  bgmFile: "assets/bgm.mp3",

  // ---------- Firebase (방명록) ----------
  // Firebase 콘솔 > 프로젝트 설정 > 일반 > 내 앱 에서 그대로 복사해 넣으세요.
  // 프로젝트: dongyun-gahyeon-wedding (기존에 만들어두신 프로젝트 재사용)
  firebase: {
    apiKey: "〈FIREBASE_API_KEY〉",
    authDomain: "〈PROJECT_ID〉.firebaseapp.com",
    projectId: "〈PROJECT_ID〉",
    storageBucket: "〈PROJECT_ID〉.appspot.com",
    messagingSenderId: "〈SENDER_ID〉",
    appId: "〈APP_ID〉",
  },
  guestbookCollection: "guestbook_messages",
};
