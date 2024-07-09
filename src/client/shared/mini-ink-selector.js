/**
 * @typedef { Object } TargetHud
 * @property { string } BackgroundColor
 * @property { string } BorderColor
 * @property { string } TextColor
 */

/**
 * @typedef { Object } PalletHud
 * @property { string } BackgroundColor
 * @property { string } BorderColor
 */

/**
 * @typedef { Object } Config;
 * @property { string } TargetElement
 * @property { 'HEX' | 'RGB'  } Format
 * @property { Array<string> } pallet_colors
 * @property { TargetHud } target_hud
 * @property { PalletHud } pallet_hud
 */

class MiniInkSelector extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.settings = {
      TargetElement: "input",
      Format: "HEX",
      pallet_colors: ["#000", "#FFFF"],
      target_hud: {
        BackgroundColor: "#000",
        BorderColor: "#adadad",
        TextColor: "#FFF",
      },
      pallet_hud: {
        BackgroundColor: "#adadad",
        BorderColor: "#FFF",
      },
    };

    // Creating styling and base container element
    this.styleElement = document.createElement("style");
    this.container = document.createElement("div");
    this.container.classList.add("color-picker");

    // Appending style and base container to shadow DOM
    this.shadow.appendChild(this.styleElement);
    this.shadow.appendChild(this.container);

    // Bind event handler
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
  }

  connectedCallback() {
    document.addEventListener("click", this.handleOutsideClick);
  }

  disconnectedCallback() {
    document.removeEventListener("click", this.handleOutsideClick);
  }

  handleOutsideClick(event) {
    if (!this.contains(event.target)) {
      const panel_container = this.shadow.querySelector(".panel-container");
      if (panel_container) {
        panel_container.style.display = "none";
      }
    }
  }

  createInputElement() {
    const input_container = document.createElement("div");
    input_container.classList.add("input-controller");

    const _toggle = document.createElement("button");
    _toggle.classList.add("input-button");

    const _text = document.createElement("input");
    _text.classList.add("input-text");
    _text.value = this.applyFormatConfig(
      this.config.Format,
      this.config.pallet_colors[0]
    );
    _text.type = "text";

    input_container.appendChild(_toggle);
    if (String(this.config.TargetElement).toLowerCase() === "input")
      input_container.appendChild(_text);

    this.container.appendChild(input_container);
    return { _toggle, _text };
  }

  createPanelElement(_toggle, _text) {
    const panel_container = document.createElement("div");
    panel_container.classList.add("panel-container");
    panel_container.style.display = "none";

    this.config.pallet_colors.forEach((detail) => {
      const color = this.applyFormatConfig(this.config.Format, detail);

      const pallet_color = document.createElement("button");
      pallet_color.classList.add("panel-button");
      pallet_color.style.background = color;

      pallet_color.addEventListener("click", () => {
        _toggle.style.background = color;
        _text.value = color;
        this.dispatchEvent(
          new CustomEvent("color-change", { detail: { color } })
        );
      });

      panel_container.appendChild(pallet_color);
    });

    _toggle.addEventListener("click", () => {
      panel_container.style.display =
        panel_container.style.display === "none" ||
        panel_container.style.display === ""
          ? "flex"
          : "none";
    });

    this.container.appendChild(panel_container);
  }

  /**
   * @param { Config } configuration
   */

  set config(configuration) {
    // Saving configuration
    Object.assign(this, Object.assign({}, this.settings, configuration));

    // Applying styles
    this.styleElement.textContent = this.applyStylesConfig();

    // Creating input element
    const { _toggle, _text } = this.createInputElement();

    // Creating colors panel
    this.createPanelElement(_toggle, _text);
  }

  get config() {
    return this;
  }

  applyFormatConfig = (config, value) => {
    switch (config) {
      case "HEX": {
        const match = String(value).match(
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/
        );
        if (match) {
          const r = parseInt(match[1]),
            g = parseInt(match[2]),
            b = parseInt(match[3]);

          if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
            const hexString =
              "#" +
              ("0" + r.toString(16)).slice(-2).toUpperCase() +
              ("0" + g.toString(16)).slice(-2).toUpperCase() +
              ("0" + b.toString(16)).slice(-2).toUpperCase();
            return hexString;
          }
        } else {
          return value;
        }
      }
      case "RGB": {
        if (String(value).match("^#([A-Fa-f0-9]{6})$")) {
          const hex_ = String(value).replace("#", ""),
            r = parseInt(hex_.substring(0, 2), 16),
            g = parseInt(hex_.substring(2, 4), 16),
            b = parseInt(hex_.substring(4, 6), 16);

          return "rgb(" + r + "," + g + "," + b + ")";
        } else {
          return value;
        }
      }
    }
  };

  applyStylesConfig = () => {
    return `
              .color-picker {
                  width: 160px;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  position: relative;
              }
              .input-controller {
                  display: flex;
                  align-items: center;
                  background: ${this.config.target_hud.BackgroundColor};
                  border-radius: 7px;
                  border: 1.5px solid ${this.config.target_hud.BorderColor};
                  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
              }
              .input-button {
                  width: 25px;
                  height: 25px;
                  border: none;
                  background: ${this.config.pallet_colors[0]};
                  border-radius:  ${
                    this.config.TargetElement === "input"
                      ? "5px 0px 0px 5px"
                      : "5px"
                  };
                  cursor: pointer;
                  border-right: ${
                    this.config.TargetElement === "input"
                      ? `1.5px solid ${this.config.target_hud.BorderColor};`
                      : "none"
                  }
              }
              .input-text {
                  width: 125px;
                  padding-left: 5px;
                  background: ${this.config.target_hud.BackgroundColor};
                  border: none;
                  color: ${this.config.target_hud.TextColor};
                  outline: none;
                  font-family: "Lekton", monospace;
                  font-size: 14px;
                  border-radius: 5px;
              }
              .panel-container {
                  display: flex;
                  flex-wrap: wrap;
                  gap: 5px;
                  width: 100%;
                  max-width: 147px;
                  background: ${this.config.pallet_hud.BackgroundColor};
                  margin-top: 10px;
                  border-radius: 7px;
                  border: 1.5px solid ${this.config.pallet_hud.BorderColor};
                  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
                  display: none;
                  padding: 5px;
                  justify-content: flex-start;
              }
              .panel-button {
                  width: 25px;
                  height: 25px;
                  border-radius: 5px;
                  cursor: pointer;
                  border: 1px solid ${this.config.pallet_hud.BorderColor};
              }
          `;
  };
}

customElements.define("ink-select", MiniInkSelector);
