
const totalNoiseSlider = document.getElementById("totalNoiseSlider");
const totalNoiseValue = document.getElementById("totalNoiseValue");
totalNoiseValue.innerHTML = totalNoiseSlider.value;
totalNoiseSlider.oninput = function() {
  totalNoiseValue.innerHTML = this.value;
}

const persistenceSlider = document.getElementById("persistenceSlider");
const persistenceValue = document.getElementById("persistenceValue");
persistenceValue.innerHTML = persistenceSlider.value;
persistenceSlider.oninput = function() {
  persistenceValue.innerHTML = this.value;
}

const octaveCountSlider = document.getElementById("octaveCountSlider");
const octaveCountValue = document.getElementById("octaveCountValue");
octaveCountValue.innerHTML = octaveCountSlider.value;
octaveCountSlider.oninput = function() {
  octaveCountValue.innerHTML = this.value;
}

const seedSlider = document.getElementById("seedSlider");
const seedValue = document.getElementById("seedValue");
seedValue.innerHTML = seedSlider.value;
seedSlider.oninput = function() {
  seedValue.innerHTML = this.value;
}

const randomizerSlider = document.getElementById("randomizerSlider");
const randomizerValue = document.getElementById("randomizerValue");
randomizerValue.innerHTML = randomizerSlider.value;
randomizerSlider.oninput = function() {
  randomizerValue.innerHTML = this.value;
}
