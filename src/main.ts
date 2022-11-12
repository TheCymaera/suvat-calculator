import * as suvat from "suvat";
import "./main.scss";

const messageText = document.getElementById("message")!;

const inputS = document.getElementById("inputS") as HTMLInputElement;
const inputU = document.getElementById("inputU") as HTMLInputElement;
const inputV = document.getElementById("inputV") as HTMLInputElement;
const inputA = document.getElementById("inputA") as HTMLInputElement;
const inputT = document.getElementById("inputT") as HTMLInputElement;
const inputs = [inputS, inputU, inputV, inputA, inputT] as const;
const inputWrapper = (input: HTMLInputElement)=>input.parentElement!.parentElement!

inputs.forEach(i=> i.oninput = i.onfocus = updateKnownValues);

document.getElementById("clearS")!.onclick = ()=>{ inputS.value = ""; updateKnownValues(); }
document.getElementById("clearU")!.onclick = ()=>{ inputU.value = ""; updateKnownValues(); }
document.getElementById("clearV")!.onclick = ()=>{ inputV.value = ""; updateKnownValues(); }
document.getElementById("clearA")!.onclick = ()=>{ inputA.value = ""; updateKnownValues(); }
document.getElementById("clearT")!.onclick = ()=>{ inputT.value = ""; updateKnownValues(); }

document.getElementById("clearAll")!.onclick = ()=>{
	inputs.forEach(i=> i.value = "");
	updateKnownValues();
}

document.getElementById("calculate")!.onclick = function() {
	const input = getInputValue();

	const completed = suvat.complete(input);
	if (!completed) {
		messageText.textContent = "Insufficient information! Provide at least 3 values!";
		return;
	}

	setInputValue(completed);
}

function updateKnownValues() {
	messageText.textContent = "";
	
	let known = 0;
	for (const input of inputs) {
		const isKnown = !!input.value;
		inputWrapper(input).toggleAttribute("data-is-known", isKnown && known < 3);
		if (isKnown) known++;
	}
}

function setInputValue(data: Partial<suvat.Suvat>) {
	const getString = (data: number | undefined) => {
		return Number.isFinite(data) ? data!.toString() : ""; 
	}

	inputS.value = getString(data.s);
	inputU.value = getString(data.u);
	inputV.value = getString(data.v);
	inputA.value = getString(data.a);
	inputT.value = getString(data.t);
}

function getInputValue(): Partial<suvat.Suvat> {
	const getNumber = (input: HTMLInputElement) => {
		const isKnown = inputWrapper(input).hasAttribute("data-is-known");
		return isKnown ? input.valueAsNumber : undefined;
	}

	return {
		s: getNumber(inputS),
		u: getNumber(inputU),
		v: getNumber(inputV),
		a: getNumber(inputA),
		t: getNumber(inputT),
	}
}