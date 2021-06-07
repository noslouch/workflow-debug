const STATIC_DOMAINS = /s.wsj.net|si.wsj.net/;
const IMG_MANAGER_REGEX = /https:\/\/images.\w+.(\w+.)?\w+\/im-[0-9]{4,8}/;
const IMG_MANAGER_SIZES_REGEX = /.+\/im-[0-9]{4,8}\/(.+)/;
const GAMS_SIZES_REGEX = /.+\/images\/\S+_(\S+)_\S+.\w{3}$/;

const imageSizes = {
  '8SR': {
    width: 1278,
    height: 1278,
  },
  M: {
    height: 853,
    width: 1280,
  },
  IM: {
    height: 1026,
    width: 2000,
  },
  GR: {
    height: 810,
    width: 1242,
  },
  G: {
    height: 369,
    width: 553,
  },
  LV: {
    height: 949,
    width: 741,
  },
  ER: {
    height: 402,
    width: 602,
  },
  VID: {
    height: 1080,
    width: 1920,
  },
  VIDSM: {
    height: 360,
    width: 640,
  },
  SQUARE: {
    height: 1278,
    width: 1278,
  },
  '12S': {
    height: 953,
    width: 954,
  },
};

const isIM = (url) => IMG_MANAGER_REGEX.test(url);

function imageCrops(url, isImgManager) {
  const regex = isImgManager ? IMG_MANAGER_SIZES_REGEX : GAMS_SIZES_REGEX;
  const [, size = ''] = url.match(regex) || [];

  return imageSizes[size.toUpperCase()];
}

function getImageSize(url) {
  if (!url) return {};

  if (isIM(url)) {
    // arthur
    // image size can be inferred from ?width=XX&height=XX
    const [, width] = url.match(/width=(\d+)/) || [];
    const [, size] = url.match(/size=([\d.]+)/) || [];
    let [, height] = url.match(/height=(\d+)/) || [];

    if (size && width) {
      const aspectRatio = 1 / size;
      height = Math.round(aspectRatio * width);
    }

    if (!width || !height) {
      return imageCrops(url, true) || {};
    }

    return {
      width: Number(width),
      height: Number(height),
    };
  }

  return STATIC_DOMAINS.test(url) ? imageCrops(url) : {};
}

function getPreviewImage(url) {
  if (isIM(url)) {
    const [, id] = url.match(/(im-\d+)\/?/);
    return `https://images.wsj.net/${id}?width=10&height=5`;
  }

  if (STATIC_DOMAINS.test(url)) {
    // regex-ing for [numbers and letters]_[numbers].jpg/gif/png/jpeg
    // url looks like: https://s.wsj.net/public/resources/images/BN-SE999_TESTBI_VID_20170222121441.jpg
    return url.replace(
      /[a-z,A-Z,0-9]+(?=_[0-9]+.gif|_[0-9]+.jpg|_[0-9]+.png|_[0-9]+.jpeg)/i,
      'PREVIEW'
    );
  }

  // eslint wants an explicit return
  return '';
}

export default function parseImages(inset) {
  const small = getImageSize(inset.urlsmall);
  const large = getImageSize(inset.urllarge);

  small.url = inset.urlsmall;
  large.url = inset.urllarge;

  const preview = {
    url: getPreviewImage(large.url),
  };

  return {
    small,
    large,
    preview,
  };
}
