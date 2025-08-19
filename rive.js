hair = 0;
hairColor = 0;
face = 0;
skin = 0;

const stateMachine = "selector";

const riveInstance = new rive.Rive({
	src: "the_arcane-chara.riv", //get rive file
	canvas: document.getElementById("rive"), //get correct canvas
	autoplay: true,
	stateMachines: stateMachine, // get correct stateMachine
	automaticallyHandleEvents: true, // Automatically handle RiveHTTPEvents
	onLoad: onLoadHandler,
	autoBind: true,
});

// Handle the onLoad event
function onLoadHandler() {
	// Prevent a blurry canvas by using the device pixel ratio
	riveInstance.resizeDrawingSurfaceToCanvas();

	const inputs = riveInstance.stateMachineInputs(stateMachine);

	// Setup inputs
	hairInput = inputs.find((i) => i.name === "hair");
	hairColorInput = inputs.find((i) => i.name === "hairColor");
	faceInput = inputs.find((i) => i.name === "face");
	skinInput = inputs.find((i) => i.name === "skin");

	hairInput = hair;
	hairColorInput = hairColor;
	faceInput = face;
	skinInput = skin;
}

// Resize the drawing surface if the window resizes
window.addEventListener(
	"resize",
	() => {
		riveInstance.resizeDrawingSurfaceToCanvas();
	},
	false
);

const eventFire = (riveEvent) => {
	const eventData = riveEvent.data;
	const eventName = eventData.name;
	const eventProperties = eventData.properties;

	const eventKey = eventName;
	switch (eventKey) {
		case "OnHoverEnter":
			document.body.style.cursor = "pointer";
			break;
		case "OnHoverExit":
			document.body.style.cursor = "auto";
			break;
		case "face":
		case "hair":
		case "skin":
		case "hairColor":
			console.log(eventKey + " : " + eventProperties.item);

			break;
		default:
			console.log("Unhandled event:", eventName, "\n", eventProperties);
			break;
	}
};
// Register the event handler
riveInstance.on(rive.EventType.RiveEvent, eventFire);
