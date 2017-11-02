import Review from './Review';

export default function Product(id, name, value) {
    this.id = id;
    this.name = name;
    this.value = value;

    return {
        id: this.id,
        name: this.name,
        value: this.value,
        reviews: [new Review(this.id)]
    }
}