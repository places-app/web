import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ReactPlayer from 'react-player';


class Gmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bounds: null,
      center: {
        lat: 37.7835896,
        lng: -122.4092149,
      },
    };
    this.handleMapClick = this.handleMapClick.bind(this);
    this.handleViewChanged = this.handleViewChanged.bind(this);
  }

  componentWillReceiveProps() {
    // if (nextProps.displayPlaces[0]) {
    //   const filter = nextProps.displayPlaces[0].userId === this.props.User
  }

  handleViewChanged() {
    this.setState({
      bounds: this.googleMapComponent.getBounds(),
      center: this.googleMapComponent.getCenter(),
    });
  }


  handleMapClick() {
    this.props.hideAll();
  }

  handleMarkerClick(marker, index) {
    if (marker.showInfo) {
      this.props.hideAll();
    } else {
      this.props.hideAll();
      this.props.updateShowing(index);
    }
  }

  renderInfoWindow(ref, marker, index) {
    return (
      <InfoWindow
        key={`${ref}_info_window`}
        options={{
          maxWidth: 300,
        }}
        onCloseclick={(e) => this.handleMarkerClick(marker, index, e)}
      >
        <div>
          <div
            style={{ fontSize: 'large', fontWeight: 'bold', marginBottom: '10px' }}
          >
            {marker.name}
          </div>
          {marker.imageUrl ?
            <img src={marker.imageUrl} alt={'loading...'} className="responsive-img" /> : null
          }
          {marker.videoUrl ?
            <ReactPlayer
              url={marker.videoUrl}
              width={'100%'}
              controls
            /> : null
          }
          <div style={{ marginTop: '10px' }}>{marker.note}</div>
        </div>
      </InfoWindow>
    );
  }


  render() {
    return (
      <div style={{ position: 'absolute', height: '100%', width: '100%' }}>
        <GoogleMapLoader
          containerElement={
            <div
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => (this.googleMapComponent = map)}
              defaultZoom={13}
              center={this.state.center}
              onClick={this.handleMapClick}
              onBoundsChanged={this.handleViewChanged}
            >
              {this.props.displayPlaces.map((marker, index) => {
                const ref = `marker_${index}`;
                const renderMarker = (
                  <Marker
                    position={{
                      lat: +marker.lat,
                      lng: +marker.lng,
                    }}
                    key={index}
                    defaultAnimation={2}
                    icon={this.props.filterType === 'Starred' ? 'https://cdn0.iconfinder.com/data/icons/stuttgart/32/star.png' : null}
                    ref={ref}
                    onClick={(event) => this.handleMarkerClick(marker, index, event)}
                  >
                    {marker.showInfo ? this.renderInfoWindow(ref, marker, index) : null}
                  </Marker>
                );
                return renderMarker;
              }
              )}
            </GoogleMap>
         }
        />
      </div>
    );
  }
}

Gmap.propTypes = {
  places: React.PropTypes.array,
  displayPlaces: React.PropTypes.array,
  updateDisplayPlaces: React.PropTypes.func,
  updateShowing: React.PropTypes.func,
  hideAll: React.PropTypes.func,
  filterType: React.PropTypes.string,
};

export default Gmap;

