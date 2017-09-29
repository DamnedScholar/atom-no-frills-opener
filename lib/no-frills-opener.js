'use babel';

import NoFrillsOpenerView from './no-frills-opener-view';
import { CompositeDisposable } from 'atom';

export default {

  noFrillsOpenerView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.noFrillsOpenerView = new NoFrillsOpenerView(state.noFrillsOpenerViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.noFrillsOpenerView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'no-frills-opener:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.noFrillsOpenerView.destroy();
  },

  serialize() {
    return {
      noFrillsOpenerViewState: this.noFrillsOpenerView.serialize()
    };
  },

  toggle() {
    console.log('NoFrillsOpener was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
