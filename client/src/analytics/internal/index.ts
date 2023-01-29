import SegmentAnalytics from '../implementations/segment';

const SEGMENT_WRITE_KEY = 'PqRXFGXckkpLI3dphj6IwgEGcrjSg83H';

const internalTracking = new SegmentAnalytics();
internalTracking.init({ writeKey: SEGMENT_WRITE_KEY });

export default internalTracking;
