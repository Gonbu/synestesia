declare module 'react-native-maps-super-cluster' {
  import { Component } from 'react';
  import { ViewStyle } from 'react-native';
  import { MapViewProps, Region } from 'react-native-maps';

  interface ClusteredMapViewProps extends MapViewProps {
    data: Array<{
      id: string;
      location: {
        latitude: number;
        longitude: number;
      };
      [key: string]: any;
    }>;
    renderMarker: (item: any) => React.ReactNode;
    renderCluster: (cluster: any) => React.ReactNode;
  }

  interface ClusteredMapViewRef {
    animateToRegion(region: Region, duration?: number): void;
  }

  class ClusteredMapView extends Component<ClusteredMapViewProps> implements ClusteredMapViewRef {
    animateToRegion(region: Region, duration?: number): void;
  }

  export default ClusteredMapView;
  export type { ClusteredMapViewRef };
} 
