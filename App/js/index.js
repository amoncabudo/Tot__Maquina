import $ from "jquery";
import Sortable from "sortablejs";
import 'leaflet';

import hola from "./hola.js";

import  "./map.js";
import  "./machineinv.js";
import  "./webcam.js";

import {Example, obj} from "./example.ts";


$(function() {
    console.log('Hello World');
    hola();
    console.log("Example", obj);

});