import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const codeString = `
document.getElementById('color-picker').addEventListener('color-change', (event) => {
  console.log(event.detail.color);
});
  `;

  return (
    <div className="container">
      <div className="information">
        <div className="information-title">Ink<span>Select</span> </div>
        <br />
        <div className="information-content">
          A lightweight and elegant JavaScript color picker. Written in vanilla ES6, no dependencies. Accessible.
        </div>
      </div>

      <br/>

      <div className="container-">
        <div className="features-container">
          <h2>Features</h2>
          <ul>
            <li>Zero dependencies</li>
            <li>Very easy to use</li>
            <li>Customizable</li>
            <li>Touch support</li>
            <li>Fully accessible</li>
          </ul>
        </div>

        <div className="getting-started-container">
          <h2>Getting Started</h2>
          <h3>Basic usage</h3>
          <p>Add the script below your page:</p>

          <div className="highlight">
            <pre>
              <code>
                &lt;script src="coloris.min.js"&gt;&lt;/script&gt;
              </code>
            </pre>
          </div>

          <p>Then just add the data-coloris attribute to your input fields:</p>

          <div className="highlight">
            <pre>
              <code>
                &lt;input type="text" data-coloris id="coloris"/&gt;
              </code>
            </pre>
          </div>

          <p>That’s it. All done!</p>
          <br/>

          <h3>How to get color value</h3>
          <p>Add this script to read selected color:</p>

          <div className="highlight">
            <pre>
              <code>
                {codeString}
              </code>
            </pre>
          </div>

        </div>

        <div className="contributing-container">
          <h2>Contributing</h2>
          <p>If you find a bug or would like to implement a missing feature, please create an issue first before submitting a pull request (PR).</p>
          <p>When submitting a PR, please do not include the changes to the dist directory in your commits.</p>
          
        </div>
      </div>

      <div className="information-footer">
        <p>Published with <Link to="/https://pages.github.com/">GitHub Pages</Link></p>
      </div>
    </div>
  );
};

export default Home;