import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const Home = () => {
  const [ color, setColor ] = useState('#FF7474');
  const events = [
    { id: 0, name: 'ink:select' , description: 'The selected color has changed' }
  ]

  return (
    <div className="container">
      <div className="information">
        
        <div className="information-title">
          Ink<span style={{ color: color }}>Select</span> 
          
        </div>
        <br />
        <br />
        <div className="information-content">
          A lightweight and elegant JavaScript color picker. Written in vanilla ES6, no dependencies. Accessible.
        </div>
      </div>

      <br/>

      <div className="container-">
        <div className="overview-container">
          <h2>Overview</h2>
          <p>The JavaScript Color Picker control allows you to pick colors either by selecting them from the color picker container or by adjusting the hue and opacity. It supports inline mode, palette customization, and localization for seamless integration into forms.</p>
          <br/> 
          <div className="overview-testing">
            
          </div>
        </div>

        <div className="getting-started-container">
          <h2>Getting Started</h2>
          <h3>Basic usage</h3>
          <p>Import this script to your page:</p>

          <div className="highlight">
            <pre>
              <SyntaxHighlighter language="javascript"  showLineNumbers>
                { `<script src="https://ink-selector.vercel.app/ink/mini-ink-selector"></script>` }
              </SyntaxHighlighter>
            </pre>
          </div>

          <p>Then just add the inkSelect tag to your page:</p>

          <div className="highlight">
            <pre>
              <SyntaxHighlighter language="javascript"  showLineNumbers>
                { `<ink-select><ink-select/>` }
              </SyntaxHighlighter>
            </pre>
          </div>

          <p>That’s it. All done!</p>
          <br/>

          <h3>Customizing the color picker</h3>
          <p>The ink selector can be configured by calling Ink() and passing an options object to it. For example:</p>

          <div className="highlight">
            <pre>
            <SyntaxHighlighter language="javascript"  showLineNumbers>
              { `Ink({
  // Set the theme to light or dark mode:
  // * light: light mode (default).
  // * dark: dark mode.
  // * auto: automatically enables dark mode when the user prefers a dark color scheme.
  theme: 'dark',

  // Set the preferred color string format:
  // * hex: outputs #RRGGBB or #RRGGBBAA (default).
  // * rgb: outputs rgb(R, G, B) or rgba(R, G, B, A).
  // * auto: defaults to hex.
  format: 'hex',

  // The border-radius in pixels.
  border_radius: 10,

  // The margin in pixels between the input fields and the color picker's dialog.
  margin: 2,

  // Enable or disable alpha support.
  // When disabled, it will strip the alpha value from the existing color string in all formats.
  alpha: true,

  // In inline mode, this is the default color that is set when the picker is initialized.
  defaultColor: '#000000',
  
  // Set to true to save automatically save the latest colors used in max 5.
  history: true
})` }
            </SyntaxHighlighter>
            </pre>
          </div>
          <br/>

          <h3>Events</h3>
          <p>The ink selector features a single event: color picking. This event allows clients to choose their desired color:</p>
          <div className="table_events">
            <table>
              <thead>
                <tr>
                  <th>Events</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id}>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br/>
          <p>Example of how to use this event, or how to get the color selected by client :</p>
          <div className="highlight">
            <pre>
            <SyntaxHighlighter language="javascript"  showLineNumbers>
                { `document.addEventListener('ink:select', event => { console.log('New color', event.color); });` }
              </SyntaxHighlighter>
            </pre>
          </div>

        </div>
      </div>

      <div className="information-footer">
        <p>InkSelect maintained by <Link to={'https://github.com/leandrMachado'}>leandrMachado</Link></p>
      </div>
    </div>
  );
};

export default Home;