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

const hashxSlider = document.getElementById("hashxSlider");
const hashxValue = document.getElementById("hashxValue");
hashxValue.innerHTML = hashxSlider.value;
hashxSlider.oninput = function() {
  hashxValue.innerHTML = this.value;
}

const hashySlider = document.getElementById("hashySlider");
const hashyValue = document.getElementById("hashyValue");
hashyValue.innerHTML = hashySlider.value;
hashySlider.oninput = function() {
  hashyValue.innerHTML = this.value;
}

const hashzSlider = document.getElementById("hashzSlider");
const hashzValue = document.getElementById("hashzValue");
hashzValue.innerHTML = hashzSlider.value;
hashzSlider.oninput = function() {
  hashzValue.innerHTML = this.value;
}
