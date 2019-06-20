import ApiClient from "./apiclient";

export default class SubjectsClient {
    /**
     * @param {ApiClient} client
     */
    constructor(client){
        this.client = client;
    }

    /**
     * 
     * @param {*} id 
     * @returns {Promise<Array>}
     */
    get(id) {
        return id === undefined 
            ? this.client._get("subjects/")
            : this.client._get("subjects/" + id);
    }

    post(subject){
        return this.client._post("subjects/", JSON.stringify(subject));
    }

    patch(subject){
        return this.client._patch("subjects/" + subject._id, JSON.stringify(subject));
    }

    delete(subject){
        return this.client._delete("subjects/" + subject._id);
    }
}