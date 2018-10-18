export class User {
    username: String;
    id: String;
    votedCats: [{
        vote: Boolean;
        idCat : String;
    }];
    email: String;
}
