# clone_kurly_backend
🖥 kurly clone backend repository
```jsx
$ npm init -y  // package.json 설치
```

```jsx
$ npm install express // Express 설치
```

```jsx
$ npm install nodemon  # global install
```

```jsx
$ npm start // 서버 실행

// 여기서 서버 종료 없이 실행하려면 실행중인 터미널에 'rs' 입력

```

## 패키지 설치

```jsx
$ npm install cors // cors 설치
$ npm install dotenv // dotenv 설치
$ npm install morgan // morgan 설치
```

## TyoeORM & MySQL 연동

```jsx
$ npm install typeorm      # typeorm 설치 명령어
```

### 해결 안될 시 방법

```jsx
$ npm uninstall typeorm    # typeorm 삭제
$ npm install mysql        # mysql 설치
$ npm install mysql2       # mysql2 설치
$ npm install typeorm    # typeorm 설치
```

---

## DB 연동 & dbmate 설치

dbmate 설치시 `bash : command not found` 에러가 발생할 수 있음.

```jsx
$ npm install -g dbmate // -g 옵션을 통해 설치 해야지 테이블 마이그레이션이 가능
```

### 테이블 생성 명령어

```jsx
$ dbmate new 테이블명 // 해당 테이블이 생성됨
$ dbmate up //해당 테이블이 등록

```
