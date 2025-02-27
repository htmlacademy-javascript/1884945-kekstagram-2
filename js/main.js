import {getData} from './api.js';
import { showDataError } from './messages.js';
import {initPicturesGallery} from './pictures-gallery.js';

// Заводим функцию с действиями при ошибке в получении данных
const onGetDataError = () => {
  showDataError();
};

// Получаем данные и инициализируем отрисовку полученных данных
getData(onGetDataError).then((result) => initPicturesGallery(result));
