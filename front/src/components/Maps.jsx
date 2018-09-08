
import React, {Component} from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

var config = {}
config.params = {
    maxBounds: new L.LatLngBounds(
        new L.LatLng(-35.309-0.2, 149.13-0.2), 
        new L.LatLng(-35.309+0.2, 149.13+0.2)
    ),
    center: [-35.309,149.13],
    zoomControl: false,
    zoom: 12,
    maxZoom: 18,
    minZoom: 11,
    scrollwheel: false,
    legends: true,
    infoControl: false,
    attributionControl: true
}
config.tileLayer = {
    uri: 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    params: {
        minZoom: 11,
        id: '',
        accessToken: ''
    }
}

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            map: null,
            tileLayer: null,
        }
    }

    init(id) {
        if (this.state.map) return
        let map = L.map(id, config.params)
        L.control.zoom({ position: 'bottomleft'}).addTo(map)
        L.control.scale({ position: 'bottomright'}).addTo(map)
        L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map)
        this.setState({map: map})
    }

    componentDidMount() {
        if (!this.state.map) this.init(this._mapNode)
    }

    render() {
        return (
            <div ref={(node) => this._mapNode = node} id="map"/>
        )
    }
}

export default Map
