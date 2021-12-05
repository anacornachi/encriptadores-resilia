const base64 = document.querySelector("[data-base64]");
const cesar = document.querySelector("[data-cesar]");

const sectionConfig = document.querySelector("[data-section-config]");
const configOptions = document.querySelector("[data-config-options]");

function generateConfigFields() {
  const typeOfEncoder = document.querySelector(
    'input[name="type-of-encoder"]:checked'
  ).value;

  if (typeOfEncoder == "cifra-de-cesar") {
    configOptions.innerHTML = `<label for="shift">Insira o número do pulo:</label>
    <input type="number" id="shift" class="shift-input" data-shift /> 
    <h3 class="main--description">O que você deseja fazer?</h3>
    <div class="config--option">
    <input type="radio" id="encode" name="encodeOrDecode" value="encode" checked data-encode />
    <label for="encode" style="width: 25%" >Codificar</label>
    <input type="radio" id="decode" name="encodeOrDecode" value="decode" data-code />
    <label for="decode" style="width: 25%">Decodificar</label>
    </div>
    <button type="submit" data-action-button onclick="handleClickCesar(event, encodeOrDecode.value)">Codificar!</button>`;
  } else {
    configOptions.innerHTML = `
    <h3 class="main--description">O que você deseja fazer?</h3>
    <div class="config--option">
    <input type="radio" id="encode" name="encodeOrDecode" value="encode" checked data-encode />
    <label for="encode" style="width: 25%" >Codificar</label>
    <input type="radio" id="decode" name="encodeOrDecode" value="decode" data-code />
    <label for="decode" style="width: 25%">Decodificar</label>
    </div>
    <button type="submit" data-action-button onclick="handleClick64(event, encodeOrDecode.value)">Codificar!</button>`;
  }

  const encodeOrDecode = document.querySelectorAll(
    'input[name="encodeOrDecode"]'
  );

  encodeOrDecode.forEach((radio) =>
    radio.addEventListener("change", () => {
      const actionButton = document.querySelector("[data-action-button]");
      if (radio.value == "decode") {
        return (actionButton.innerHTML = "Decodificar!");
      } else {
        return (actionButton.innerHTML = "Codificar!");
      }
    })
  );
}

function handleClickCesar(event, encodeOrDecode) {
  event.preventDefault();
  let shift = document.querySelector("[data-shift]").value;
  const inputText = document.querySelector("[data-input-text]").value;

  while (shift > 25) {
    shift = shift - 25;
  }
  textToAscii(inputText, shift, encodeOrDecode);
}

function textToAscii(text, shift, option) {
  const words = text.split(" ");
  const asciiArray = words.map((word) =>
    word.split("").map((item) => String(item).charCodeAt(0))
  );

  if (option == "encode") {
    encode(asciiArray, shift);
  } else if (option == "decode") {
    decode(asciiArray, shift);
  }
}

function encode(asciiCode, shift) {
  const asciiWithShift = asciiCode.map((char) =>
    char.map((item) => Number(item) + Number(shift))
  );
  const outputText = asciiWithShift
    .map((element) =>
      element.map((number) => String.fromCharCode(number)).join("")
    )
    .join(" ");
  renderOutput(outputText);
}

function decode(asciiCode, shift) {
  const asciiWithShift = asciiCode.map((char) =>
    char.map((item) => Number(item) - Number(shift))
  );
  const outputText = asciiWithShift
    .map((element) =>
      element.map((number) => String.fromCharCode(number)).join("")
    )
    .join(" ");
  renderOutput(outputText);
}

function renderOutput(text) {
  const outputArea = document.querySelector("[data-output-text]");
  outputArea.innerHTML = `${text}`;
}

function handleClick64(event, encodeOrDecode) {
  event.preventDefault();
  const inputText = document.querySelector("[data-input-text]").value;

  if (encodeOrDecode == "encode") {
    encode64(inputText);
  } else {
    decode64(inputText);
  }
}

function encode64(text) {
  const encodedText = btoa(text);
  renderOutput(encodedText);
}

function decode64(text) {
  const decodedText = atob(text);
  renderOutput(decodedText);
}
