import React, { useState } from "react";
// import L from "leaflet";
import L from 'leaflet'
import {
	// Map,
	TileLayer,
	Marker,
	Popup,
	FeatureGroup,
	Circle
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css'
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { setMinMaxlatLng } from "../../state/map/mapSlice";


const DrawTools = () => {

	const dispatch = useDispatch<AppDispatch>()



	const _onEdited = (e: any) => {
		let numEdited = 0;
		e.layers.eachLayer((layer: any) => {
			numEdited += 1;
		});
		console.log(`_onEdited: edited ${numEdited} layers`, e);

		// this._onChange();
	};

	const _onCreated = (e: any)=> {
		let type = e.layerType;
		let layer = e.layer;
		if (type === "marker") {
			// Do marker specific actions
			console.log("_onCreated: marker created", e);
		} else {
			console.log("_onCreated: something else created:", type, e);
		}

		console.log("Geojson", layer.toGeoJSON());
		console.log("coords", layer.getLatLngs());


		let minMaxLatLng = {
			maxLat: -86,
			maxLng: -181,
			minLat: 86,
			minLng: 181
		}


		let coords = layer.getLatLngs()
		console.log(coords);
		coords[0].forEach((latLng: any, i: number) => {
			console.log(latLng)
			minMaxLatLng.maxLat = Math.max(minMaxLatLng.maxLat, latLng.lat)
			minMaxLatLng.maxLng = Math.max(minMaxLatLng.maxLng, latLng.lng)
			minMaxLatLng.minLat = Math.min(minMaxLatLng.minLat, latLng.lat)
			minMaxLatLng.minLng = Math.min(minMaxLatLng.minLng, latLng.lng)
		})

		dispatch(setMinMaxlatLng(minMaxLatLng))

		// console.log( {
		// 	maxLat, 
		// 	maxLng, 
		// 	minLat,
		// 	minLng, 
		// })





		// Do whatever else you need to. (save to db; etc)

		// this._onChange();
	};

	const _onDeleted = (e: any) => {
		let numDeleted = 0;
		e.layers.eachLayer((layer: any) => {
			numDeleted += 1;
		});
		console.log(`onDeleted: removed ${numDeleted} layers`, e);

		// this._onChange();
	};

	const _onMounted = (drawControl: any) => {
		console.log("_onMounted", drawControl);
	};

	const _onEditStart = (e: any)=> {
		console.log("_onEditStart", e);
	};

	const _onEditStop = (e: any) => {
		console.log("_onEditStop", e);
	};

	const _onDeleteStart = (e: any) => {
		console.log("_onDeleteStart", e);
	};

	const _onDeleteStop = (e: any) => {
		console.log("_onDeleteStop", e);
	};

	const _onDrawStart = (e: any) => {
		console.log("_onDrawStart", e);
	};

	/*onEdited	function	hook to leaflet-draw's draw:edited event
onCreated	function	hook to leaflet-draw's draw:created event
onDeleted	function	hook to leaflet-draw's draw:deleted event
onMounted	function	hook to leaflet-draw's draw:mounted event
onEditStart	function	hook to leaflet-draw's draw:editstart event
onEditStop	function	hook to leaflet-draw's draw:editstop event
onDeleteStart	function	hook to leaflet-draw's draw:deletestart event
onDeleteStop	function	hook to leaflet-draw's draw:deletestop event
onDrawStart	function	hook to leaflet-draw's draw:drawstart event
onDrawStop	function	hook to leaflet-draw's draw:drawstop event
onDrawVertex	function	hook to leaflet-draw's draw:drawvertex event
onEditMove	function	hook to leaflet-draw's draw:editmove event
onEditResize	function	hook to leaflet-draw's draw:editresize event
onEditVertex	function	hook to leaflet-draw's draw:editvertex event*/
	return (
		<FeatureGroup>
			<EditControl
				onDrawStart={_onDrawStart}
				position="topleft"
				onEdited={_onEdited}
				onCreated={_onCreated}
				onDeleted={_onDeleted}
				draw={{
					polyline: {
						icon: new L.DivIcon({
							iconSize: new L.Point(8, 8),
							className: "leaflet-div-icon leaflet-editing-icon",
						  }),
						shapeOptions: {
							guidelineDistance: 10,
							color: "navy",
							weight: 3
						}
					},
					rectangle: false,
					circlemarker: false,
					circle: false,
					polygon: true,
					marker: false
				}}
			/>
		</FeatureGroup>
	);
};

export default DrawTools;







// import { FeatureGroup, Circle } from 'react-leaflet';
// import { EditControl } from "react-leaflet-draw"

// export default function EditControlFC()  {

//     function handleEvent(event: any ) {
//         console.log(event)
//     }



//   return (<FeatureGroup>
//     <EditControl
//       position='topright'
//       onEdited={handleEvent}
//       onCreated={handleEvent}
//       onDeleted={handleEvent}
//       draw={{
//         rectangle: false
//       }}
//     />
//     <Circle center={[51.51, -0.06]} radius={200} />
//   </FeatureGroup>)
// }