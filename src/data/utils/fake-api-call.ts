export const fakeApiCall = async () => {
  try {
    return await import(
      /* webpackPrefetch: true */ /* webpackChunkName: "data-map" */ '../denormalised-data-map.json'
    );
  } catch (e) {
    console.error('Error while loading data');
    return null;
  }
};
