import ApiClient from "./apiclient";

export default class ItemsClient {
    /**
     * @param {ApiClient} client
     */
    constructor(client){
        this.client = client;
    }

    get(id) {
        return this.client._get("items/" + id);
    }

    /**@returns {Promise<Array>} */
    getBySubjectId(subjectId){
        return this.client._get("items/ofSubject/" + subjectId);
    }

    async post(data){
        if (!this.client.authorized){
            this.client.onUnauthorized();
            return null;
        }

        console.log(this.client);

        const response = await fetch(this.client.baseUrl + "items/", {
            method: "post", 
            body: data,
            headers: {
                authorization: this.client.token
            }
        });

        if (!response.ok){
            throw new Error(await response.json);
        }

        return await response.json();
    }

    completedTasks(){
        return this.client._get("items/getCompleted");
    }

    ownTasks(){
        return this.client._get("items/getOwn");
    }
}