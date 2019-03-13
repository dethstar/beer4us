import { getStyles  } from 'network/brewerydb';
import Style from 'models/Style';
import sing from 'songs';

const onError = (param1, param2) => {
  console.error(param1, param2);
};

const processStyle = (style) => {
  Style.onStyleResponse(style).catch(console.log);
};

export const getAllStyles = async () => {
  const numberOfPages = 23;
  let currentPage = 1;
  const getNewPage = async () => {
    const response = await getStyles(currentPage).catch(console.log);
    response.forEach(processStyle);
    currentPage += 1;
    if (currentPage <= numberOfPages) {
      getNewPage();
    } else {
      console.log('got pretty drunk drinking all those Styles');
    }
  };
  getNewPage();
};
