export default function User(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;

    return {
        username: this.username,
        password: this.password,
        email: this.email
    }
}