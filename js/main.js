import {getData} from './api.js';
import {initPicturesGallery} from './pictures-gallery.js';

getData().then((result) => initPicturesGallery(result));
