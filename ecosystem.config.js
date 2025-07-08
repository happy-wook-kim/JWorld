module.exports = {
  apps: [{
    name: 'jworld',              // PM2에서 표시될 앱 이름
    script: 'npm',               // 실행할 스크립트 (npm 명령어 사용)
    args: 'start',               // npm start 실행
    cwd: './',                   // 작업 디렉토리 (현재 폴더)
    instances: 1,                // 실행할 인스턴스 수 (1개)
    autorestart: true,           // 앱 크래시 시 자동 재시작
    watch: false,                // 파일 변경 감지 및 자동 재시작 (개발용)
    max_memory_restart: '1G',    // 메모리 사용량이 1GB 초과 시 재시작
    env: {
      NODE_ENV: 'production',    // 프로덕션 환경 설정
      PORT: 3000                 // 서버 포트 번호
    }
  }]
}
