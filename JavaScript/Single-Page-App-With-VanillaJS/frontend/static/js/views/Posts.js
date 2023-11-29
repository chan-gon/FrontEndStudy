/**
 * VSCODE 사용 시 자동완성을 통해 코드를 완성하면 import AbstractView from "./AbstractView 형태가 되는데,
 * from "./AbstractView.js 형태로 반드시 .js 까지 붙여 주어야 한다.
 */
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Posts");
    }

    async getHtml() {
        return `
            <h1>Posts</h1>
            <p>You are viewing the posts!</p>
        `;
    }
}