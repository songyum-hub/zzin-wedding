# 모바일 청첩장

순수 HTML/CSS/JS 정적 사이트입니다. 빌드 과정이 없어서 GitHub Pages에 그대로 올리면 됩니다.

## 1. 내용 수정하기

**`js/config.js` 파일 하나만 수정하면 됩니다.**
신랑/신부 이름, 양가 부모님 이름·전화번호, 예식 일시, 예식장 정보, 계좌번호, 지도 링크 등
모든 내용이 이 파일 안에 있습니다. `index.html`이나 `app.js`는 건드릴 필요 없습니다.

## 2. 사진·음악 넣기

`assets/` 폴더를 만들고 아래 파일들을 넣은 뒤, `config.js`의 `photosReady`를 `true`로 바꾸세요.

- `hero.jpg`, `middle.jpg`, `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg`, `map.jpg`
- `film-frame.png` (검은 35mm 필름 프레임 투명 PNG)
- `asterisk.png` (버건디 별표 투명 PNG)
- `paper-texture.jpg` (배경 종이 질감, 없어도 무방)
- `bgm.mp3` (배경음악)

## 3. 방명록용 Firebase 연결하기

기존에 만들어두신 `dongyun-gahyeon-wedding` Firebase 프로젝트를 그대로 씁니다.

1. [Firebase 콘솔](https://console.firebase.google.com) → 해당 프로젝트 → **빌드 > Firestore Database** → 데이터베이스 생성 (없다면).
2. **Firestore 규칙**을 아래처럼 설정 (누구나 읽기/쓰기 가능, 글자 수 제한):

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /guestbook_messages/{id} {
         allow read: if true;
         allow create: if request.resource.data.author is string
           && request.resource.data.author.size() <= 30
           && request.resource.data.content is string
           && request.resource.data.content.size() <= 300
           && request.resource.data.color_index is int
           && request.resource.data.color_index >= 0
           && request.resource.data.color_index <= 5;
         allow update, delete: if false;
       }
     }
   }
   ```

3. **프로젝트 설정 > 일반 > 내 앱**에서 웹 앱을 추가(또는 기존 앱 선택)하고, `firebaseConfig` 값을
   `js/config.js`의 `firebase: { ... }` 항목에 그대로 복사해 넣으세요.

방명록은 값이 채워지기 전까지는 "설정을 먼저 채워주세요" 토스트만 뜨고, 나머지 기능은 정상 작동합니다.

## 4. GitHub Pages로 배포하기

1. `songyum-hub/wedding2026` 저장소에 이 폴더의 파일 전체를 커밋·푸시합니다.
2. 저장소 **Settings > Pages**에서 브랜치를 `main`(또는 사용 중인 브랜치), 폴더를 `/ (root)`로 지정합니다.
3. 몇 분 후 `https://songyum-hub.github.io/wedding2026/`에서 확인할 수 있습니다.

## 주의

- 계좌번호·전화번호 등 민감정보가 `config.js`에 평문으로 들어가며, 공개 저장소라면 그대로 노출됩니다.
- 지도는 `config.js`의 `mapEmbedUrl`에 네이버/카카오 지도 "퍼가기" iframe 주소를 넣으면 자동으로 인터랙티브 지도로 바뀝니다.
