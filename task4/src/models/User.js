export default function User(id, name) {
    this.id = id;
    this.name = name;

    return {
        id: this.id,
        name: this.name
    }
}