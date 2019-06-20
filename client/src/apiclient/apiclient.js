import SubjectsClient from './subjects';
import ItemsClient from './items';

function forgetUser() {
    localStorage.removeItem("accesstoken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
}

export default class ApiClient {
    constructor(settings) {
        console.log("new apiclient");
        this.settings = settings || require('../settings');
        this.token = localStorage.getItem("accesstoken");
        this.baseUrl = this.settings.baseUrl;
        this.subjects = new SubjectsClient(this);
        this.items = new ItemsClient(this);
        this.user = {
            id: localStorage.getItem("userId"),
            email: localStorage.getItem("userEmail"),
            role: localStorage.getItem("userRole")
        }
    }

    onUnauthorized() { }

    onAuthorized() { }

    authorized() { return this.token != null }

    async login(email, password, rememberMe = false) {
        const response = await fetch(this.baseUrl + "login/", {
            method: "post",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(await response.json());
        }

        const data = await response.json();

        if (!data.token)
            throw new Error("Failed to receive access token");

        this.token = data.token;
        this.user = { id: data.user.id, email: data.user.email, role: data.user.role };
        if (rememberMe) {
            localStorage.setItem("accesstoken", data.token);
            localStorage.setItem("userId", data.user.id);
            localStorage.setItem("userEmail", data.user.email);
            localStorage.setItem("userRole", data.user.role);
        } else {
            forgetUser();
        }

        console.log([data, this.token, this.user]);
        this.onAuthorized();
    }

    logout() {
        forgetUser();
        this.token = null;
        this.user.id = this.user.email = this.user.role = null;
    }

    async register(user) {
        const response = await fetch(this.baseUrl + "user/", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(await response.json());
        }

        return await response.json();
    }

    async _request(url, method, body) {
        if (!this.authorized) {
            this.onUnauthorized();
            return null;
        }

        const response = await fetch(this.baseUrl + url, {
            method,
            body,
            headers: {
                "Content-Type": "application/json",
                authorization: this.token
            }
        });

        if (!response.ok) {
            throw new Error(await response.json);
        }

        return await response.json();
    }

    _get(url) { return this._request(url, "GET"); }
    _post(url, body) { return this._request(url, "POST", body); }
    _patch(url, body) { return this._request(url, "PATCH", body); }
    _delete(url, body) { return this._request(url, "DELETE", body); }
}