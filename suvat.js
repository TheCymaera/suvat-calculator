/**
 * Suvat Calculator
 * ==========================================
 * Can be used for commerical or non-commerical purposes.
 * DO NOT RESELL.
 * Attribution is appreciated but not due.
 * ==========================================
 * @module SuvatCalculator
 * @author Cymaera
 */


/**
 * Represents SUVAT data
 * @typedef {Object} SuvatData
 * @property {number} [s] - Displacement
 * @property {number} [u] - Initial Velocity
 * @property {number} [v] - Final Velocity
 * @property {number} [a] - Acceleration
 * @property {number} [t] - Time
 */


/**
 * A 2D dictionary of SUVAT formulas
 * =============================================================
 * unknown1 = formulas[ unknown1 ][ unknown 2 ](SuvatData)
 *  >> where unknown1 and unknown2 are "s", "u", "v", "a", "t"
 */
export const formulas = {
	s: {
		u(/**@type {SuvatData}*/$) {return $.v*$.t - 1/2*$.a*$.t**2},
		v(/**@type {SuvatData}*/$) {return $.u*$.t + 1/2*$.a*$.t**2},
		a(/**@type {SuvatData}*/$) {return $.t/2*($.u+$.v)},
		t(/**@type {SuvatData}*/$) {return ($.v**2-$.u**2)/(2*$.a)},
	},
	u: {
		s(/**@type {SuvatData}*/$) {return $.v - $.a*$.t},
		v(/**@type {SuvatData}*/$) {return ($.s - (1/2)*$.a*$.t**2)/$.t},
		a(/**@type {SuvatData}*/$) {return 2*$.s/$.t - $.v},
		t(/**@type {SuvatData}*/$) {return ($.v**2 - 2*$.a*$.s)**(1/2)},
	},
	v: {
		s(/**@type {SuvatData}*/$) {return $.u + $.a*$.t},
		u(/**@type {SuvatData}*/$) {return ($.s + (1/2)*$.a*$.t**2)/$.t},
		a(/**@type {SuvatData}*/$) {return 2*$.s/$.t - $.u},
		t(/**@type {SuvatData}*/$) {return ($.u**2 + 2*$.a*$.s)**(1/2)}
	},
	a: {
		s(/**@type {SuvatData}*/$) {return ($.v-$.u)/$.t},
		u(/**@type {SuvatData}*/$) {return 2*($.v*$.t-$.s)/($.t**2)},
		v(/**@type {SuvatData}*/$) {return 2*($.s - $.u*$.t)/($.t**2)},
		t(/**@type {SuvatData}*/$) {return ($.v**2 - $.u**2)/(2*$.s)},
	},
	t: {
		s(/**@type {SuvatData}*/$) {return ($.v - $.u)/$.a},
		u(/**@type {SuvatData}*/$) {return ($.v - ($.v**2 - 2*$.a*$.s)**(1/2) )/$.a},
		v(/**@type {SuvatData}*/$) {return ((2*$.a*$.s + $.u**2)**(1/2) - $.u)/$.a},
		a(/**@type {SuvatData}*/$) {return (2*$.s)/($.u+$.v)},
	},
}

/**
 * Completes SUVAT data.
 * Returns a boolean indicating success.
 * Failure occurs if provided data has more than 2 unknowns.
 * @param {SuvatData} suvatData - SUVAT data
 * @param {boolean} [autoPrecision=false] - Infer and set precision.
 * @returns {boolean} Success
 */
export function complete(suvatData,autoPrecision) {
	// short hand
	const $ = suvatData;
	
	// Get a list of unknown variables 
	// >> ("s","u","v","a","t")
	const unknowns = [];
	for (const key of ["s","u","v","a","t"]) {
		if (!Number.isFinite($[key])) unknowns.push(key);
	}

	// No unknowns, already complete
	if (!unknowns.length) return true;
	
	// Cannot complete data if there is more than 2 unknowns
	if (unknowns.length > 2) return false;

	// unknown1 = suvat[ unknown1 ][ unknown2 ](SuvatData)
	if (unknowns.length === 2) {
		$[ unknowns[0] ] = stripFloat(formulas[ unknowns[0] ][ unknowns[1] ]($));
		$[ unknowns[1] ] = stripFloat(formulas[ unknowns[1] ][ unknowns[0] ]($));
	} else {
		const arbitraryVariable = Object.keys(formulas[ unknowns[0] ])[0];
		$[ unknowns[0] ] = stripFloat(formulas[ unknowns[0] ][ arbitraryVariable ]($));
	}
	
	// Set precision
	if (autoPrecision) setPrecision(suvatData);
	
	return true;
}

/**
 * Returns the precision of SUVAT data (the significant figures of the least precise value)
 * @param {SuvatData} suvatData - SUVAT data
 * @returns {number} - Precision (significant figures)
 */
export function getPrecision(suvatData) {
	// the precision is the minimum significant figure
	let minSigFig = Infinity;
	for (const key in suvatData) {
		const sigFig = getNumberPrecision(suvatData[key]);
		if (sigFig < minSigFig) minSigFig = sigFig;
	}
	return minSigFig;
}

/**
 * Sets the precision of SuvatData
 * @param {SuvatData} suvatData - Suvat Data
 * @param {number} [precision] - Precision (inferred if not provided)
 * @returns {SuvatData}
 */
export function setPrecision(suvatData,precision) {
	// infer precision if not provided
	if (!precision) precision = getPrecision(suvatData);
	// set precision
	const $ = suvatData; 
	if ($.s !== undefined) $.s = parseFloat($.s.toPrecision(precision));
	if ($.u !== undefined) $.u = parseFloat($.u.toPrecision(precision));
	if ($.v !== undefined) $.v = parseFloat($.v.toPrecision(precision));
	if ($.a !== undefined) $.a = parseFloat($.a.toPrecision(precision));
	if ($.t !== undefined) $.t = parseFloat($.t.toPrecision(precision));
	return $;
}

/**
 * Returns the precision of a number
 * @ignore
 * @param {number} number 
 * @returns {number}
 */
function getNumberPrecision(number) {
	let n = Math.abs(parseInt(number.toString().replace(".", "")));
    if (n == 0) return 0;
    while (n != 0 && n % 10 == 0) n /= 10;
    return n.toString().length;
}

/**
 * Removes trailing floating points
 * @ignore
 * @param {number} number 
 * @returns {number}
 */
function stripFloat(number) {
	return Math.round(number * 10000000000) / 10000000000;
}