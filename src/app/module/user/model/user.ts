export class User {
    public id          : number;
    public firstName   : string;
    public lastName    : string;
    public avatarName  : string;
    public pseudo      : string;
    public email       : string;

    public static firstNamePattern = "^[a-zA-Z]{2,49}$";
    public static lastNamePattern = "^[a-zA-Z]{2}[a-zA-Z ]{0,47}$";
    public static pseudoPattern = "^[a-zA-Z]{2,49}$";
    public static emailPattern = "^[a-zA-Z0-9._-]{2,}@[a-z0-9._-]{2,}.[a-z]{2,4}$";
    public static passwordPattern = "^[a-zA-z0-9]{8,49}$";

    constructor(id?: number, firstName?: string, lastName?: string, pseudo?: string, email?: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.pseudo = pseudo;
        this.email = email;
    }

    public static checkPseudo(pseudo: string): boolean {
        var regexp = new RegExp(User.pseudoPattern);
		return regexp.test(pseudo);
    }

    public static checkPassword(password: string): boolean {
        var regexp = new RegExp(User.passwordPattern);
		return regexp.test(password);
	}
}
