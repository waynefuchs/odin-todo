import { EVENT_ITEM_DONE } from './event-types';
import UI from './ui';

function delegateItemDoneStatusChanged(event, data) {
  const item = data.item;
  const done = data.done;

  // item modification
  item.setDone(done);

  // ui modification
  const ele = document.querySelector(`#item${item.getID()}`);
  if (ele === null) throw `Element (${item.getElementName}) not found.`;
  if (done) ele.classList.add('strikethrough');
  else ele.classList.remove('strikethrough');
}

PubSub.subscribe(EVENT_ITEM_DONE, delegateItemDoneStatusChanged);

function delegateListClear(event, list) {}
