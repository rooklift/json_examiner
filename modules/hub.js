"use strict";

const fs = require("fs");
const path = require("path");
const {ipcRenderer} = require("electron");
const config_io = require("./config_io");

function init() {
	let hub_prototype = {};
	Object.assign(hub_prototype, hub_main_props);
	Object.assign(hub_prototype, require("./hub_settings"));
	return Object.create(hub_prototype);
}

let hub_main_props = {

	quit: function() {
		config_io.save();					// As long as we use the sync save, this will complete before we
		ipcRenderer.send("terminate");		// send "terminate". Not sure about results if that wasn't so.
	},

	load_file: function(filepath) {
		let buf = fs.readFileSync(filepath);
		try {
			let o = JSON.parse(buf)
			document.getElementById("status").innerHTML = `${path.basename(filepath)}`
			console.log(path.basename(filepath))
			console.log(o);
		} catch (err) {
			document.getElementById("status").innerHTML = err.toString()
		}
	}

};



module.exports = init();
