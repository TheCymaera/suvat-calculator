/**
 * Suvat Calculator Demo
 * ==========================================
 * @module SuvatCalculator
 * @author Cymaera
 */

// Import dependencies
import * as suvat from "./suvat.js";

// Get UI elements and add them to a map
const ui = /** @type {Object<string,HTMLInputElement>}*/({});
for (const element of document.querySelectorAll("[data-ui]")) { // @ts-ignore
	ui[element.dataset.ui] = element;
}

// Complete suvat data when the calculate button is clicked
ui.calculate.onclick = function() {
	// get suvat data and complete it
	const suvatData = inputGetter();
	const success = suvat.complete(suvatData,ui.precision.checked);
	
	// display hint on failure
	if (!success) {
		ui.message.textContent = "Insufficent info! Provide at least 3 values!";
		return;
	}

	// set values
	inputSetter(suvatData);
}

// Clear input when when the corresponding clear button is clicked.
ui.clearS.onclick = ()=>{ ui.s.value = ""; updateKnownValues(); }
ui.clearU.onclick = ()=>{ ui.u.value = ""; updateKnownValues(); }
ui.clearV.onclick = ()=>{ ui.v.value = ""; updateKnownValues(); }
ui.clearA.onclick = ()=>{ ui.a.value = ""; updateKnownValues(); }
ui.clearT.onclick = ()=>{ ui.t.value = ""; updateKnownValues(); }

// Clear all inputs when the reset button is clicked
ui.reset.onclick = function() {
	ui.s.value = "";
	ui.u.value = "";
	ui.v.value = "";
	ui.a.value = "";
	ui.t.value = "";
	updateKnownValues();
}

// Update known values on input/focus events
ui.s.oninput = ui.s.onfocus =
ui.u.oninput = ui.u.onfocus =
ui.v.oninput = ui.v.onfocus =
ui.a.oninput = ui.a.onfocus =
ui.t.oninput = ui.t.onfocus = updateKnownValues;






/**
 * Determines which variables are known based on input value
 * @returns {void}
 */
function updateKnownValues() {
	// clear message
	ui.message.textContent = "";
	// update "data-is-known" attribute
	let known = 0;
	for (const input of [ui.s,ui.u,ui.v,ui.a,ui.t]) {
		input.parentElement.dataset.isKnown = input.value && ++known <= 3 ? "true" : "false";
	}
}

/**
 * Returns input values as suvat data
 * @returns {suvat.SuvatData}
 */
function inputGetter() {
	const data = {};
	if (ui.s.parentElement.dataset.isKnown === "true") data.s = parseFloat(ui.s.value);
	if (ui.u.parentElement.dataset.isKnown === "true") data.u = parseFloat(ui.u.value);
	if (ui.v.parentElement.dataset.isKnown === "true") data.v = parseFloat(ui.v.value);
	if (ui.a.parentElement.dataset.isKnown === "true") data.a = parseFloat(ui.a.value);
	if (ui.t.parentElement.dataset.isKnown === "true") data.t = parseFloat(ui.t.value);
	return data;
}

/**
 * Sets input value using suvat data
 * @param {suvat.SuvatData} suvatData
 * @returns {void}
 */
function inputSetter(suvatData) {
	ui.s.value = suvatData.s.toString();
	ui.u.value = suvatData.u.toString();
	ui.v.value = suvatData.v.toString();
	ui.a.value = suvatData.a.toString();
	ui.t.value = suvatData.t.toString();
}


