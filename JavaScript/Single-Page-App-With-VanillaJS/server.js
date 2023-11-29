const express = require("express");
const path = require("path");

const app = express();

/*
    app.use() 앱이 요청을 수신할 때마다 매번 실행되는 미들웨어 설정
    /static => /frontend/static
*/
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

// 모든 요청은 frontend/index.html로 이동
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT || 9090, () => console.log("Server running.."));