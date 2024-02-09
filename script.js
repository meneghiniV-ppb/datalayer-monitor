let debounceTimer;
let events = [];

const debounceDelay = 1000;

const logStyles = {
  startedStyleMessage: {
    backgroundColor: "#006858",
    color: "white",
    fontStyle: "italic",
    border: "1px solid white",
    fontSize: "1.3em",
    width: "100%",
    padding: "5px;",
  },
  newEventTriggeredStyleMessage: {
    color: "#009745",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "10px",
    borderBottom: "1px solid white",
    fontSize: "1.3em",
  },
  dataLayerListStyleMessage: {
    color: "white",
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "10px",
    borderBottom: "1px solid white",
    fontSize: "1.3em",
  },
};

function stringifyStyle(styleobjetct) {
  return (
    Object.keys(styleobjetct)
      .map((key) => {
        const kebabKey = key
          .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
          .toLocaleLowerCase();

        return `${kebabKey}: ${styleobjetct[key]}`;
      })
      .join("; ") + ";"
  );
}

function logEvents() {
  events.forEach((obj) => {
    console.log(
      `%cNew event triggered: %o`,
      stringifyStyle(logStyles.newEventTriggeredStyleMessage),
      obj
    );
  });
}

function start() {
  const originalPush = window.dataLayer.push;

  window.dataLayer.push = function (...args) {
    clearTimeout(debounceTimer);
    events.push(args[0]);

    logEvents();

    debounceTimer = setTimeout(() => {
      console.log(
        `%cDataLayer List: %o`,
        stringifyStyle(logStyles.dataLayerListStyleMessage),
        window.dataLayer
      );
    }, debounceDelay);

    return originalPush.apply(window.dataLayer, args);
  };

  console.log(
    "%cdataLayer Monitoring started!",
    stringifyStyle(logStyles.startedStyleMessage)
  );
}

window.addEventListener("load", function (e) {
  start();
});

window.addEventListener("beforeunload", function (e) {
  e.returnValue = false;
});
