class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}

class PokemonDetails {
    constructor(name, height, weight, species, photo) {
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.species = species;
    this.photo = photo;
}
}