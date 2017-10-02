'use babel';
/** @jsx etch.dom */

const etch = require('etch')
const fs = require('fs')

export default class NoFrillsView {
    constructor (props) {
      this.uri = props.uri.replace("no-frills://", "")
      this.buffer = ""
      // TODO: Add support for more encodings.
      fs.readFile(this.uri, {"encoding": "utf-8"}, (err, data) => {
          this.update(this.uri, data)
      })

      // Wrap off by default.
      this.wrap = "no-wrap"

      // Required
      etch.initialize(this)
    }

    // Required: The `render` method returns a virtual DOM tree representing the
    // current state of the component. Etch will call `render` to build and update
    // the component's associated DOM element. Babel is instructed to call the
    // `etch.dom` helper in compiled JSX expressions by the `@jsx` pragma above.
    render () {
      return (
        <div class="no-frills-view">
          <textarea class="no-frills-buffer {this.wrap}" ref="buffer">{this.buffer}</textarea>
        </div>
      )
    }

    // Required: Update the component with new properties and children.
    update (uri, buffer = "") {
      this.uri = uri
      this.buffer = buffer

      // Required
      return etch.update(this)
    }

    getTitle () {
        return "No Frills: " + this.uri
    }

    getElement() {
        return this.element;
    }

    toggleWrap() {
        if (this.wrap == "no-wrap")
            this.wrap = "wrap"
        else
            this.wrap = "no-wrap"

        this.update(this.uri, this.buffer)
    }

    // Returns an object that can be retrieved when package is activated
    serialize() {
        return {
            uri: "no-frills://" + this.uri,
            // This is used to look up the deserializer function. It can be any string, but it needs to be unique across all packages!
            deserializer: "no-frills-opener"
        };
    }

    // Optional: Destroy the component. Async/await syntax is pretty but optional.
    async destroy () {
      // call etch.destroy to remove the element and destroy child components
      await etch.destroy(this)
      // then perform custom teardown logic here...
    }
}
