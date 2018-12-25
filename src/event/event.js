const eventMap = {};

function addEvent(type, callback) {
  if (!eventMap[type]) {
    eventMap[type] = [];
  }

  if (callback) {
    eventMap[type].push(callback);
  }
}

function bindEvent(dom) {
  ['click', 'mouseover', 'mouseout', 'mousemove'].map(key => {
    dom.addEventListener(key, listener);
  });
}

function listener(event) {
  if (eventMap[event.type]) {
    eventMap[event.type].map(func => {
      func(event);
    })
  }
}

function destroy() {
  ['click', 'mouseover', 'mouseout', 'mousemove'].map(key => {
    dom.removeEventListener(key, listener);
  });
  eventMap = {};
}
export {
  bindEvent,
  addEvent
}