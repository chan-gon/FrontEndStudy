/**
 * VSCODE 사용 시 자동완성을 통해 코드를 완성하면 import Dashboard from "./views/Dashboard" 형태가 되는데,
 * from "./views/Dashboard.js 형태로 반드시 .js 까지 붙여 주어야 한다.
 */
import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

const nativateTo = url => {
    /**
     * pushState() 함수는 실제 페이지를 로드하지 않음
     * 특정 상태를 주입하는 개념
     * 따라서 아래 함수는 특정 url 상태를 주입하는 것임
     */
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/settings", view: Settings },
    ];

    // 상단에 정의한 routes 배열의 객체 중에서 클라이언트가 주소창에 입력한 것과 동일한 객체 찾기
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        }
    });

    // potentialMatches 배열 객체 중에서 특정 조건을 만족하는 객체 찾기
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    // 클라이언트 입력 url 주소가 조건을 만족하지 않는 경우(match is false) "/"경로(routes[0])로 이동
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    // creating a new instance of the view at the matched route
    const view = new match.route.view();

    // injecting HTML in the tag with an id 'app'
    document.querySelector("#app").innerHTML = await view.getHtml();
};

// 사용자 세션 기록을 탐색하여 현재 상태가 바뀌었을 때 router 재실행
// 이를 통해 뒤로, 앞으로가기를 했을 때도 올바른 상태가 따라온다
window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    // index.html 페이지의 a 태그 링크를 클릭하여 해당 태그에 data-link 속성이 있다면
    document.body.addEventListener("click", e => {
    if (e.target.matches("[data-link")) {
        // 기본 동작 제거(링크 호출, 즉 페이지 refresh 되면서 페이지 호출되는 기본 동작 제거)
            e.preventDefault();
            // 클릭한 태그의 href 속성값을 인자로 사용
            nativateTo(e.target.href);
        }
    });

    router();
});