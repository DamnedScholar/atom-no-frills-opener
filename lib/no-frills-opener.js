'use babel';

import NoFrillsView from './no-frills-opener-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {
  subscriptions: null,
  tabs: [],
  opener: false,

  activate() {
    if (this.opener == false)
        this.registerOpener()

    this.subscriptions = new CompositeDisposable(
      // Register command that toggles this view
      atom.commands.add('atom-workspace', {
        'no-frills-opener:open': (e) => {
            path = "no-frills://" +  e.target.attributes.getNamedItem('data-path').value
            // `.open()` returns a Promise, so we assign its value to the global tabs value. This will keep track of open tabs for serialization.
            atom.workspace.open(path).then( (t) => {
                this.tabs.push(t.uri)
            })
        }
      }),
      // Destroy any open views when the package is deactivated.
      new Disposable(() => {
        atom.workspace.getPaneItems().forEach(item => {
          if (item instanceof NoFrillsView) {
            item.destroy();
          }
        });
      }),
      // Re-implementing basic editor commands
      // TODO: Copy, paste, cut, save, toggle-wrap.
      atom.commands.add('.no-frills-view', "no-frills-opener:backspace", (e) => {
          t = atom.workspace.getActivePane().activeItem.element.firstChild
          begin = t.selectionStart
          end = t.selectionEnd

          if (begin == end) {
              t.value = t.value.substr(0, begin - 1) + t.value.substr(end)
              t.selectionStart = begin - 1
              t.selectionEnd = begin - 1
          }
          else {
              t.value = t.value.substr(0, begin) + t.value.substr(end)
              t.selectionStart = begin
              t.selectionEnd = begin
          }
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:delete", (e) => {
          t = atom.workspace.getActivePane().activeItem.element.firstChild
          begin = t.selectionStart
          end = t.selectionEnd

          if (begin == end) {
              t.value = t.value.substr(0, begin) + t.value.substr(end + 1)
              t.selectionStart = begin
              t.selectionEnd = begin
          }
          else {
              t.value = t.value.substr(0, begin) + t.value.substr(end)
              t.selectionStart = begin
              t.selectionEnd = begin
          }
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:up", (e) => {
          t = atom.workspace.getActivePane().activeItem.element.firstChild
          begin = t.selectionStart
          end = t.selectionEnd

          if (begin == end) {
          }
          else {

          }
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:down", (e) => {

      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:left", (e) => {
          t = atom.workspace.getActivePane().activeItem.element.firstChild
          begin = t.selectionStart
          end = t.selectionEnd

          if (begin == end) {
              t.selectionStart = begin - 1
              t.selectionEnd = begin - 1
          }
          else {

          }
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:right", (e) => {
          t = atom.workspace.getActivePane().activeItem.element.firstChild
          begin = t.selectionStart
          end = t.selectionEnd

          if (begin == end) {
              t.selectionStart = begin + 1
              t.selectionEnd = begin + 1
          }
          else {

          }
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:select-up", (e) => {
          t = atom.workspace.getActivePane().activeItem.element.firstChild
          begin = t.selectionStart
          end = t.selectionEnd

          if (begin == end) {
          }
          else {

          }
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:select-down", (e) => {

      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:select-left", (e) => {
          t = atom.workspace.getActivePane().activeItem.element.firstChild
          begin = t.selectionStart
          end = t.selectionEnd

          if (begin == end) {
          }
          else {

          }
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:select-right", (e) => {
          t = atom.workspace.getActivePane().activeItem.element.firstChild
          begin = t.selectionStart
          end = t.selectionEnd

          if (begin == end) {
          }
          else {

          }
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:save", (e) => {

      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:cut", (e) => {

      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:copy", (e) => {

      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:paste", (e) => {

      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:toggle-wrap", (e) => {

      }),

      atom.commands.add('.no-frills-view', "no-frills-opener:log-element", (e) => {
          console.log(e.target)
      }),
      atom.commands.add('.no-frills-view', "no-frills-opener:list-open-tabs", (e) => {
          console.log(this.tabs)
      })
    );

  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.noFrillsOpenerView.destroy();
  },

  registerOpener() {
    atom.views.addViewProvider(NoFrillsView, (NoFrillsView) => {
      view = new NoFrillsView
      return view.element
    })

    atom.workspace.addOpener(uri => {
      if (uri.startsWith('no-frills')) {
        return new NoFrillsView({uri: uri});
      }
    })

    this.opener = true
  },

  deserialize(state) {
    if (this.opener == false)
        this.registerOpener()

    if (state)
        for (i = 0; i < state.tabs.length; i++) {
            atom.workspace.open(state.tabs[i].uri).then( (t) => {
                this.tabs.push(t.uri)
            })
        }
  },

  serialize() {
    return {
      tabs: this.tabs
    };
  }

};
